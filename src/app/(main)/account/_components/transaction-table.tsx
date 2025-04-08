"use client";

import { useState, useMemo } from "react";
import { Trash2, ArrowUpDown } from "lucide-react";
import { SerializedTransaction } from "@/types";
import { bulkDeleteTransactions } from "actions/account";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { format} from "date-fns";
import { toast } from "sonner";

interface TransactionTableProps {
  transactions: SerializedTransaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);

  const [filterType, setFilterType] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === filteredTransactions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTransactions.map((t) => t.id));
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    const res = await bulkDeleteTransactions(selectedIds);
    if (res.success) {
      toast.success("Transactions deleted!");
      window.location.reload(); // Can optimize later
    } else {
      toast.error(res.error || "Failed to delete transactions.");
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        if (filterType !== "ALL" && tx.type !== filterType) return false;
        if (filterCategory !== "ALL" && tx.category !== filterCategory) return false;
        const txDate = new Date(tx.date);
        if (startDate && txDate < new Date(startDate)) return false;
        if (endDate && txDate > new Date(endDate)) return false;
        return true;
      })
      .sort((a, b) => {
        const compare = a.date.localeCompare(b.date);
        return sortAsc ? compare : -compare;
      });
  }, [transactions, filterType, filterCategory, startDate, endDate, sortAsc]);

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((t) => t.category));
    return Array.from(unique);
  }, [transactions]);

  const clearFilters = () => {
    setFilterType("ALL");
    setFilterCategory("ALL");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <Select value={filterType} onValueChange={(value: "ALL" | "INCOME" | "EXPENSE") => setFilterType(value)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Filter Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
            <SelectItem value="EXPENSE">Expense</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterCategory} onValueChange={(value: string) => setFilterCategory(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-36"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-36"
        />

        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Transactions</h3>
        {selectedIds.length > 0 && (
          <Button variant="destructive" onClick={handleBulkDelete} size="sm" className="gap-2">
            <Trash2 size={16} />
            Delete Selected
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-muted text-muted-foreground text-left">
            <tr>
              <th className="p-2">
                <Checkbox
                  checked={selectedIds.length === filteredTransactions.length && filteredTransactions.length > 0}
                  onCheckedChange={toggleAll}
                />
              </th>
              <th className="p-2">Description</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Type</th>
              <th
                className="p-2 cursor-pointer select-none"
                onClick={() => setSortAsc((prev) => !prev)}
              >
                Date <ArrowUpDown size={14} className="inline-block ml-1" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-2">
                  <Checkbox
                    checked={selectedIds.includes(tx.id)}
                    onCheckedChange={() => toggleSelection(tx.id)}
                  />
                </td>
                <td className="p-2">{tx.description || "—"}</td>
                <td className="p-2">₹{tx.amount.toFixed(2)}</td>
                <td className="p-2">
                  <Badge variant={tx.type === "INCOME" ? "success" : "destructive"}>
                    {tx.type}
                  </Badge>
                </td>
                <td className="p-2">{format(new Date(tx.date), "dd MMM yyyy")}</td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-muted-foreground">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
