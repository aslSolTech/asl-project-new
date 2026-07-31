import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { AppError } from '../../utils/appError.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { logger } from '../../config/logger/logger.js';
import { NODE_ENV } from '../../config/dotenv/dotenv.js';

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let details: unknown = undefined;
  let isOperational = false;

  // 1. Operational AppErrors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorCode = err.errorCode;
    details = err.errors;
    isOperational = err.isOperational;
  }
  // 2. Zod Validation Errors
  else if (err instanceof ZodError) {
    statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    message = 'Validation Error';
    errorCode = 'VALIDATION_ERROR';
    details = err.issues.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
      code: e.code,
    }));
    isOperational = true;
  }
  // 3. Syntax / JSON Parsing Errors
  else if (err instanceof SyntaxError && 'status' in err && (err as { status?: number }).status === 400) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Invalid JSON syntax in request body';
    errorCode = 'INVALID_JSON_SYNTAX';
    isOperational = true;
  }
  // 4. JWT Errors
  else if (err.name === 'JsonWebTokenError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Invalid authentication token';
    errorCode = 'INVALID_TOKEN';
    isOperational = true;
  } else if (err.name === 'TokenExpiredError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Authentication token has expired';
    errorCode = 'TOKEN_EXPIRED';
    isOperational = true;
  // 5. Other Generic Errors (Axios/Third-Party/Standard Errors)
  } else {
    const extractedMessage =
      (err as any)?.response?.data?.message ||
      (err as any)?.response?.message ||
      err?.message;

    if (extractedMessage) {
      message = extractedMessage;
    }
  }

  const finalMessage = message && message !== 'Internal Server Error' ? message : ((err as any)?.response?.data?.message || (err as any)?.response?.message || err?.message || 'Something went wrong');

  // Log error with Pino
  if (!isOperational || statusCode >= 500) {
    logger.error(
      {
        err,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        stack: err.stack,
      },
      `[Unhandled Exception] ${finalMessage}`,
    );
  } else {
    logger.warn(
      {
        url: req.originalUrl,
        method: req.method,
        statusCode,
        errorCode,
        message: finalMessage,
      },
      `[Operational Exception] ${finalMessage}`,
    );
  }

  // Construct response payload
  const errorDetail = {
    code: errorCode,
    message: finalMessage,
    ...(details !== undefined && { details }),
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  };

  ApiResponse.error(res, {
    statusCode,
    message: finalMessage,
    error: errorDetail,
  });
};
