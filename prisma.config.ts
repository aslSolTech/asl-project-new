import { MYSQL_DBNAME, MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_CONNECTION_LIMIT, MYSQL_PORT } from './src/config/dotenv/dotenv.js';
import { defineConfig } from 'prisma/config';

const MYSQL_URI = `mysql://${MYSQL_USER}:${MYSQL_PWD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DBNAME}?connection_limit=${MYSQL_CONNECTION_LIMIT}`;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: MYSQL_URI,
  },
});
