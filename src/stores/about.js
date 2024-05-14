import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserData } from '@/api/getUserData';

export const useAboutStore = defineStore('user', () => {
  const userData = ref({
    email: '',
    name: ''
  });

  const getUser = async () => {
    try {
      const resUser = await getUserData();

      userData.value.name = resUser.data.name;
      userData.value.email = resUser.data.email;
    } catch (e) {
      throw new Error(e);
    }
  };

  const clearDataUser = () => {
    userData.value = {};
  };

  return {
    getUser,
    userData,
    clearDataUser
  };
});
