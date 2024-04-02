-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "company" VARCHAR(50),
ADD COLUMN     "userid" INTEGER;

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "description" VARCHAR(50),
ADD COLUMN     "nextsteps" VARCHAR(50);
