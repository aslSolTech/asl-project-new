import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "../dotenv/dotenv.js";
import { Redis } from "ioredis";

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("Redis Connected Successfully!");
});

redis.on("error", (error) => {
  console.error("Redis Connection Error:", error);
});

export { redis };