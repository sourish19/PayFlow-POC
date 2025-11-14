import { axiosInstance, isProd } from '@/config/axios';

import { authApiResScheam } from '@/validations/authValidation';

import type {
  SignupSchema,
  AuthApiResScheam,
} from '@/validations/authValidation';

export const signupApi = async (body: SignupSchema) => {
  try {
    const res = await axiosInstance.post<AuthApiResScheam>(
      '/api/v1/user/signup',
      body
    );
    const data = authApiResScheam.parse(res.data.data);
    if (!isProd) console.log(data);
    return { data, message: res.data.message };
  } catch (error) {
    if (!isProd) console.error('Error in Signup --> ', error);
    throw error;
  }
};
