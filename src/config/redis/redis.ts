import { Redis, type RedisOptions } from 'ioredis';
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '../dotenv/dotenv.js';
import { logger } from '../logger/logger.js';

export const redisOptions: RedisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  ...(REDIS_PASSWORD ? { password: REDIS_PASSWORD } : {}),

  lazyConnect: false,
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

  enableOfflineQueue: true,

  autoResubscribe: true,

  autoResendUnfulfilledCommands: true,
};

export const redis = new Redis(redisOptions);

redis.on('connect', () => {
  logger.info('Redis Connected!');
});

redis.on('ready', () => {
  logger.info('Redis Ready!');
});

redis.on('error', (err) => {
  logger.error(err);
});

redis.on('close', () => {
  logger.info('Redis Closed!');
});

redis.on('reconnecting', () => {
  logger.info('Redis Reconnecting...!');
});
