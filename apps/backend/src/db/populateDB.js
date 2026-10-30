#! /usr/bin/env node
require("dotenv").config();

const waldoImgSrc = "/Characters/Waldo.webp";
const wilmaImgSrc = "/Characters/Wilma.webp";
const whiteBeardImgSrc = "/Characters/WhiteBeard.webp";
const odlawBeardImgSrc = "/Characters/Odlaw.webp";
const woofBeardImgSrc = "/Characters/Woof.webp";
const winterMapImgSrc = "/Maps/Winter.webp";
const beachMapImgSrc = "/Maps/Beach.webp";
const raceTrackMapImgSrc = "/Maps/RaceTrack.webp";
const redCarpetMapImgSrc = "/Maps/RedCarpet.webp";
const spaceMapImgSrc = "/Maps/Space.webp";
const { prisma } = require("../lib/prisma.js");

async function main() {
    console.log("seeding...");
    const maps = await prisma.map.createManyAndReturn({
        data: [
            {
                title: "Winter",
                imgSrc: winterMapImgSrc,
            },
            {
                title: "Beach",
                imgSrc: beachMapImgSrc,
            },
            {
                title: "Race Track",
                imgSrc: raceTrackMapImgSrc,
            },
            {
                title: "Red Carpet",
                imgSrc: redCarpetMapImgSrc,
            },
            {
                title: "Space",
                imgSrc: spaceMapImgSrc,
            }
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
                mapId: maps[0].id,
            },
            {
                name: "Wilma",
                color: "purple",
                imgSrc: wilmaImgSrc,
                guessed: false,
                startXCoordinate: 0.47093266,
                endXCoordinate: 0.50289143,
                startYCoordinate: 0.50442976,
                endYCoordinate: 0.60752255,
                mapId: maps[0].id,
            },
            {
                name: "White Beard",
                color: "cyan",
                imgSrc: whiteBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.04928318,
                endXCoordinate: 0.08845844,
                startYCoordinate: 0.92711018,
                endYCoordinate: 0.99721327,
                mapId: maps[0].id,
            },
            {
                name: "Odlaw",
                color: "yellow",
                imgSrc: odlawBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.30625,
                endXCoordinate: 0.3270833,
                startYCoordinate: 0.7890625,
                endYCoordinate: 0.8390625,
                mapId: maps[0].id,
            },
            {
                name: "Woof",
                color: "white",
                imgSrc: woofBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.2833333,
                endXCoordinate: 0.30729167,
                startYCoordinate: 0.88489583,
                endYCoordinate: 0.9328125,
                mapId: maps[0].id,
            },

            {
                name: "Waldo",
                color: "red",
                imgSrc: waldoImgSrc,
                guessed: false,
                startXCoordinate: 0.60625,
                endXCoordinate: 0.62916667,
                startYCoordinate: 0.3433333,
                endYCoordinate: 0.3966667,
                mapId: maps[1].id,
            },
            {
                name: "Wilma",
                color: "purple",
                imgSrc: wilmaImgSrc,
                guessed: false,
                startXCoordinate: 0.76458333,
                endXCoordinate: 0.7770833,
                startYCoordinate: 0.37833333,
                endYCoordinate: 0.4083333,
                mapId: maps[1].id,
            },
            {
                name: "White Beard",
                color: "cyan",
                imgSrc: whiteBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.2625,
                endXCoordinate: 0.284375,
                startYCoordinate: 0.32,
                endYCoordinate: 0.3683333,
                mapId: maps[1].id,
            },
            {
                name: "Odlaw",
                color: "yellow",
                imgSrc: odlawBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.1,
                endXCoordinate: 0.1125,
                startYCoordinate: 0.323333,
                endYCoordinate: 0.3733333,
                mapId: maps[1].id,
            },
            {
                name: "Woof",
                color: "white",
                imgSrc: woofBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.67604167,
                endXCoordinate: 0.68541667,
                startYCoordinate: 0.3483333,
                endYCoordinate: 0.365,
                mapId: maps[1].id,
            },

            {
                name: "Waldo",
                color: "red",
                imgSrc: waldoImgSrc,
                guessed: false,
                startXCoordinate: 0.263542,
                endXCoordinate: 0.298958,
                startYCoordinate: 0.31583,
                endYCoordinate: 0.375833,
                mapId: maps[2].id,
            },
            {
                name: "Wilma",
                color: "purple",
                imgSrc: wilmaImgSrc,
                guessed: false,
                startXCoordinate: 0.241667,
                endXCoordinate: 0.2625,
                startYCoordinate: 0.710833,
                endYCoordinate: 0.7541667,
                mapId: maps[2].id,
            },
            {
                name: "White Beard",
                color: "cyan",
                imgSrc: whiteBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.598958,
                endXCoordinate: 0.634375,
                startYCoordinate: 0.84417,
                endYCoordinate: 0.930833,
                mapId: maps[2].id,
            },
            {
                name: "Odlaw",
                color: "yellow",
                imgSrc: odlawBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.586458,
                endXCoordinate: 0.608333,
                startYCoordinate: 0.629167,
                endYCoordinate: 0.700833,
                mapId: maps[2].id,
            },
            {
                name: "Woof",
                color: "white",
                imgSrc: woofBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.6010417,
                endXCoordinate: 0.61875,
                startYCoordinate: 0.420833,
                endYCoordinate: 0.455833,
                mapId: maps[2].id,
            },

            {
                name: "Waldo",
                color: "red",
                imgSrc: waldoImgSrc,
                guessed: false,
                startXCoordinate: 0.69375,
                endXCoordinate: 0.709375,
                startYCoordinate: 0.419225,
                endYCoordinate: 0.47092,
                mapId: maps[3].id,
            },
            {
                name: "Wilma",
                color: "purple",
                imgSrc: wilmaImgSrc,
                guessed: false,
                startXCoordinate: 0.582292,
                endXCoordinate: 0.601042,
                startYCoordinate: 0.65994,
                endYCoordinate: 0.69063,
                mapId: maps[3].id,
            },
            {
                name: "White Beard",
                color: "cyan",
                imgSrc: whiteBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.682292,
                endXCoordinate: 0.698958,
                startYCoordinate: 0.65996,
                endYCoordinate: 0.697092,
                mapId: maps[3].id,
            },
            {
                name: "Odlaw",
                color: "yellow",
                imgSrc: odlawBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.547917,
                endXCoordinate: 0.5635417,
                startYCoordinate: 0.782714,
                endYCoordinate: 0.81502,
                mapId: maps[3].id,
            },
            {
                name: "Woof",
                color: "white",
                imgSrc: woofBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.839583,
                endXCoordinate: 0.859375,
                startYCoordinate: 0.632472,
                endYCoordinate: 0.66155,
                mapId: maps[3].id,
            },

            {
                name: "Waldo",
                color: "red",
                imgSrc: waldoImgSrc,
                guessed: false,
                startXCoordinate: 0.396867,
                endXCoordinate: 0.414575,
                startYCoordinate: 0.61916,
                endYCoordinate: 0.65942,
                mapId: maps[4].id,
            },
            {
                name: "Wilma",
                color: "purple",
                imgSrc: wilmaImgSrc,
                guessed: false,
                startXCoordinate: 0.285409,
                endXCoordinate: 0.30208,
                startYCoordinate: 0.51288,
                endYCoordinate: 0.55636,
                mapId: maps[4].id,
            },
            {
                name: "White Beard",
                color: "cyan",
                imgSrc: whiteBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.77291,
                endXCoordinate: 0.79166,
                startYCoordinate: 0.55958,
                endYCoordinate: 0.60467,
                mapId: maps[4].id,
            },
            {
                name: "Odlaw",
                color: "yellow",
                imgSrc: odlawBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.06666,
                endXCoordinate: 0.08020,
                startYCoordinate: 0.69485,
                endYCoordinate: 0.72866,
                mapId: maps[4].id,
            },
            {
                name: "Woof",
                color: "white",
                imgSrc: woofBeardImgSrc,
                guessed: false,
                startXCoordinate: 0.58437,
                endXCoordinate: 0.59895,
                startYCoordinate: 0.90258,
                endYCoordinate: 0.92351,
                mapId: maps[4].id,
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
