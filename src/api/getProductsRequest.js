import { axiosApiInstanceAuth } from '@/api/interceptors';

export const getProductsRequest = async () => {
  const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/products.json`;

  try {
    const res = await axiosApiInstanceAuth.get(url);
    return res.data;
  } catch (e) {
    throw new Error(e);
  }
};
