import { rateLimit } from "express-rate-limit";

const createRateLimiter = ({
    windowMs,
    max,
    message,
}: {
    windowMs: number;
    max: number;
    message: string;
}) => rateLimit({
    windowMs,
    max,
    message,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        res.status(429).json({
            status: 'fail',
            statusCode: 429,
            message: options.message,
            data: null,
        });
    }
});
// Global Rate Limiter
export const globalLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after an hour',
});

// Auth Rate Limiter
export const authLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after an hour',
});

// API Rate Limiter
export const apiLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after an hour',
});

// WebSocket Rate Limiter
export const websocketLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after an hour',
});

