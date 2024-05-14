import { axiosApiInstanceAuth } from '@/api/interceptors';

export const getProductRequest = async (idProduct) => {
  const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/products/${idProduct}.json`;
  const resProduct = await axiosApiInstanceAuth.get(url);
  return resProduct.data;
};
