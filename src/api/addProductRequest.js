import { axiosApiInstanceAuth } from '@/api/interceptors';

const addProductRequest = async (form) => {
  const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/products.json`;
  return await axiosApiInstanceAuth.post(url, form);
};
