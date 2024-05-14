import { useAuthStore } from '@/stores/authUser';
import { axiosApiInstanceAuth } from '@/api/interceptors';

export const getUserData = async () => {
  const authStore = useAuthStore();
  const url = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/users/${authStore.userInfo.localId}.json`;

  return await axiosApiInstanceAuth.get(url);
};
