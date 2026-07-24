import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import express, { type Request, type Response } from 'express';
import type { Server } from 'http';
import { z } from 'zod';
import { httpLogger } from '../middlewares/logger/httpLogger.js';
import { errorHandler } from '../middlewares/errorhandler/errorHandler.js';
import { notFoundHandler } from '../middlewares/errorhandler/notFoundHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { BadRequestError } from '../utils/appError.js';
import { asyncHandler } from '../middlewares/asynchandler/asyncHandler.js';

describe('Global Error Handling & API Response System', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    const testApp = express();
    testApp.use(httpLogger);
    testApp.use(express.json());

    testApp.get('/', (_req: Request, res: Response) => {
      ApiResponse.success(res, {
        message: 'Backend Service API is running smoothly',
        data: { status: 'healthy' },
      });
    });

    testApp.get(
      '/test-error',
      asyncHandler(async () => {
        throw new BadRequestError('Invalid input payload', { field: 'email' });
      })
    );

    testApp.get(
      '/test-zod',
      asyncHandler(async () => {
        const schema = z.object({ username: z.string().min(3) });
        schema.parse({ username: 'a' });
      })
    );

    testApp.get(
      '/test-uncaught',
      asyncHandler(async () => {
        throw new Error('Database connection failed unexpectedly');
      })
    );

    testApp.use(notFoundHandler);
    testApp.use(errorHandler);

    await new Promise<void>((resolve) => {
      server = testApp.listen(0, '127.0.0.1', () => {
        const address = server.address();
        if (typeof address === 'object' && address !== null) {
          baseUrl = `http://127.0.0.1:${address.port}`;
        }
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  it('should return standardized success response for GET /', async () => {
    const res = await fetch(`${baseUrl}/`);
    const data = (await res.json()) as any;

    expect(res.status).toBe(200);
    expect(data.status).toBe(true);
    expect(data.statusCode).toBe(200);
    expect(data.message).toBe('Backend Service API is running smoothly');
    expect(data.data).toEqual({ status: 'healthy' });
    expect(data.timestamp).toBeDefined();
  });

  it('should handle 404 for unmatched routes with standardized error', async () => {
    const res = await fetch(`${baseUrl}/api/v1/unknown-endpoint`);
    const data = (await res.json()) as any;

    expect(res.status).toBe(404);
    expect(data.status).toBe(false);
    expect(data.statusCode).toBe(404);
    expect(data.error.code).toBe('NOT_FOUND');
    expect(data.error.message).toContain('Cannot GET /api/v1/unknown-endpoint');
  });

  it('should handle operational AppError (BadRequestError) cleanly', async () => {
    const res = await fetch(`${baseUrl}/test-error`);
    const data = (await res.json()) as any;

    expect(res.status).toBe(400);
    expect(data.status).toBe(false);
    expect(data.error.code).toBe('BAD_REQUEST');
    expect(data.error.message).toBe('Invalid input payload');
    expect(data.error.details).toEqual({ field: 'email' });
  });

  it('should handle Zod validation errors with field details', async () => {
    const res = await fetch(`${baseUrl}/test-zod`);
    const data = (await res.json()) as any;

    expect(res.status).toBe(422);
    expect(data.status).toBe(false);
    expect(data.error.code).toBe('VALIDATION_ERROR');
    expect(data.error.details).toBeDefined();
    expect(Array.isArray(data.error.details)).toBe(true);
    expect(data.error.details[0].field).toBe('username');
  });

  it('should handle unhandled runtime errors with 500 status', async () => {
    const res = await fetch(`${baseUrl}/test-uncaught`);
    const data = (await res.json()) as any;

    expect(res.status).toBe(500);
    expect(data.status).toBe(false);
    expect(data.error.code).toBe('INTERNAL_SERVER_ERROR');
  });
});
