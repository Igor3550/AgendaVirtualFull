/*
  Warnings:

  - Added the required column `description` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "description" TEXT NOT NULL;
