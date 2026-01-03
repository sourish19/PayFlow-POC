import { axiosInstance, isProd } from '@/config/axios';

import {
  AuthApiResponseSchema,
  type UserLoginPayload,
  type AuthApiResponse,
} from '@/validations/authValidation';

export const loginApi = async (body: UserLoginPayload) => {
  try {
    const res = await axiosInstance.post<AuthApiResponse>(
      '/api/v1/user/signin',
      body
    );
    const parsedData = AuthApiResponseSchema.parse(res.data);
    if (!isProd) console.log('Login data --> ', parsedData);
    return { data: parsedData.data, message: parsedData.message };
  } catch (error) {
    if (!isProd) console.error('Error in Login --> ', error);
    throw error;
  }
};
