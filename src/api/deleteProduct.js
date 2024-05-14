import { axiosApiInstanceAuth } from '@/api/interceptors';

export const deleteProduct = async (idProduct) => {
  const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/products/${idProduct}.json?`;
  await axiosApiInstanceAuth.delete(url);
};
