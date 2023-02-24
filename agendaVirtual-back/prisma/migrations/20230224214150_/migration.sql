-- CreateTable
CREATE TABLE "usersAdmins" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usersAdmins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usersAdmins" ADD CONSTRAINT "usersAdmins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
