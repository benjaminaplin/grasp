-- CreateTable
CREATE TABLE "JobApplication" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
