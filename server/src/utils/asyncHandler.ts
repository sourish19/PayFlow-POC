import { RequestHandler, Request, Response, NextFunction } from 'express';

type TRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

const asyncHandler =
  (requestHandler: TRequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };

export default asyncHandler;
