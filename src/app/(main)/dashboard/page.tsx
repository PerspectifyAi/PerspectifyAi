"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUserAccounts, getDashboardData }  from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";

import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { DashboardOverview } from "./_components/transaction-overview";

import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

import type {
  SerializedAccount,
  SerializedTransaction,
} from "@/types";

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<SerializedAccount[]>([]);
  const [transactions, setTransactions] = useState<SerializedTransaction[]>([]);
  const [budgetData, setBudgetData] = useState<{
    budget: number;
    currentExpenses: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountData, transactionData] = await Promise.all([
          getUserAccounts(),
          getDashboardData(),
        ]);

        setAccounts(accountData as SerializedAccount[]);
        setTransactions(transactionData as SerializedTransaction[]);

        const defaultAccount = accountData.find((account) => account.isDefault);

        if (defaultAccount) {
          const budgetRes = await getCurrentBudget(defaultAccount.id);
          setBudgetData({
            budget: budgetRes?.budget?.amount ?? 0,
            currentExpenses: budgetRes?.currentExpenses ?? 0,
          });
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground">
        <span className="animate-pulse">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-12 space-y-12">
      {/* Budget Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <BudgetProgress
          initialBudget={budgetData?.budget ?? 0}
          currentExpenses={budgetData?.currentExpenses ?? 0}
        />
      </motion.div>

      {/* Transaction Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DashboardOverview
          accounts={accounts}
          transactions={transactions}
        />
      </motion.div>

      {/* Account Cards Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* Add New Account */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <CreateAccountDrawer>
            <Card className="group relative rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-muted/30 backdrop-blur hover:bg-muted/40 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
              <CardContent className="flex flex-col items-center justify-center h-[160px] p-6 text-muted-foreground group-hover:text-primary transition-colors">
                <Plus className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>
        </motion.div>

        {/* Render Accounts */}
        {accounts.map((account, i) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
          >
            <div className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-2xl bg-card">
              <AccountCard account={account} />
            </div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
