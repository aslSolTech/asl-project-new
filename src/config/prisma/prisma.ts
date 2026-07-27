import { MYSQL_CONNECTION_LIMIT, MYSQL_HOST, MYSQL_PORT, MYSQL_PWD, MYSQL_USER, MYSQL_DBNAME, NODE_ENV } from "../dotenv/dotenv.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client.js";
import { logger } from "../logger/logger.js";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const adapter = new PrismaMariaDb({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PWD,
  database: MYSQL_DBNAME,
  connectionLimit: MYSQL_CONNECTION_LIMIT,
});

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (NODE_ENV === 'development') globalForPrisma.prisma = prisma;

// Connect to MySQL/MariaDB
export const connectMySQL = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info("Mariadb/MySQL connection established successfully!");
  } catch (error) {
    logger.error(`Mariadb/MySQL connection failed: ${error}`);
    throw error;
  }
};


export { prisma };