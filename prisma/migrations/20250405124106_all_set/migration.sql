-- DropIndex
DROP INDEX "transactions_category_idx";

-- DropIndex
DROP INDEX "users_clerkUserId_idx";

-- DropIndex
DROP INDEX "users_email_idx";

-- AlterTable
ALTER TABLE "budgets" ALTER COLUMN "amount" DROP DEFAULT;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "amount" DROP DEFAULT;
