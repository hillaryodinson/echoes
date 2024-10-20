/*
  Warnings:

  - You are about to drop the `Nok` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Nok" DROP CONSTRAINT "Nok_userId_fkey";

-- DropTable
DROP TABLE "Nok";

-- CreateTable
CREATE TABLE "noks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "altEmail" TEXT,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,
    "userId" TEXT,

    CONSTRAINT "noks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "noks" ADD CONSTRAINT "noks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
