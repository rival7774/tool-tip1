import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getProductsRequest } from '@/api/getProductsRequest';
import { getRelationUserProductsRequest } from '@/api/getRelationUserProductsRequest';
import { getRelationAllUsersProductsRequest } from '@/api/getRelationAllUsersProductsRequest';
import { useAuthStore } from '@/stores/authUser';
import { getUserData } from '@/api/getUserData';

export const useProductsStore = defineStore('products', () => {
  const products = ref({});

  const getProducts = async () => {
    try {
      const authStore = useAuthStore();
      const userId = authStore.userInfo.localId;

      products.value = await getProductsRequest();
      const idsProducts = Object.keys(products.value);

      const allRelationUsersProducts = await getRelationAllUsersProductsRequest();
      const relationUserProducts = await getRelationUserProductsRequest(userId);

      const idsUsers = Object.keys(allRelationUsersProducts);
      const usersData = await Promise.all(idsUsers.map((userId) => getUserData(userId)));

      usersData.forEach((userData, i) => {
        idsProducts.forEach((idProduct) => {
          if (allRelationUsersProducts[idsUsers[i]].idsProducts.includes(idProduct)) {
            products.value[idProduct].userName = userData.name;
            products.value[idProduct].userEmail = userData.email;
          }

        });
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  const cleanProducts = () => {
    products.value = {};
  };

  const deleteProduct = (idProduct) => {
    for (const keyIdProduct in products.value) {
      if (keyIdProduct === idProduct) {
        delete products.value[keyIdProduct];
      }
    }
  };

  return {
    products,
    deleteProduct,
    getProducts,
    cleanProducts
  };
});
