const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma");

const validateScoreboardUsername = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage(`Username must not be empty.`)
        .isLength({ min: 1, max: 10 })
        .withMessage(`Username must be between 1 and 10 characters.`),
];

async function getInitialProps(req, res, next) {
    const characters = await prisma.character.findMany({
        where: {
            map: {
                title: "Winter",
            },
        },
        omit: {
            startXCoordinate: true,
            startYCoordinate: true,
            endXCoordinate: true,
            endYCoordinate: true,
        },
    });

    const map = await prisma.map.findFirst({
        where: {
            title: "Winter",
        },
    });

    const scores = await prisma.score.findMany({
        where: {
            map: {
                title: "Winter",
            },
        },
        take: 10,
        orderBy: {
            score: "asc",
        },
        select: {
            id: true,
            score: true,
            username: true,
        },
    });

    req.session.score = Date.now();
    req.session.mapSubmited = true;

    return res.json({ characters, map, scores });
}

async function getCharacters(req, res, next) {
    const characters = await prisma.character.findMany({
        where: {
            map: {
                id: req.params.mapId,
            },
        },
    });

    return res.json({ characters });
}

async function getMap(req, res, next) {
    const map = await prisma.map.findFirst({
        where: {
            id: req.params.mapId,
        },
    });

    const characters = await prisma.character.findMany({
        where: {
            mapId: req.params.mapId,
        },
    });

    const scores = await prisma.score.findMany({
        where: {
            mapId: req.params.mapId,
        },
    });

    req.session.score = Date.now();
    req.session.mapSubmited = true;

    return res.json({ map, characters, scores });
}

async function getMaps(req, res, next) {
    const maps = await prisma.map.findMany({
        select: {
            id: true,
            title: true,
        },
    });
    return res.json({ maps });
}

async function getScore(req, res, next) {
    const score = req.session.score;
    return res.json({ score });
}

async function getMapScores(req, res, next) {
    const scores = await prisma.score.findMany({
        where: {
            map: {
                id: req.params.mapId,
            },
        },
        take: 10,
        orderBy: {
            score: "asc",
        },
        select: {
            id: true,
            score: true,
            username: true,
        },
    });

    return res.json({ scores });
}

const postScore = [
    validateScoreboardUsername,
    async function (req, res, next) {
        const { username } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                username,
            });
        }

        await prisma.score.create({
            data: {
                username: username,
                score: parseInt(req.session.score),
                mapId: req.params.mapId,
            },
        });

        console.log("Score created");
        return res.json({ message: "Score created" });
    },
];

async function getCheckedCharacters(req, res, next) {
    const reqCharacters = req.body.characters;

    const serverCharacter = await prisma.character.findMany({
        where: {
            map: {
                id: req.params.mapId,
            },
        },
    });

    let win = true;

    for (let i = 0; i < serverCharacter.length; i++) {
        if (
            serverCharacter[i].endXCoordinate > reqCharacters[i].xCoordinate &&
            reqCharacters[i].xCoordinate >
                serverCharacter[i].startXCoordinate &&
            serverCharacter[i].endYCoordinate > reqCharacters[i].yCoordinate &&
            reqCharacters[i].yCoordinate > serverCharacter[i].startYCoordinate
        ) {
            reqCharacters[i].guessed = true;
        } else {
            win = false;
            reqCharacters[i].guessed = false;
        }
    }

    if (win && req.session.mapSubmited) {
        req.session.score = (Date.now() - req.session.score)
            .toString()
            .slice(0, -3);
        req.session.mapSubmited = false;
    }

    return res.json({ characters: reqCharacters, win });
}

module.exports = {
    getInitialProps,
    getCharacters,
    getMap,
    getMaps,
    getScore,
    getMapScores,
    postScore,
    getCheckedCharacters,
};
