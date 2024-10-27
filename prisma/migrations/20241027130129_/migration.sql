-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_willExecutorId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "willExecutorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_willExecutorId_fkey" FOREIGN KEY ("willExecutorId") REFERENCES "will_executors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
