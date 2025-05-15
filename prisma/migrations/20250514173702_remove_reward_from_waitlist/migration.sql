/*
  Warnings:

  - You are about to drop the column `coins` on the `waitlist_users` table. All the data in the column will be lost.
  - You are about to drop the column `reward` on the `waitlist_users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "waitlist_users" DROP COLUMN "coins",
DROP COLUMN "reward";
