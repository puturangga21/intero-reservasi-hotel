/*
  Warnings:

  - You are about to drop the column `type` on the `Room` table. All the data in the column will be lost.
  - Added the required column `room_type` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "type",
ADD COLUMN     "room_type" "RoomType" NOT NULL;
