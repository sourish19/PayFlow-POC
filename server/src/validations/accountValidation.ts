import { z } from 'zod';

const AccountValidationSchema = z.object({
  receverId: z.string().trim(),
  amount: z
    .number()
    .min(1, { message: 'Amount must be at least 1' })
    .max(1000000, { message: 'Amount cannot exceed 1000000' }),
});

export const validateTransfer = (data: unknown) =>
  AccountValidationSchema.safeParse(data);
