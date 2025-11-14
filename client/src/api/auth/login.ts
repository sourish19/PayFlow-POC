import { axiosInstance } from '@/config/axios';

import { authApiResScheam } from '@/validations/authValidation';

import type {
  LoginSchema,
  AuthApiResScheam,
} from '@/validations/authValidation';

export const loginApi = async (body: LoginSchema) => {
  try {
    const res = await axiosInstance.post<AuthApiResScheam>(
      '/api/v1/signin',
      body
    );
    const data = authApiResScheam.parse(res.data);
    console.log('Login data --> ', data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
