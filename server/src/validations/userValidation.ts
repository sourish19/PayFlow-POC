import { z } from 'zod';

export const UserValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be atleast be 3 characters' })
    .max(20, { message: 'Name cannot exceed 50 characters' }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password cannot exceed 20 characters' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((password) => /[0-9]/.test(password), {
      message: 'Password must contain at least one number',
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'Password must contain at least one special character',
    }),
});

export const validateSignup = (data: unknown) =>
  UserValidationSchema.safeParse(data); // if true return data otherwise ZodError
