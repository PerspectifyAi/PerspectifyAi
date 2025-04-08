"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTransaction } from "actions/transaction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RecurringInterval } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ReceiptScanner, ScannedData } from "./recipt-scanner";
import { Loader2 } from "lucide-react";

interface Props {
  accounts: { id: string; name: string }[];
  categories: string[];
}

export function TransactionForm({ accounts, categories }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
    type: "",
    accountId: "",
    isRecurring: false,
    recurringInterval: "",
  });

  const [hasScanned, setHasScanned] = useState(false);

  const handleScanComplete = (data: ScannedData) => {
    setForm((prev) => ({
      ...prev,
      amount: data.amount?.toString() || prev.amount,
      date: data.date || prev.date,
      description: data.description || prev.description,
      category: data.category || prev.category,
    }));
    setHasScanned(true);
  };

  // Prevent infinite re-renders from repeated scanned data
  useEffect(() => {
    if (hasScanned) {
      setHasScanned(false);
    }
  }, [hasScanned]);

  const handleChange = (
    key: keyof typeof form,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    startTransition(async () => {
      try {
        const data = {
          amount: parseFloat(form.amount),
          date: form.date,
          description: form.description,
          category: form.category,
          type: form.type as "INCOME" | "EXPENSE",
          accountId: form.accountId,
          isRecurring: form.isRecurring,
          recurringInterval: form.recurringInterval
            ? (form.recurringInterval as RecurringInterval)
            : undefined,
        };

        await createTransaction(data);
        toast.success("Transaction created");

        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong";
        toast.error(errorMessage);
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto -mt-[150px] p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border">
      <h1 className="text-center text-3xl font-bold mb-6 gradient-title">
        Add Transaction
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid gap-6"
      >
        <ReceiptScanner onScanComplete={handleScanComplete} />

        <div className="grid gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            required
            value={form.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            required
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            type="text"
            required
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={form.category}
            onValueChange={(value) => handleChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={form.type}
            onValueChange={(value) => handleChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="accountId">Account</Label>
          <Select
            value={form.accountId}
            onValueChange={(value) => handleChange("accountId", value)}
          >
            <SelectTrigger>
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
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isRecurring"
            checked={form.isRecurring}
            onCheckedChange={(val) => handleChange("isRecurring", !!val)}
          />
          <Label htmlFor="isRecurring">Recurring</Label>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="recurringInterval">Recurring Interval</Label>
          <Select
            value={form.recurringInterval}
            onValueChange={(value) =>
              handleChange("recurringInterval", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAILY">Daily</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full hover:bg-green-600 transition duration-300 cursor-pointer"
        >
          {isPending || isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Saving...
            </>
          ) : (
            "Save Transaction"
          )}
        </Button>
      </form>
    </div>
  );
}
