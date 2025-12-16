/*
  Warnings:

  - Added the required column `total_nights` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "total_nights" INTEGER NOT NULL;
