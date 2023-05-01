-- CreateTable
CREATE TABLE "invalidDates" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invalidDates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invalidDates" ADD CONSTRAINT "invalidDates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
