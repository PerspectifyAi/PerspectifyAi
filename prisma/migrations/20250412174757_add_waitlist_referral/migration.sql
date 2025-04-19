-- CreateTable
CREATE TABLE "waitlist_users" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "referredBy" TEXT,
    "referrals" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlist_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_users_userId_key" ON "waitlist_users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_users_email_key" ON "waitlist_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_users_referralId_key" ON "waitlist_users"("referralId");

-- AddForeignKey
ALTER TABLE "waitlist_users" ADD CONSTRAINT "waitlist_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
