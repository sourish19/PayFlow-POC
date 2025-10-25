import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';

const ErrorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ApiError) {
    res.status(error.status).json({
      success: error.success,
      message: error.message,
      code: error.code,
      data: error.data,
      error: error.error,
    });
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      code: 'INTERNAL_SERVER_ERROR',
      data: [],
      error: [],
    });
  }
};

export default ErrorMiddleware;
