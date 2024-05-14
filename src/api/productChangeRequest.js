import { axiosApiInstanceAuth } from '@/api/interceptors';

export const productChangeRequest = async (productId, objProduct) => {
  const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`;
  await axiosApiInstanceAuth.patch(url, objProduct);
};
