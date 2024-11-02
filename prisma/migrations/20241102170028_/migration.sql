-- CreateTable
CREATE TABLE "vaults" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "vaults_pkey" PRIMARY KEY ("id")
);
