-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "jobApplicationsId" INTEGER;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_jobApplicationsId_fkey" FOREIGN KEY ("jobApplicationsId") REFERENCES "JobApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
