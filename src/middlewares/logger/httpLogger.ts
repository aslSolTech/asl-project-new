import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';
import { logger } from '../../config/logger/logger.js';
import { FINTECH_SENSITIVE_KEY, MAX_PAYLOAD_BYTES } from '../../config/dotenv/dotenv.js';

export interface RequestWithUser extends Request {
  id?: string;
  startTime?: number;
  user?: {
    id?: string;
    userId?: string;
    merchantId?: string;
    [key: string]: unknown;
  };
}

const FINTECH_SENSITIVE_KEYS = new Set(FINTECH_SENSITIVE_KEY);
const TOTAL_PAYLOAD_BYTES = (MAX_PAYLOAD_BYTES * MAX_PAYLOAD_BYTES); // 1 MB max payload

// PCI-DSS Compliant Credit/Debit Card Number Masking
const maskCardNumbers = (str: string): string => {
  return str.replace(/\b(?:\d[ -]*?){13,19}\b/g, (match) => {
    const digits = match.replace(/[\s-]/g, '');
    if (digits.length >= 13 && digits.length <= 19) {
      return digits.slice(0, 4) + '-XXXX-XXXX-' + digits.slice(-4);
    }
    return match;
  });
};

const truncatePayload = (data: unknown): unknown => {
  if (typeof data === 'string') {
    const masked = maskCardNumbers(data);
    if (masked.length > TOTAL_PAYLOAD_BYTES) {
      return masked.slice(0, TOTAL_PAYLOAD_BYTES) + '... [TRUNCATED]';
    }
    return masked;
  }

  const str = JSON.stringify(data);
  if (str && str.length > TOTAL_PAYLOAD_BYTES) {
    return {
      _truncated: true,
      preview: str.slice(0, TOTAL_PAYLOAD_BYTES) + '... [TRUNCATED]',
    };
  }
  return data;
};

const sanitizePayload = (data: unknown): unknown => {
  if (!data || typeof data !== 'object') {
    return typeof data === 'string' ? maskCardNumbers(data) : data;
  }
  if (Array.isArray(data)) {
    return truncatePayload(data.map(sanitizePayload));
  }

  const cleanObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (FINTECH_SENSITIVE_KEYS.has(key.toLowerCase())) {
      cleanObj[key] = '[REDACTED]';
    } else if (value && typeof value === 'object') {
      cleanObj[key] = sanitizePayload(value);
    } else if (typeof value === 'string') {
      cleanObj[key] = maskCardNumbers(value);
    } else {
      cleanObj[key] = value;
    }
  }
  return truncatePayload(cleanObj);
};

export const httpLogger = (req: RequestWithUser, res: Response, next: NextFunction): void => {
  const requestId = (req.headers['x-request-id'] as string) || randomUUID();
  req.id = requestId;
  req.startTime = Date.now();

  res.setHeader('x-request-id', requestId);

  // Capture response body payload
  let responseBody: unknown = undefined;
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  res.json = (body: unknown): Response => {
    responseBody = body;
    return originalJson(body);
  };

  res.send = (body: unknown): Response => {
    if (!responseBody && typeof body === 'string') {
      try {
        responseBody = JSON.parse(body);
      } catch {
        responseBody = body;
      }
    } else if (!responseBody) {
      responseBody = body;
    }
    return originalSend(body);
  };

  res.on('finish', () => {
    const duration = req.startTime ? Date.now() - req.startTime : 0;

    const requestDetails: Record<string, unknown> = {
      method: req.method,
      url: req.originalUrl || req.url,
      ip: req.ip || req.socket.remoteAddress || '',
      userAgent: req.get('user-agent') || '',
    };

    // User / Merchant context correlation if available
    const userId = req.user?.id || req.user?.userId || req.user?.merchantId;
    if (userId) {
      requestDetails.userId = String(userId);
    }

    if (req.query && Object.keys(req.query).length > 0) {
      requestDetails.query = sanitizePayload(req.query);
    }
    if (req.params && Object.keys(req.params).length > 0) {
      requestDetails.params = sanitizePayload(req.params);
    }
    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
      requestDetails.body = sanitizePayload(req.body);
    }

    const responseDetails: Record<string, unknown> = {
      statusCode: res.statusCode,
      durationMs: `${duration}ms`,
    };

    if (responseBody !== undefined) {
      responseDetails.body = sanitizePayload(responseBody);
    }

    const logData = {
      category: 'HTTP',
      requestId,
      request: requestDetails,
      response: responseDetails,
    };

    const logMessage = `HTTP ${req.method} ${req.originalUrl || req.url} ${res.statusCode} (${duration}ms)`;

    if (res.statusCode >= 500) {
      logger.error(logData, logMessage);
    } else if (res.statusCode >= 400) {
      logger.warn(logData, logMessage);
    } else {
      logger.info(logData, logMessage);
    }
  });

  next();
};
