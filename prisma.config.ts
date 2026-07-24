import { MYSQL_URI } from "./src/config/dotenv/dotenv.js";
import { defineConfig} from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: MYSQL_URI,
  },
});
