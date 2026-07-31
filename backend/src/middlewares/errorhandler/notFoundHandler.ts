import type { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../utils/appError.js';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
};
