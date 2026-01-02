import * as z from 'zod';

const UserValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: 'First Name must be at least 3 characters' })
    .max(20, { message: 'First Name cannot exceed 50 characters' }),

  lastName: z
    .string()
    .trim()
    .min(3, { message: 'Last Name must be at least 3 characters' })
    .max(20, { message: 'Last Name cannot exceed 50 characters' }),

  email: z
    .email({ message: 'Invalid email address' })
    .transform((val) => val.toLowerCase()),

  password: z.string().pipe(
    z
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
      })
  ),
});

export const signupSchema = UserValidationSchema;

export const loginSchema = UserValidationSchema.pick({
  email: true,
  password: true,
});

export const authApiResScheam = z.object({
  email: z.string(),
  fullName: z.string(),
  id: z.string(),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

export type AuthApiResSchema = {
  success: boolean;
  status: number;
  message: string;
  data: z.infer<typeof authApiResScheam>;
};
