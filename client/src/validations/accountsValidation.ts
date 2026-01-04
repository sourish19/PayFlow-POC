// import { z } from "zod";

// export type ApiResponse<T> = {
//   success: boolean;
//   status: number;
//   message: string;
//   data: T;
// };

// export const UserAccountBalanceSchema = z.object({
//   balance: z.number().nonnegative(),
// });

// export type UserAccountBalance =
//   ApiResponse<z.infer<typeof UserAccountBalanceSchema>>;

// export const TransferMoneySchema = z.object({
//   amount: z.number().positive(),
//   receiverId: z.string().min(1),
// });

// export type TransferMoney =
//   ApiResponse<z.infer<typeof TransferMoneySchema>>;


import * as z from 'zod';

export const UserAccountBalanceSchema = z.object({
  balance: z.number(),
});

export type UserAccountBalance = {
  success: boolean;
  status: number;
  message: string;
  data: z.infer<typeof UserAccountBalanceSchema>;
};

export const TransferMoneyResponseSchema = z.object({
  success: z.boolean(),
  status: z.number(),
  message: z.string(),
  data: z.array(z.never()),
});

export type TransferMoneyResponse =
  z.infer<typeof TransferMoneyResponseSchema>;