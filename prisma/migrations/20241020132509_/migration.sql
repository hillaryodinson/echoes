-- CreateTable
CREATE TABLE "Nok" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "altEmail" TEXT,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,
    "userId" TEXT,

    CONSTRAINT "Nok_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Nok" ADD CONSTRAINT "Nok_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
