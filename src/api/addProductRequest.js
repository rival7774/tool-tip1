import { axiosApiInstanceAuth } from '@/api/interceptors';

export const addProductRequest = async (objProduct) => {
  const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/products.json`;
  return await axiosApiInstanceAuth.post(url, objProduct);
};
