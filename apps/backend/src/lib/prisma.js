require("dotenv/config");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../db/generated/prisma/client.js");
const { Pool } = require('pg')

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({
    connectionString,
    // ssl: { rejectUnauthorized: false },
});

// const adapter = new PrismaPg({
//     connectionString,
//     ssl: { rejectUnauthorized: false },
// });
// const prisma = new PrismaClient({ adapter });

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports = { prisma };
