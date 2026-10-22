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

const updateScoreboard = [
    validateScoreboardUsername,
    async (req, res, next) => {
        const { username } = req.body;
        if (err) {
            console.log(err);
            return next(err);
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                username,
            });
        }

        await prisma.user.create({
            data: {
                username,
                score: await prisma.score.create({
                    score: req.score,
                    userUsername: username,
                }),
                map: {
                    connect: {
                        mapId: req.body.mapId,
                    },
                },
            },
        });

        await prisma.score.findMany({
            where: {
                mapId: req.body.mapId,
            },
            include: {
                users: {
                    select: {
                        username: true,
                    },
                },
            },
            orderBy: {
                score: "asc",
            },
            take: 10,
        });
    },
];

async function getInitialCharacters(req, res, next) {
    const characters = await prisma.character.findMany({
        where: {
            map: {
                title: 'Winter',
            },
        },
    });
    console.log(characters)

    return res.json({ characters });
}

async function getCharacters(req, res, next) {
    const characters = await prisma.characters.findMany({
        where: {
            map: {
                title: req.params.mapId,
            },
        },
    });

    return res.json({ characters });
}

async function getMaps(req, res, next) {
    const maps = await prisma.map.findMany({});
    return res.json({ maps })
}

module.exports = {
    updateScoreboard,
    getInitialCharacters,
    getCharacters,
    getMaps,
};
