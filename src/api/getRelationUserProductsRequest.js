import { axiosApiInstanceAuth } from '@/api/interceptors';

export const getRelationUserProductsRequest = async (idUser) => {
  const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/user-products/${idUser}.json`;
  const res = await axiosApiInstanceAuth.get(url);
  return res.data;
};
