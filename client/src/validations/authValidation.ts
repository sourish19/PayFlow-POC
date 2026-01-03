import * as z from 'zod';

export const UserCredentialsSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .transform((value) => value.toLowerCase()),

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

export const UserProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: 'First name must be at least 3 characters' })
    .max(50, { message: 'First name cannot exceed 50 characters' }),

  lastName: z
    .string()
    .trim()
    .min(3, { message: 'Last name must be at least 3 characters' })
    .max(50, { message: 'Last name cannot exceed 50 characters' }),
});

export const UserSignupSchema = UserProfileSchema.and(UserCredentialsSchema);

export const UserLoginSchema = UserCredentialsSchema;

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
});

export const AuthApiResponseSchema = z.object({
  success: z.boolean(),
  status: z.number(),
  message: z.string(),
  data: AuthUserSchema,
});

export const SearchUsersResponseSchema = z.object({
  success: z.boolean(),
  status: z.number(),
  message: z.string(),
  data: z.array(AuthUserSchema),
});

export type UserSignupPayload = z.infer<typeof UserSignupSchema>;
export type UserLoginPayload = z.infer<typeof UserLoginSchema>;

export type AuthApiResponse = z.infer<typeof AuthApiResponseSchema>;
export type SearchUsersResponse = z.infer<typeof SearchUsersResponseSchema>;
