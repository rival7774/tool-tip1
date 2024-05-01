import axios from 'axios';
import { useAuthStore } from '@/stores/authUser';

const axiosApiInstanceAuth = axios.create();

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
}, (error) => {
  const originalRequest = error.config;

  if (error.response.data.error.message === 'INVALID_REFRESH_TOKEN' && !originalRequest._retry) {
    originalRequest._retry = true;
  }
  console.log(11111, error);
  return error;
});

export { axiosApiInstanceAuth };
