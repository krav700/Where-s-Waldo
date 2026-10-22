/*
  Warnings:

  - You are about to drop the `Characer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Characer" DROP CONSTRAINT "Characer_mapId_fkey";

-- DropTable
DROP TABLE "Characer";

-- CreateTable
CREATE TABLE "Character" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,
    "guessed" BOOLEAN NOT NULL DEFAULT false,
    "startXCoordinate" DOUBLE PRECISION NOT NULL,
    "endXCoordinate" DOUBLE PRECISION NOT NULL,
    "startYCoordinate" DOUBLE PRECISION NOT NULL,
    "endYCoordinate" DOUBLE PRECISION NOT NULL,
    "mapId" UUID NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
