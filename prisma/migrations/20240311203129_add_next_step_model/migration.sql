-- CreateTable
CREATE TABLE "NextStep" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "notes" TEXT,
    "type" TEXT,
    "userId" INTEGER,
    "contactId" INTEGER,

    CONSTRAINT "NextStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NextStep" ADD CONSTRAINT "NextStep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NextStep" ADD CONSTRAINT "NextStep_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
