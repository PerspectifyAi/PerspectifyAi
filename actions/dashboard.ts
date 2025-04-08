"use server";

import { db } from "@/lib/prisma";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Account, Transaction, AccountType } from "@prisma/client";

// -------------------------
// Types
// -------------------------

interface AccountCreateData {
  name: string;
  type: AccountType;
  balance: number;
  isDefault?: boolean;
}

type Serialized<T> = {
  [K in keyof T]: T[K] extends { toNumber(): number }
    ? number
    : T[K] extends Date
    ? string
    : T[K];
};

type SerializedAccount = Serialized<Account>;
type SerializedTransaction = Serialized<Transaction>;

// -------------------------
// Utils
// -------------------------

function isDecimal(value: unknown): value is { toNumber(): number } {
  return (
    typeof value === "object" &&
    value !== null &&
    "toNumber" in value &&
    typeof (value as { toNumber: unknown }).toNumber === "function"
  );
}

function serialize<T extends Record<string, unknown>>(obj: T): Serialized<T> {
  const result = {} as Serialized<T>;

  for (const key of Object.keys(obj) as Array<keyof T>) {
    const value = obj[key];

    if (value instanceof Date) {
      result[key] = value.toISOString() as Serialized<T>[typeof key];
    } else if (isDecimal(value)) {
      result[key] = value.toNumber() as Serialized<T>[typeof key];
    } else {
      result[key] = value as Serialized<T>[typeof key];
    }
  }

  return result;
}

async function getOrCreateDbUser() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) throw new Error("Email not found");

  const dbUser = await db.user.upsert({
    where: { clerkUserId: user.id },
    update: {},
    create: {
      clerkUserId: user.id,
      email,
      name: user.firstName || "",
    },
  });

  return { dbUser, user };
}

// -------------------------
// Actions
// -------------------------

export async function getUserAccounts(): Promise<SerializedAccount[]> {
  try {
    const { dbUser } = await getOrCreateDbUser();

    const accounts = await db.account.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    return accounts.map(serialize);
  } catch (error) {
    console.error("Error fetching user accounts:", error);
    throw new Error("Failed to fetch accounts");
  }
}

export async function getDashboardData(): Promise<SerializedTransaction[]> {
  try {
    const { dbUser } = await getOrCreateDbUser();

    const transactions = await db.transaction.findMany({
      where: { userId: dbUser.id },
      orderBy: { date: "desc" },
    });

    return transactions.map(serialize);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}

export async function createAccount(data: AccountCreateData): Promise<
  | { success: true; data: SerializedAccount }
  | { success: false; error: string }
> {
  try {
    const { dbUser, user } = await getOrCreateDbUser();
    const req = await request();

    const decision = await aj.protect(req, {
      userId: user.id,
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error("RATE_LIMIT_EXCEEDED", { remaining, resetInSeconds: reset });
        throw new Error("Too many requests. Please try again later.");
      }
      throw new Error("Request blocked");
    }

    const balanceFloat = parseFloat(String(data.balance));
    if (isNaN(balanceFloat)) throw new Error("Invalid balance amount");

    const existingAccounts = await db.account.findMany({
      where: { userId: dbUser.id },
    });

    const shouldBeDefault =
      existingAccounts.length === 0 ? true : Boolean(data.isDefault);

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: dbUser.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        name: data.name,
        type: data.type,
        balance: balanceFloat,
        userId: dbUser.id,
        isDefault: shouldBeDefault,
      },
    });

    revalidatePath("/dashboard");

    return { success: true, data: serialize(account) };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create account",
    };
  }
}
