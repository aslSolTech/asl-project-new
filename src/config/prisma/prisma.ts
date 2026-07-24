import { MYSQL_CONNECTION_LIMIT, MYSQL_HOST, MYSQL_PWD, MYSQL_USER, MYSQL_DB, NODE_ENV } from "../dotenv/dotenv.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client.js";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const adapter = new PrismaMariaDb({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PWD,
  database: MYSQL_DB,
  connectionLimit: MYSQL_CONNECTION_LIMIT,
});

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (NODE_ENV === 'development') globalForPrisma.prisma = prisma;

export { prisma };