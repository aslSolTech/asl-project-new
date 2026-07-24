import type { Request, Response, NextFunction, RequestHandler } from 'express';

export type AsyncRequestHandler<
  P = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, string | string[] | undefined>
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<unknown>;

export const asyncHandler = <
  P = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, string | string[] | undefined>
>(
  fn: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};