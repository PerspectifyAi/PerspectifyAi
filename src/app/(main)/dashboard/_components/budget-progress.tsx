"use client";

import { useEffect, useState, useTransition } from "react";
import { updateBudget } from "actions/budget";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Hook to animate number values (e.g. spent & remaining amounts)
function useAnimatedNumber(target: number, duration = 800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = 16;
    const increment = target / (duration / step);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(parseFloat(start.toFixed(2)));
      }
    }, step);
    return () => clearInterval(interval);
  }, [target, duration]);

  return value;
}

interface BudgetProgressProps {
  initialBudget: number;
  currentExpenses: number;
}

export function BudgetProgress({ initialBudget, currentExpenses }: BudgetProgressProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState(initialBudget);
  const [isPending, startTransition] = useTransition();

  // Calculate percentage, remaining, and check if over budget
  const percentage = budgetAmount > 0 ? Math.min((currentExpenses / budgetAmount) * 100, 100) : 0;
  const remaining = Math.max(budgetAmount - currentExpenses, 0);
  const isOverBudget = currentExpenses > budgetAmount;
  const diff = Math.abs(currentExpenses - budgetAmount);

  // Use animated number hooks for a smooth display
  const animatedSpent = useAnimatedNumber(currentExpenses);
  const animatedRemaining = useAnimatedNumber(remaining);

  // Format currency without any decimals.
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Function to handle saving the updated budget
  async function handleSaveBudget() {
    startTransition(async () => {
      await updateBudget(budgetAmount);
      setIsEditing(false);
    });
  }

  return (
    <div className="group card-hover relative">
      <div className="card-glow" />
      <Card className="bg-neutral-900 text-gray-100 rounded-2xl shadow-none border-none">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-lg sm:text-xl font-semibold text-white">
            Budget Progress
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="text-xs text-blue-400 hover:underline">
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleSaveBudget} disabled={isPending}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setBudgetAmount(initialBudget);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm sm:text-base">
          {/* Editable Monthly Budget */}
          {isEditing && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Monthly Budget</span>
              <Input
                type="number"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(Number(e.target.value))}
                className="w-28 text-right"
              />
            </div>
          )}
          {/* Display Spent Amount */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Spent</span>
            <span className={`font-semibold ${isOverBudget ? "text-red-400" : "text-gray-100"}`}>
              ${currencyFormatter.format(animatedSpent)}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="relative w-full h-3 rounded-full bg-neutral-800 overflow-hidden" aria-hidden="true">
            <div
              className={cn(
                "absolute left-0 top-0 h-full rounded-full transition-[width] duration-500 ease-in-out",
                isOverBudget
                  ? "bg-gradient-to-r from-red-500 to-yellow-300"
                  : "bg-gradient-to-r from-green-500 to-yellow-300"
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
          {/* Display Remaining Amount */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Remaining</span>
            <span className={`font-semibold ${isOverBudget ? "text-red-400" : "text-green-400"}`}>
              ${currencyFormatter.format(animatedRemaining)}
            </span>
          </div>
          {/* Tooltip for additional info */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-right text-xs text-gray-500 cursor-help">
                {percentage.toFixed(0)}% of ${currencyFormatter.format(budgetAmount)} budget used
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="end">
              {isOverBudget ? (
                <span className="text-red-400 font-medium">
                  You are over budget by ${currencyFormatter.format(diff)}
                </span>
              ) : (
                <span className="text-green-400 font-medium">
                  You are under budget by ${currencyFormatter.format(diff)}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        </CardContent>
      </Card>
    </div>
  );
}
