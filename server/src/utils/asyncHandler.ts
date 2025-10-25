import { RequestHandler, Request, Response, NextFunction } from 'express';

const asyncHandler = (requestHandler: RequestHandler) => {
  (req: Request, res: Response, next: NextFunction) => {
    try {
      Promise.resolve(requestHandler(req, res, next));
    } catch (error) {
      next();
    }
  };
};

export default asyncHandler;
