import { axiosInstance, isProd } from '@/config/axios';

import {
  SearchUsersResponseSchema,
  type SearchUsersResponse,
} from '@/validations/authValidation';

export const searchUsers = async (keyword: string) => {
  try {
    const res = await axiosInstance.get<SearchUsersResponse>(
      `/api/v1/user/bulk?filter=${keyword}`
    );
    const parsedData = SearchUsersResponseSchema.parse(res.data);
    if (!isProd) console.log('search user data --> ', parsedData);
    return { data: parsedData.data, message: parsedData.message };
  } catch (error) {
    if (!isProd) console.error('Error in serachUser --> ', error);
    throw error;
  }
};
