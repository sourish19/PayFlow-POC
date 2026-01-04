import { axiosInstance, isProd } from '@/config/axios';

import {
  TransferMoneyResponseSchema,
  type TransferMoneyResponse,
} from '@/validations/accountsValidation';

export const transferMoney = async (receverId:string,amount:number) => {
  try {
    const res = await axiosInstance.post<TransferMoneyResponse>(
      '/api/v1/account/transfer',
      {receverId,amount}
    );
    const parsedData = TransferMoneyResponseSchema.parse(res.data);
    if (!isProd) console.log('transferMoney data --> ', parsedData);
    return {message: parsedData.message};
  } catch (error) {
    if (!isProd) console.error('Error in transferMoney --> ', error);
    throw error;
  }
};
