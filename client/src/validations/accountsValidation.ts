import * as z from 'zod';

export const UserAccountBalanceSchema = z.object({
  balance: z.number(),
});

// export type UserAccountBalance = z.infer<typeof UserAccountBalanceSchema>;

export type UserAccountBalance = {
  success: boolean;
  status: number;
  message: string;
  data: z.infer<typeof UserAccountBalanceSchema>;
};
