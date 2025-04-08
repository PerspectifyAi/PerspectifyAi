"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Decimal } from "@prisma/client/runtime/library";
import type { SerializedTransaction, SerializedAccount } from "@/types";

// 🔧 Serialize Transaction
function serializeTransaction(transaction: {
  id: string;
  userId: string;
  accountId: string;
  type: "INCOME" | "EXPENSE";
  amount: Decimal;
  date: Date;
  description?: string | null;
  category: string;
}): SerializedTransaction {
  return {
    id: transaction.id,
    userId: transaction.userId,
    accountId: transaction.accountId,
    type: transaction.type,
    amount: transaction.amount.toNumber(),
    date: transaction.date.toISOString(),
    description: transaction.description ?? undefined,
    category: transaction.category,
  };
}

// 🔧 Serialize Account
function serializeAccount(account: {
  id: string;
  userId: string;
  name: string;
  balance: Decimal;
  isDefault: boolean;
  type: "CURRENT" | "SAVINGS";
}): SerializedAccount {
  return {
    id: account.id,
    userId: account.userId,
    name: account.name,
    balance: account.balance.toNumber(),
    isDefault: account.isDefault,
    type: account.type,
  };
}

// ✅ Get account with transactions
export async function getAccountWithTransactions(accountId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  const account = await db.account.findUnique({
    where: { id: accountId, userId: user.id },
    include: {
      transactions: { orderBy: { date: "desc" } },
      _count: { select: { transactions: true } },
    },
  });

  if (!account) return null;

  return {
    ...serializeAccount(account),
    transactions: account.transactions.map(serializeTransaction),
    _count: account._count,
  };
}

// ✅ Bulk delete transactions and update balance
export async function bulkDeleteTransactions(transactionIds: string[]) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const transactions = await db.transaction.findMany({
      where: { id: { in: transactionIds }, userId: user.id },
    });

    const balanceMap: Record<string, number> = {};
    for (const tx of transactions) {
      const amount = tx.amount.toNumber();
      const delta = tx.type === "EXPENSE" ? amount : -amount;
      balanceMap[tx.accountId] = (balanceMap[tx.accountId] || 0) + delta;
    }

    await db.$transaction(async (tx) => {
      await tx.transaction.deleteMany({
        where: { id: { in: transactionIds }, userId: user.id },
      });

      await Promise.all(
        Object.entries(balanceMap).map(([accountId, change]) =>
          tx.account.update({
            where: { id: accountId },
            data: { balance: { decrement: change } },
          })
        )
      );
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// ✅ Update default account
export async function updateDefaultAccount(accountId: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    const updated = await db.account.update({
      where: { id: accountId, userId: user.id },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");

    return { success: true, data: serializeAccount(updated) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
