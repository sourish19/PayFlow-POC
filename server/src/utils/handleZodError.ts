import { z } from 'zod';

import { ValidationError } from './apiError';

const handleZodError = <T>(result: z.ZodSafeParseResult<T>): T => {
  // ZodSafeParseResult<T> is a discriminated union so only success or error will be their at a time
  if (result.success) {
    return result.data;
  }

  const customError = result.error.issues.map((err) => ({
    path: err.path[0] || '',
    message: err.message,
  }));

  throw new ValidationError('Validation error', customError);
};

export default handleZodError;
