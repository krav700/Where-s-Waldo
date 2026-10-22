-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "score" TIMESTAMP(3)[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Characer" (
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

    CONSTRAINT "Characer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" UUID NOT NULL,
    "score" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "mapId" UUID NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Characer" ADD CONSTRAINT "Characer_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
