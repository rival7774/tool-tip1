import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getProductsRequest } from '@/api/getProductsRequest';

export const useProductsStore = defineStore('products', () => {
  const products = ref({});

  const getProducts = async () => {
    try {
      products.value = await getProductsRequest();
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
