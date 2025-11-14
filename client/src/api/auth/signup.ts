import { axiosInstance } from '@/config/axios';

import { authApiResScheam } from '@/validations/authValidation';

import type {
  SignupSchema,
  AuthApiResScheam,
} from '@/validations/authValidation';

export const signupApi = async (body: SignupSchema) => {
  try {
    const res = await axiosInstance.post<AuthApiResScheam>(
      '/api/v1/signup',
      body
    );
    const data = authApiResScheam.parse(res.data);
    console.log('Signup data --> ', data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
