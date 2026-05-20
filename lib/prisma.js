import "dotenv/config";
// import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = `${process.env.DATABASE_URL}`;

// const adapter = new PrismaPg({ connectionString });
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({
  adapter,
  // omit password globally (from all queries)
  // can include when needed (during auth)
  omit: {
    user: {
      password: true,
    },
  },
});

export { prisma };
