import { axiosApiInstanceAuth } from '@/api/interceptors';

export const getRelationAllUsersProductsRequest = async () => {
  const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/user-products.json`;
  const res = await axiosApiInstanceAuth.get(url);
  return res.data;
}
