"use client";

import { format } from "date-fns";
import { Decimal } from "@prisma/client/runtime/library";
import { RECURRING_INTERVALS } from "@/app/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, RefreshCcw } from "lucide-react";
import clsx from "clsx";

type TransactionWithDetails = {
  id: string;
  date: Date;
  description: string | null;
  category: string;
  amount: Decimal | number;
  type: "INCOME" | "EXPENSE";
  isRecurring: boolean;
  recurringInterval: keyof typeof RECURRING_INTERVALS | null;
  nextRecurringDate: Date | null;
  account: {
    name: string;
  };
};

interface RecentRecurringTransactionsProps {
  transactions: TransactionWithDetails[];
}

const formatCurrency = (amount: Decimal | number, type: "INCOME" | "EXPENSE") => {
  const numericAmount = typeof amount === "number" ? amount : Number(amount);
  const sign = type === "EXPENSE" ? "-" : "+";
  return `${sign}₹${Math.abs(numericAmount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export function RecentRecurringTransactions({ transactions }: RecentRecurringTransactionsProps) {
  const sortedTxs = [...transactions]
    .filter((tx) => tx.isRecurring && tx.nextRecurringDate)
    .sort((a, b) => new Date(a.nextRecurringDate!).getTime() - new Date(b.nextRecurringDate!).getTime())
    .slice(0, 5);

  return (
    <Card className="h-full bg-background text-foreground">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-muted-foreground" />
            Upcoming Recurring
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-4">
          <div className="space-y-4 pb-4">
            {sortedTxs.length > 0 ? (
              sortedTxs.map((tx) => (
                <div key={tx.id} className="space-y-1 border-b border-border pb-3 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate w-2/3">
                      {tx.description ?? tx.category}
                    </span>
                    <span
                      className={clsx(
                        "text-sm font-semibold",
                        tx.type === "INCOME" ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {formatCurrency(tx.amount, tx.type)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Every{" "}
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-muted-foreground">
                        {tx.recurringInterval
                          ? RECURRING_INTERVALS[tx.recurringInterval]
                          : "N/A"}
                      </Badge>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarClock className="w-4 h-4" />
                      {tx.nextRecurringDate
                        ? format(new Date(tx.nextRecurringDate), "dd MMM yyyy")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-16">
                No upcoming recurring transactions.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
