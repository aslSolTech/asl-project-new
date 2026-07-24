import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;
  public readonly errors?: unknown;

  constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    errorCode?: string,
    errors?: unknown,
    isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.errorCode = errorCode || AppError.getErrorCodeFromStatus(statusCode);
    this.errors = errors;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  private static getErrorCodeFromStatus(statusCode: number): string {
    try {
      return getReasonPhrase(statusCode).toUpperCase().replace(/\s+/g, '_');
    } catch {
      return 'INTERNAL_SERVER_ERROR';
    }
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', errors?: unknown) {
    super(message, StatusCodes.BAD_REQUEST, 'BAD_REQUEST', errors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', errors?: unknown) {
    super(message, StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED', errors);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', errors?: unknown) {
    super(message, StatusCodes.FORBIDDEN, 'FORBIDDEN', errors);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource Not Found', errors?: unknown) {
    super(message, StatusCodes.NOT_FOUND, 'NOT_FOUND', errors);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict', errors?: unknown) {
    super(message, StatusCodes.CONFLICT, 'CONFLICT', errors);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation Error', errors?: unknown) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY, 'VALIDATION_ERROR', errors);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Too Many Requests', errors?: unknown) {
    super(message, StatusCodes.TOO_MANY_REQUESTS, 'TOO_MANY_REQUESTS', errors);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', errors?: unknown) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', errors, false);
  }
}
