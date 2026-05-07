import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
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
