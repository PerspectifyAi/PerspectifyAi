"use client";

import { useRef, useState, useMemo } from "react";
import { toPng } from "html-to-image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
}

interface DateRange {
  label: string;
  days: number | null;
}

const DATE_RANGES: Record<string, DateRange> = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

interface AccountChartProps {
  transactions: Transaction[];
}

export function AccountChart({ transactions }: AccountChartProps) {
  const [dateRange, setDateRange] = useState<string>("1M");
  const chartRef = useRef(null);

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    return transactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        return transactionDate >= startDate && transactionDate <= endOfDay(now);
      })
      .reduce<Record<string, { date: string; income: number; expense: number }>>(
        (acc, transaction) => {
          const date = format(new Date(transaction.date), "MMM dd");
          if (!acc[date]) {
            acc[date] = { date, income: 0, expense: 0 };
          }
          acc[date][transaction.type.toLowerCase() as "income" | "expense"] += transaction.amount;
          return acc;
        },
        {}
      );
  }, [transactions, dateRange]);

  const chartData = useMemo(
    () =>
      Object.values(filteredData).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    [filteredData]
  );

  const totals = useMemo(
    () =>
      chartData.reduce(
        (acc, { income, expense }) => ({
          income: acc.income + income,
          expense: acc.expense + expense,
        }),
        { income: 0, expense: 0 }
      ),
    [chartData]
  );

  const net = totals.income - totals.expense;

  const totalLabels = [
    { label: "Total Income", value: totals.income, color: "text-green-400" },
    { label: "Total Expenses", value: totals.expense, color: "text-red-400" },
    {
      label: "Net",
      value: net,
      color: net >= 0 ? "text-green-400" : "text-red-400",
    },
  ];

  const handleExport = async () => {
    if (!chartRef.current) return;

    const dataUrl = await toPng(chartRef.current, {
      backgroundColor: "#0F172A",
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = `transaction-chart-${dateRange}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <Card className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-6">
        <CardTitle className="text-base font-semibold text-white">
          Transaction Overview
        </CardTitle>

        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px] bg-[#1E293B] border-white text-white">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="bg-[#0F172A] text-white border-white">
              {Object.entries(DATE_RANGES).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleExport} variant="secondary" className="gap-2">
            <Download size={16} /> Export PNG
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-around mb-4 text-sm">
          {totalLabels.map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p className="text-muted-foreground">{label}</p>
              <p className={`text-lg font-bold ${color}`}>${value.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="h-[300px]" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#CBD5E1" fontSize={12} />
              <YAxis
                stroke="#CBD5E1"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid #334155",
                  color: "white",
                  borderRadius: "0.5rem",
                }}
                formatter={(value) => [`$${value}`, "Amount"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#22C55E"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#EF4444"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
