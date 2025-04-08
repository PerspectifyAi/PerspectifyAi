import { z } from "zod";

// ✅ Enum definitions for better type safety
export const AccountType = z.enum(["CURRENT", "SAVINGS"]);
export const TransactionType = z.enum(["INCOME", "EXPENSE"]);
export const RecurringInterval = z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]);

// ✅ Account schema
export const accountSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: AccountType,
  balance: z.string().min(1, { message: "Initial balance is required" }),
  isDefault: z.boolean().default(false),
});

// ✅ Transaction schema with validation logic
export const transactionSchema = z
  .object({
    type: TransactionType,
    amount: z.string().min(1, { message: "Amount is required" }),
    description: z.string().optional(),
    date: z.preprocess(
      (val) => (typeof val === "string" || val instanceof Date ? new Date(val) : val),
      z.date({ required_error: "Date is required" })
    ),
    accountId: z.string().min(1, { message: "Account is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    isRecurring: z.boolean().default(false),
    recurringInterval: RecurringInterval.optional(),
  })
  .refine(
    (data) => !data.isRecurring || !!data.recurringInterval,
    {
      message: "Recurring interval is required for recurring transactions",
      path: ["recurringInterval"],
    }
  );

// ✅ Inferred types for use across your app
export type Account = z.infer<typeof accountSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
