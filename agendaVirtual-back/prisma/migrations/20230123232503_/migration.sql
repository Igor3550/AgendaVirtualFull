/*
  Warnings:

  - Changed the type of `hour` on the `schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "hour",
ADD COLUMN     "hour" INTEGER NOT NULL;
