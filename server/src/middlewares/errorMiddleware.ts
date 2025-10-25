import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import ApiError, { ValidationError } from '../utils/apiError';

const ErrorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Zod Validation Error
  if (error instanceof z.ZodError) {
    console.log('Zod error --> ', error);
    res.status(422).json(new ValidationError());
  }
  // Thrown Error from asynchandler
  if (error instanceof ApiError) {
    res.status(error.status).json({
      success: error.success,
      message: error.message,
      code: error.code,
      data: error.data,
      error: error.error,
    });
    // Unexpected Error
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
