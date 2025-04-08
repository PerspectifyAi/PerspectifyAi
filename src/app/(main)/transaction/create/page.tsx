export const dynamic = "force-dynamic";

import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/types";
import { TransactionForm } from "../_components/transaction-form";

export default async function AddTransactionPage() {
  const accounts = await getUserAccounts();

  const simplifiedAccounts = accounts.map((acc) => ({
    id: acc.id,
    name: acc.name,
  }));

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-start mb-8">
        {/* Add heading or UI if needed */}
      </div>

      <TransactionForm
        accounts={simplifiedAccounts}
        categories={defaultCategories.map((cat) => cat.name)}
      />
    </div>
  );
}
