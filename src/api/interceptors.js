import axios from 'axios';
import { useAuthStore } from '@/stores/authUser';
import { useRouter } from 'vue-router';

const axiosApiInstanceAuth = axios.create();
const apiKey = process.env.VUE_APP_KEY_FIREBASE;

axiosApiInstanceAuth.interceptors.request.use((config) => {
  const url = config.url;

  if (!url.includes('signUp') && !url.includes('signInWithPassword')) {
    const authStore = useAuthStore();
    let params = new URLSearchParams();
    params.append('auth', authStore.userInfo.token);
    config.params = params;
  }
  return config;
});

axiosApiInstanceAuth.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const urlToken = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;
  const router = useRouter();
  const authStore = useAuthStore();
  const originalRequest = error.config;

  if (error?.response.status === 401 && !originalRequest._retry) {
    const user = JSON.parse(localStorage.user);
    originalRequest._retry = true;

    try {
      const res = await axiosApiInstanceAuth.post(urlToken, `grant_type=refresh_token&refresh_token=${user.refreshToken}`);

      authStore.updateUser({
        refreshToken: res.data.refresh_token,
        token: res.data.access_token,
        localId: res.data.user_id
      });

      return axiosApiInstanceAuth.request(originalRequest);
    } catch (e) {
      authStore.clearUser();
      router.push('/');
    }
  } else {
    throw error;
  }
});

export { axiosApiInstanceAuth };
