/*
  Warnings:

  - You are about to drop the column `employee_id` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `employee_id` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_employee_id_fkey";

-- AlterTable
ALTER TABLE "Refund" ADD COLUMN     "employee_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "employee_id";

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
