import { defineStore } from 'pinia';
import { ref } from 'vue';
import { axiosApiInstanceAuth } from '@/api/interceptors';

export const useProductsStore = defineStore('products', () => {
  const products = ref({});

  const getProducts = async () => {
    const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/products.json`;

    try {
      const res = await axiosApiInstanceAuth.get(url);
      products.value = res.data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const cleanProducts = () => {
    products.value = {};
  };

  return {
    products,
    getProducts,
    cleanProducts
  };
});
