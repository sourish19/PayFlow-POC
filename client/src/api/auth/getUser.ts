import { axiosInstance, isProd } from '@/config/axios';

import {
  AuthApiResponseSchema,
  type AuthApiResponse,
} from '@/validations/authValidation';

export const getUserApi = async () => {
  try {
    const res = await axiosInstance.get<AuthApiResponse>(
      '/api/v1/user/getUser'
    );
    const parsedData = AuthApiResponseSchema.parse(res.data);
    if (!isProd) console.log('getUser data --> ', parsedData);
    return { data: parsedData.data, message: parsedData.message };
  } catch (error) {
    if (!isProd) console.error('Error in getUser --> ', error);
    throw error;
  }
};
