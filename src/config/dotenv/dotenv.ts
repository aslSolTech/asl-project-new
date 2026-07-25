import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  IP_BINDING: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  API_PREFIX: z.string().default('/api'),
  API_VERSION: z.coerce.number().default(1.0),
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/payzones_logs'),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_USERNAME: z.string().default(''),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().default(''),
  MYSQL_HOST: z.string().default('localhost'),
  MYSQL_PORT: z.coerce.number().default(3306),
  MYSQL_DB: z.string().default('payzones_db'),
  MYSQL_USER: z.string().default('root'),
  MYSQL_PWD: z.string().default('root1234'),
  MYSQL_CONNECTION_LIMIT: z.coerce.number().default(5),
  CORS_ORIGIN: z.string().default('*'),
  JWT_SECRET: z.string().default('secret'),
  JWT_SECRET_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string().default(''),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  AES_KEY: z.string().default('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'),
  AES_IV: z.string().default('0123456789abcdef01234567'),
  AES_ALGO: z.string().default('aes-256-gcm'),
  HTTP_ORIGIN: z.string().default('*'),
  HTTP_METHODS: z.string().default('*'),
  HTTP_MAX_AGE: z.coerce.number().default(86400),
  HTTP_ALLOWED_HEADERS: z.string().default('Content-Type,Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Credentials'),
  HTTP_CREDENTIALS: z
    .preprocess((val) => {
      if (typeof val === 'string') return val.toLowerCase() === 'true';
      return val;
    }, z.boolean())
    .default(true),
  GMAIL_ID: z.email(),
  GMAIL_APP_PASSWORD: z.string(),
  S3_ENDPOINT: z.string().default('https://nyc3.digitaloceanspaces.com'),
  S3_REGION: z.string().default('nyc3'),
  S3_BUCKET: z.string().default('my-storage-bucket'),
  S3_ACCESS_KEY_ID: z.string().default(''),
  S3_SECRET_ACCESS_KEY: z.string().default(''),
  S3_CDN_URL: z.string().default(''),
});

export const env = envSchema.parse(process.env);
export const MONGODB_URI = env.MONGODB_URI;
export const REDIS_HOST = env.REDIS_HOST;
export const REDIS_USERNAME = env.REDIS_USERNAME;
export const REDIS_PORT = env.REDIS_PORT;
export const REDIS_PASSWORD = env.REDIS_PASSWORD;
export const MYSQL_HOST = env.MYSQL_HOST;
export const MYSQL_PORT = env.MYSQL_PORT;
export const MYSQL_DB = env.MYSQL_DB;
export const MYSQL_USER = env.MYSQL_USER;
export const MYSQL_PWD = env.MYSQL_PWD;
export const MYSQL_CONNECTION_LIMIT = env.MYSQL_CONNECTION_LIMIT;
export const API_PORT = env.PORT;
export const IP_BINDING = env.IP_BINDING;
export const CORS_ORIGIN = env.CORS_ORIGIN?.split(',') || ['*'];
export const NODE_ENV = env.NODE_ENV;
export const JWT_SECRET = env.JWT_SECRET;
export const JWT_SECRET_EXPIRES_IN = env.JWT_SECRET_EXPIRES_IN;
export const JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET;
export const JWT_REFRESH_EXPIRES_IN = env.JWT_REFRESH_EXPIRES_IN;
export const AES_KEY = env.AES_KEY;
export const AES_IV = env.AES_IV;
export const AES_ALGO = env.AES_ALGO;
export const API_VERSION = env.API_VERSION;
export const API_PREFIX = env.API_PREFIX;
export const API_BASE_URL = API_PREFIX + '/v' + API_VERSION;
export const GMAIL_ID = env.GMAIL_ID;
export const GMAIL_APP_PASSWORD = env.GMAIL_APP_PASSWORD;
export const S3_ENDPOINT = env.S3_ENDPOINT;
export const S3_REGION = env.S3_REGION;
export const S3_BUCKET = env.S3_BUCKET;
export const S3_ACCESS_KEY_ID = env.S3_ACCESS_KEY_ID;
export const S3_SECRET_ACCESS_KEY = env.S3_SECRET_ACCESS_KEY;
export const S3_CDN_URL = env.S3_CDN_URL;

export const CORS_OPTIONS = {
  origin: env.HTTP_ORIGIN?.split(',') || ['*'],
  methods: env.HTTP_METHODS?.split(','),
  allowedHeaders: env.HTTP_ALLOWED_HEADERS?.split(','),
  credentials: Boolean(env.HTTP_CREDENTIALS),
  maxAge: env.HTTP_MAX_AGE
};
