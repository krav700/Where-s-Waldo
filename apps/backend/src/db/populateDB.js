#! /usr/bin/env node
require("dotenv").config();

const waldoImgSrc = "/Characters/Waldo.webp";
const wilmaImgSrc = "/Characters/Wilma.webp";
const whiteBeardImgSrc = "/Characters/WhiteBeard.webp";
const winterMapImgSrc = "/Maps/Winter.png";
const { prisma } = require("../lib/prisma.js");

async function main() {
    console.log("seeding...");
    const winterMap = await prisma.map.createManyAndReturn({
        data: [
            {
                title: "Winter",
                imgSrc: winterMapImgSrc,
            },
        ],
    });

    await prisma.character.createMany({
        data: [
            {
                name: "Waldo",
                color: "red",
                imgSrc: waldoImgSrc,
                guessed: false,
                startXCoordinate: 0.83485019,
                endXCoordinate: 0.89618234,
                startYCoordinate: 0.87711823,
                endYCoordinate: 0.99721327,
                mapId: winterMap[0].id,
            },
            {
                name: "Wilma",
                color: "purple",
                imgSrc: wilmaImgSrc,
                guessed: false,
                startXCoordinate: 0.47093266,
                startYCoordinate: 0.50442976,
                endXCoordinate: 0.50289143,
                endYCoordinate: 0.60752255,
                mapId: winterMap[0].id,
            },
            {
                name: "White Beard",
                color: "yellow",
                imgSrc: whiteBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.04928318,
                startYCoordinate: 0.92711018,
                endXCoordinate: 0.08845844,
                endYCoordinate: 0.99721327,
                mapId: winterMap[0].id,
            },
        ],
    });
    console.log("done");
}

main()
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
