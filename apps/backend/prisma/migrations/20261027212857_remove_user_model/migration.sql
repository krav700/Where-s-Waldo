/*
  Warnings:

  - You are about to drop the column `userUsername` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `username` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_userUsername_fkey";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "userUsername",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "score" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "User";
