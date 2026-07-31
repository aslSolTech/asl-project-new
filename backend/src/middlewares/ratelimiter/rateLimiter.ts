import type { Request, Response, NextFunction } from 'express';
import { rateLimit, type RateLimitRequestHandler, type Options } from 'express-rate-limit';

export interface RateLimiterOptions {
  windowMs: number;
  max: number;
  message: string;
}

const createRateLimiter = ({ windowMs, max, message }: RateLimiterOptions): RateLimitRequestHandler =>
  rateLimit({
    windowMs,
    limit: max,
    message,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response, _next: NextFunction, options: Options) => {
      res.status(options.statusCode || 429).json({
        status: 'fail',
        statusCode: options.statusCode || 429,
        message: options.message,
        data: null,
      });
    },
  });

// 1. Global Application Rate Limiter (General Protection: 500 requests per 15 minutes)
export const globalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 500,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// 2. Auth & Login Rate Limiter (Brute-Force Protection: 10 attempts per 15 minutes)
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10,
  message: 'Too many login/registration attempts, please try again after 15 minutes',
});

// 3. Standard API Rate Limiter (200 requests per 15 minutes)
export const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 200,
  message: 'Too many API requests from this IP, please try again after 15 minutes',
});

// 4. Strict Rate Limiter for Sensitive Operations (OTP/Password Reset: 5 attempts per hour)
export const strictLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5,
  message: 'Too many sensitive requests (OTP/Password Reset), please try again after an hour',
});

// 5. WebSocket Connection Limiter (50 connection attempts per 15 minutes)
export const websocketLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 50,
  message: 'Too many WebSocket connection attempts, please try again after 15 minutes',
});
