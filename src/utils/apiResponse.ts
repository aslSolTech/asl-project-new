import type { Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { formatISODate } from './others/datefns.js';

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponseOptions<T = unknown> {
  status?: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  error?: ApiErrorDetail;
  meta?: Record<string, unknown>;
}

export class ApiResponse {
  // Send a successful response
  public static success<T>(
    res: Response,
    {
      statusCode = StatusCodes.OK,
      message = getReasonPhrase(statusCode),
      data,
      meta,
    }: {
      statusCode?: number;
      message?: string;
      data?: T;
      meta?: Record<string, unknown>;
    } = {}
  ): Response {
    return res.status(statusCode).json({
      status: true,
      statusCode,
      message,
      ...(data !== undefined && { data }),
      ...(meta !== undefined && { meta }),
      timestamp: formatISODate(),
    });
  }

  // Send an error response
  public static error(
    res: Response,
    {
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
      message = getReasonPhrase(statusCode),
      error,
      meta,
    }: {
      statusCode?: number;
      message?: string;
      error?: ApiErrorDetail;
      meta?: Record<string, unknown>;
    } = {}
  ): Response {
    return res.status(statusCode).json({
      status: false,
      statusCode,
      message,
      ...(error && { error }),
      ...(meta !== undefined && { meta }),
      timestamp: formatISODate(),
    });
  }
}
