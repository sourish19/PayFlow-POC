import { axiosInstance, isProd } from '@/config/axios';

import { authApiResScheam } from '@/validations/authValidation';

import type {
  LoginSchema,
  AuthApiResScheam,
} from '@/validations/authValidation';

export const loginApi = async (body: LoginSchema) => {
  try {
    const res = await axiosInstance.post<AuthApiResScheam>(
      '/api/v1/user/signin',
      body
    );
    const data = authApiResScheam.parse(res.data.data);
    if (!isProd) console.log('Login data --> ', data);
    return { data, message: res.data.message };
  } catch (error) {
    if (!isProd) console.error('Error in Login --> ', error);
    throw error;
  }
};
