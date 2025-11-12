import * as z from 'zod';

export const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password should be at least 6 characters long' }),
  firstName: z
    .string()
    .min(3, { message: 'First name should be at least 3 characters long' }),
  lastName: z
    .string()
    .min(3, { message: 'Last name should be at least 3 characters long' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password should be at least 6 characters long' }),
});
