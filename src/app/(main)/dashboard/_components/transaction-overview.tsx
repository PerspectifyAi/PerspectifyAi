"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { format, isSameMonth } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HexagonBackground } from "../../../../components/ui/hexagon-background";

type Account = {
  id: string;
  name: string;
  isDefault?: boolean;
};

type Transaction = {
  id: string;
  accountId: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
  description?: string;
  category: string;
};

interface DashboardOverviewProps {
  accounts: Account[];
  transactions: Transaction[];
}

export function DashboardOverview({
  accounts,
  transactions,
}: DashboardOverviewProps) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  const accountTransactions = useMemo(
    () => transactions.filter((t) => t.accountId === selectedAccountId),
    [transactions, selectedAccountId]
  );

  const recentTransactions = useMemo(
    () =>
      [...accountTransactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5),
    [accountTransactions]
  );

  const currentMonthData = useMemo(() => {
    const now = new Date();
    const filtered = accountTransactions.filter((t) =>
      isSameMonth(new Date(t.date), now)
    );

    const grouped: Record<string, { income: number; expense: number }> = {};

    filtered.forEach((t) => {
      const day = format(new Date(t.date), "MMM d");
      if (!grouped[day]) {
        grouped[day] = { income: 0, expense: 0 };
      }
      if (t.type === "INCOME") {
        grouped[day].income += t.amount;
      } else {
        grouped[day].expense += t.amount;
      }
    });

    return Object.entries(grouped)
      .map(([date, values]) => ({
        date,
        income: values.income,
        expense: values.expense,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [accountTransactions]);

  return (
    <div className="relative grid gap-4 lg:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <HexagonBackground className="absolute inset-0 -z-10 opacity-10 pointer-events-none" />

      {/* Recent Transactions */}
      <div className="group relative transition-all duration-300 hover:shadow-lg hover:border-primary rounded-2xl border border-border bg-background">
        <div className="card-hover absolute inset-0 z-[-1] rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Card className="rounded-2xl bg-white dark:bg-neutral-900 shadow-none border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
            <CardTitle className="text-base sm:text-lg font-semibold text-primary">
              Recent Transactions
            </CardTitle>
            <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No recent transactions
              </p>
            ) : (
              recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between border-b last:border-none pb-2"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium truncate">
                      {tx.description || "Untitled Transaction"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(tx.date), "PP")}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "flex items-center font-semibold text-sm",
                      tx.type === "EXPENSE" ? "text-red-500" : "text-green-500"
                    )}
                  >
                    {tx.type === "EXPENSE" ? (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    )}
                    ${tx.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Bar Chart */}
      <div className="group relative transition-all duration-300 hover:shadow-lg hover:border-primary rounded-2xl border border-border bg-background">
        <div className="card-hover absolute inset-0 z-[-1] rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Card className="rounded-2xl bg-white dark:bg-neutral-900 shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold text-primary">
              Monthly Income vs Expense
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-5">
            {currentMonthData.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No data for this month
              </p>
            ) : (
              <div className="h-[280px] sm:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={currentMonthData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartTooltip
                      formatter={(value: number) => `$${value.toFixed(2)}`}
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend iconType="circle" />
                    <Bar
                      dataKey="income"
                      fill="#22c55e" // Tailwind green-500
                      name="Income"
                      barSize={24}
                    />
                    <Bar
                      dataKey="expense"
                      fill="#ef4444" // Tailwind red-500
                      name="Expense"
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
