const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma");

const emptyErr = "must not be empty.";
const lengthErr = "must be between 3 and 50 characters.";

const validateScoreboardUsername = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage(`Username ${emptyErr}`)
        .isLength({ min: 3, max: 50 })
        .withMessage(`Username ${lengthErr}`),
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
        }
    });

    const map = await prisma.map.findFirst({
        where: {
            title: "Winter",
        },
    });

    const scores = await prisma.score.findMany({
        where: {
            map: {
                id: req.params.mapId,
            },
        },
        take: 10,
        orderBy: {
            score: 'asc'
        },
        select: {
            id: true,
            score: true,
            username: true,
        }
    });

    req.session.score = Date.now();

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

async function getMaps(req, res, next) {
    const maps = await prisma.map.findMany({});
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
    });

    return res.json({ scores });
}

async function postScore(req, res, next) {
    await prisma.score.create({
        data: {
            username: req.body.username,
            score: req.session.score,
            mapId: req.params.mapId,
        }
    });

    console.log("Score created")
    return res.json({ message: 'Score created' });
}

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
            reqCharacters[i].xCoordinate > serverCharacter[i].startXCoordinate &&
            serverCharacter[i].endYCoordinate > reqCharacters[i].yCoordinate &&
            reqCharacters[i].yCoordinate > serverCharacter[i].startYCoordinate
        ) {
            reqCharacters[i].guessed = true;
        } else {
            win = false;
            reqCharacters[i].guessed = false;
        }
    }

    if (win) {
        req.session.score = (Date.now() - req.session.score).toString().slice(0, -3);
    }

    return res.json({ characters: reqCharacters, win });
}

module.exports = {
    getInitialProps,
    getCharacters,
    getMaps,
    getScore,
    getMapScores,
    postScore,
    getCheckedCharacters,
};
