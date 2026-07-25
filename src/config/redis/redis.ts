import { Redis, type RedisOptions } from "ioredis";
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "../dotenv/dotenv.js";

export const redisOptions: RedisOptions = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD || undefined,

    lazyConnect: true,
    enableReadyCheck: true,

    maxRetriesPerRequest: null,

    connectTimeout: 10000,

    keepAlive: 30000,

    retryStrategy(times) {
        return Math.min(times * 1000, 10000);
    },

    reconnectOnError() {
        return true;
    },

    enableOfflineQueue: false,

    autoResubscribe: true,

    autoResendUnfulfilledCommands: true,
};

export const redis = new Redis(redisOptions);

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("ready", () => {
  console.log("Redis Ready");
});

redis.on("error", (err) => {
  console.error(err);
});

redis.on("close", () => {
  console.log("Redis Closed");
});

redis.on("reconnecting", () => {
  console.log("Redis Reconnecting...");
});