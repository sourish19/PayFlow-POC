import { axiosInstance, isProd } from '@/config/axios';

import {
  UserAccountBalanceSchema,
  type UserAccountBalance,
} from '@/validations/accountsValidation';

export const getUserAccBalance = async () => {
  try {
    const res = await axiosInstance.get<UserAccountBalance>(
      '/api/v1/account/balance'
    );
    const data = UserAccountBalanceSchema.parse(res.data.data);
    if (!isProd) console.log('getUserAccBalance data --> ', data);
    return data;
  } catch (error) {
    if (!isProd) console.error('Error in getUserAccBalance --> ', error);
    throw error;
  }
};
