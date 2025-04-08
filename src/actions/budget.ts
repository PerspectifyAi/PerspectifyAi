"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import type { Decimal } from "@prisma/client/runtime/library";

// ✅ Utility: serialize Decimal to number
function serializeDecimal<T extends { amount: Decimal }>(
  obj: T
): Omit<T, "amount"> & { amount: number } {
  const { amount, ...rest } = obj;
  return { ...rest, amount: amount.toNumber() };
}

// ✅ Type-safe response
interface BudgetResponse {
  budget: { id: string; amount: number } | null;
  currentExpenses: number;
}

// ✅ Get budget + current month's expenses
export async function getCurrentBudget(accountId: string): Promise<BudgetResponse> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  const budget = await db.budget.findFirst({
    where: { userId: user.id },
  });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999); // inclusive full date

  const expenses = await db.transaction.aggregate({
    where: {
      userId: user.id,
      accountId,
      type: "EXPENSE",
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
  });

  return {
    budget: budget ? serializeDecimal(budget) : null,
    currentExpenses: expenses._sum.amount?.toNumber() || 0,
  };
}

// ✅ Create or update a budget
export async function updateBudget(amount: number) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const budget = await db.budget.upsert({
      where: { userId: user.id },
      update: { amount },
      create: { userId: user.id, amount },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: serializeDecimal(budget),
    };
  } catch (error) {
    console.error("Error updating budget:", error);
    return {
      success: false,
      error: (error as Error).message || "Unknown error",
    };
  }
}
