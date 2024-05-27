import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserData } from '@/api/getUserData';
import { useAuthStore } from '@/stores/authUser';

export const useAboutStore = defineStore('user', () => {
  const userData = ref({
    email: '',
    name: ''
  });

  const getUser = async () => {
    try {
      const authStore = useAuthStore();
      const resUser = await getUserData(authStore.userInfo.localId);

      userData.value.name = resUser.name;
      userData.value.email = resUser.email;
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
