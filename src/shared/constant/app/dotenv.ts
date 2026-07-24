import 'dotenv/config';

export const API_PORT = Number(process.env.PORT || 3000);
export const IP_BINDING = process.env.IP_BINDING || '0.0.0.0';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = Number(process.env.DB_PORT || 5432);
export const DB_NAME = process.env.DB_NAME || 'app';
export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
export const CORS_ORIGIN = process.env.CORS_ORIGIN?.split(',') || ['*'];
export const NODE_ENV =
  (process.env.NODE_ENV as 'development' | 'production' | 'test') ??
  'development';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const API_VERSION = process.env.API_VERSION
  ? Number(process.env.API_VERSION)
  : 1.0;
export const API_PREFIX = process.env.API_PREFIX || '/api';
export const API_BASE_URL = API_PREFIX + '/v' + API_VERSION;

export const CORS_OPTIONS = {
  origin: process.env.HTTP_ORIGIN?.split(',') || ['*'],
  methods: process.env.HTTP_METHODS?.split(',') || [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],
  allowedHeaders: process.env.HTTP_ALLOWED_HEADERS?.split(',') || [
    'Content-Type',
    'Authorization',
  ],
  credentials: process.env.HTTP_CREDENTIALS === 'true' || true,
  maxAge: Number(process.env.HTTP_MAX_AGE) || 86400,
};
