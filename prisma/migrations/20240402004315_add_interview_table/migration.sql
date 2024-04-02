/*
  Warnings:

  - You are about to drop the column `company` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "company";

-- AlterTable
ALTER TABLE "JobApplication" ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "nextsteps" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "round" INTEGER NOT NULL,
    "notes" TEXT,
    "type" TEXT,
    "userId" INTEGER,
    "status" TEXT,
    "contactId" INTEGER,
    "jobApplicationId" INTEGER,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
