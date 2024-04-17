-- CreateTable
CREATE TABLE "Touch" (
    "id" SERIAL NOT NULL,
    "notes" TEXT,
    "type" TEXT,
    "contactId" INTEGER,
    "jobApplicationId" INTEGER,
    "userId" INTEGER,
    "isNextStep" BOOLEAN,
    "isCompleted" BOOLEAN,
    "scheduledDate" TIMESTAMP(3),

    CONSTRAINT "Touch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
