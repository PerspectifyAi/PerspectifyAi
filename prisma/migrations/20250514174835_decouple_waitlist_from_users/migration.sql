/*
  Warnings:

  - You are about to drop the column `userId` on the `waitlist_users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "waitlist_users" DROP CONSTRAINT "waitlist_users_userId_fkey";

-- DropIndex
DROP INDEX "waitlist_users_userId_key";

-- AlterTable
ALTER TABLE "waitlist_users" DROP COLUMN "userId";
