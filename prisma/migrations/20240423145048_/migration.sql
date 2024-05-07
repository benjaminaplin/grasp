/*
  Warnings:

  - You are about to drop the column `date` on the `NextStep` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NextStep" DROP COLUMN "date",
ADD COLUMN     "dueDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
