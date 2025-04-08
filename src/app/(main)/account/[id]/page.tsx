import { getAccountWithTransactions } from "@/actions/account";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

interface AccountPageProps {
  params: { id: string };
}

export default async function AccountPage({ params }: AccountPageProps) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className="text-left sm:text-right space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-foreground">
            {account.balance.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} {account._count.transactions === 1 ? "Transaction" : "Transactions"}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="rounded-xl border p-4 shadow-sm bg-background">
        <AccountChart transactions={transactions} />
      </div>

      {/* Transactions Table Section */}
      <TransactionTable transactions={transactions} />
    </div>
  );
}
