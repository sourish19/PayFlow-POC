import { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/apiError';

const ErrorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Thrown Error from asynchandler
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      success: error.success,
      message: error.message,
      code: error.code,
      data: error.data,
      error: error.error,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      code: 'SERVER_ERROR',
    });
  }
};

export default ErrorMiddleware;
