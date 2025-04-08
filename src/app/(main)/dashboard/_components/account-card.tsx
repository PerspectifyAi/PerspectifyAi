"use client";

import {
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Loader2,
} from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { updateDefaultAccount } from "@/actions/account";
import useFetch from "hooks/use-fetch";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface AccountProps {
  id: string;
  name: string;
  type: "CURRENT" | "SAVINGS";
  balance: number;
  isDefault: boolean;
  income?: number;
  expense?: number;
}

interface AccountCardProps {
  account: AccountProps;
}

export function AccountCard({ account }: AccountCardProps) {
  const { id, name, type, balance, isDefault, income = 0, expense = 0 } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDefault) {
      toast.warning("You need at least one default account");
      return;
    }
    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      // Safely extract error message
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message);
    }
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="group card-hover"
    >
      <Card className="relative w-full bg-background text-foreground border border-border rounded-2xl overflow-hidden">
        {/* Soft glow on hover */}
        <div className="absolute inset-0 z-[-1] rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <Link href={`/account/${id}`} className="block p-4 no-underline">
          <CardHeader className="flex justify-between items-center px-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium capitalize">
              <CreditCard className="h-4 w-4 text-primary" />
              {name}
              {isDefault && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-[10px]">
                  Default
                </Badge>
              )}
            </CardTitle>

            {updateDefaultLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Switch
                checked={isDefault}
                onClick={handleDefaultChange}
                disabled={updateDefaultLoading}
                aria-label="Set as default account"
              />
            )}
          </CardHeader>

          <CardContent className="px-0">
            <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {type.charAt(0) + type.slice(1).toLowerCase()} Account
            </p>
          </CardContent>

          <CardFooter className="flex justify-between items-center px-0 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              ${income.toFixed(2)}
            </div>
            <div className="flex items-center gap-1">
              <ArrowDownRight className="h-4 w-4 text-red-500" />
              ${expense.toFixed(2)}
            </div>
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  );
}
