import { axiosApiInstanceAuth } from '@/api/interceptors';

export const getUserData = async (userId) => {
  const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;
  const res = await axiosApiInstanceAuth.get(url);

  return res.data;
};
