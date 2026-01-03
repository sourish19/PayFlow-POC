import { axiosInstance, isProd } from '@/config/axios';

import {
  AuthApiResponseSchema,
  type UserSignupPayload,
  type AuthApiResponse,
} from '@/validations/authValidation';

export const signupApi = async (body: UserSignupPayload) => {
  try {
    const res = await axiosInstance.post<AuthApiResponse>(
      '/api/v1/user/signup',
      body
    );
    const parsedData = AuthApiResponseSchema.parse(res.data);
    if (!isProd) console.log(parsedData);
    return { data: parsedData.data, message: parsedData.message };
  } catch (error) {
    if (!isProd) console.error('Error in Signup --> ', error);
    throw error;
  }
};
