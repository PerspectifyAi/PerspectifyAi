import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import {
  checkBudgetAlerts,
  generateMonthlyReports,
  processRecurringTransaction,
  triggerRecurringTransactions,
} from "@/lib/inngest/function";

// Inferred function list with type safety
const functions = [
  processRecurringTransaction,
  triggerRecurringTransactions,
  generateMonthlyReports,
  checkBudgetAlerts,
] as const;

// Expose GET, POST, PUT handlers for Inngest
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions,
});
