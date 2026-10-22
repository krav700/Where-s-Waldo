require("dotenv").config();
const { prisma } = require("../lib/prisma.js");

async function main() {
    console.log("deleting...");
    await prisma.character.deleteMany({});
    await prisma.score.deleteMany({});
    await prisma.map.deleteMany({});
    await prisma.user.deleteMany({});
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
