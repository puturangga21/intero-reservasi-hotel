/*
  Warnings:

  - The `room_number` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "room_number",
ADD COLUMN     "room_number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_room_number_key" ON "Room"("room_number");
