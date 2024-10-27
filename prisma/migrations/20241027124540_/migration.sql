/*
  Warnings:

  - Added the required column `willExecutorId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "setupState" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "willExecutorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "will_executors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "altEmail" TEXT,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,

    CONSTRAINT "will_executors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_willExecutorId_fkey" FOREIGN KEY ("willExecutorId") REFERENCES "will_executors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
