import { z } from 'zod';

import { ValidationError } from './apiError';

const handleZodError = <T>(result: z.ZodSafeParseResult<T>) => {
  if (result.success && result.data) return result.data;

  if (result.error) {
    const error = z.flattenError(result?.error);
    console.log('HandleZodError --> ', error);

    throw new ValidationError('valadationerror');
  }
  return result.data;
};

export default handleZodError;
