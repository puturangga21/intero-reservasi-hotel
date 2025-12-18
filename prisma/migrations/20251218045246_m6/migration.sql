/*
  Warnings:

  - The values [NO_SHOW] on the enum `ReservationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `role` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReservationStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED', 'REFUNDED');
ALTER TABLE "public"."Reservation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Reservation" ALTER COLUMN "status" TYPE "ReservationStatus_new" USING ("status"::text::"ReservationStatus_new");
ALTER TYPE "ReservationStatus" RENAME TO "ReservationStatus_old";
ALTER TYPE "ReservationStatus_new" RENAME TO "ReservationStatus";
DROP TYPE "public"."ReservationStatus_old";
ALTER TABLE "Reservation" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
ALTER TYPE "TransactionStatus" ADD VALUE 'REFUNDED';

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Refund" (
    "refund_id" TEXT NOT NULL,
    "reservation_id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "refund_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("refund_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Refund_reservation_id_key" ON "Refund"("reservation_id");

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "Reservation"("reservation_id") ON DELETE RESTRICT ON UPDATE CASCADE;
