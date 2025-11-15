import { axiosInstance, isProd } from '@/config/axios';

import { authApiResScheam } from '@/validations/authValidation';

import type { AuthApiResScheam } from '@/validations/authValidation';

export const getUserApi = async () => {
  try {
    const res = await axiosInstance.get<AuthApiResScheam>(
      '/api/v1/user/getUser'
    );
    const data = authApiResScheam.parse(res.data.data);
    if (!isProd) console.log('getUser data --> ', data);
    return { data, message: res.data.message };
  } catch (error) {
    if (!isProd) console.error('Error in getUser --> ', error);
    throw error;
  }
};
