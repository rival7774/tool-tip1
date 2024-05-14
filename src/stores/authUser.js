import { defineStore } from 'pinia';
import { axiosApiInstanceAuth } from '@/api/interceptors.js';
import { ref } from 'vue';
import axios from 'axios';

const apiKey = process.env.VUE_APP_KEY_FIREBASE;

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    refreshToken: '',
    localId: ''
  });

  const error = ref('');

  const auth = async (payload, type) => {
    const typeAuth = type.toLowerCase() === 'signup' ? 'signUp' : 'signInWithPassword';
    const urlAuth = `https://identitytoolkit.googleapis.com/v1/accounts:${typeAuth}?key=${apiKey}`;

    try {
      const res = await axiosApiInstanceAuth.post(urlAuth, {
        ...payload,
        returnSecureToken: true
      });

      updateUser({
        refreshToken: res.data.refreshToken,
        token: res.data.idToken,
        localId: res.data.localId
      });

      if (type.toLowerCase() === 'signup') {
        const urlUser =
          `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/users/${res.data.localId}.json`;
        const payloadUser = {};

        for (const payloadKey in payload) {
          if (payloadKey !== 'password') {
            payloadUser[payloadKey] = payload[payloadKey];
          }
        }

        await axiosApiInstanceAuth.put(urlUser, payloadUser);
      }
    } catch (e) {
      let typeError;
      const arrayErrors = ['EMAIL_EXISTS', 'OPERATION_NOT_ALLOWED', 'TOO_MANY_ATTEMPTS_TRY_LATER', 'INVALID_LOGIN_CREDENTIALS', 'USER_DISABLED'];

      if (e.response) {
        arrayErrors.forEach(error => {
          if (e.response.data.error.message.includes(error)) {
            typeError = error;
          }
        });
      }

      switch (typeError) {
        case 'EMAIL_EXISTS':
          error.value = 'Адрес электронной почты уже используется другой учетной записью.';
          break;

        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Для этого проекта вход с паролем отключен.';
          break;

        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          error.value = 'Мы заблокировали все запросы с этого устройства из-за необычной активности. Попробуйте позже.';
          break;

        case 'INVALID_LOGIN_CREDENTIALS':
          error.value = 'Неверный логин или пароль';
          break;

        case 'USER_DISABLED':
          error.value = 'Учетная запись пользователя отключена администратором.';
          break;

        default:
          error.value = e;
          break;
      }
      throw error.value;
    }
  };

  const updateUser = ({
    refreshToken,
    token,
    localId
  }) => {
    const user = localStorage.user ? JSON.parse(localStorage.user) : {};

    user.refreshToken = refreshToken || user.refreshToken;
    user.token = token || user.token;
    user.localId = localId || user.localId;
    localStorage.user = JSON.stringify(user);

    userInfo.value.refreshToken = refreshToken || userInfo.value.refreshToken;
    userInfo.value.token = token || userInfo.value.token;
    userInfo.value.localId = localId || userInfo.value.localId;
  };

  const clearUser = () => {
    userInfo.value = {};
    localStorage.removeItem('user');
  };

  return {
    auth,
    userInfo,
    error,
    updateUser,
    clearUser
  };
});
