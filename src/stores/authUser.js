import { defineStore } from 'pinia';
import { axiosApiInstanceAuth } from '@/api.js';
import { ref } from 'vue';

const apiKey = process.env.VUE_APP_KEY_FIREBASE;

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    refreshToken: '',
    expiresIn: ''
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
        expiresIn: res.data.expiresIn
      });

      if (type.toLowerCase() === 'signup') {
        const urlSetUser =
          `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/custom_users/${res.data.localId}.json?`;
        const payloadUser = {};

        for (const payloadKey in payload) {
          if (payloadKey !== 'password') {
            payloadUser[payloadKey] = payload[payloadKey];
          }
        }

        const resSetUser = await axiosApiInstanceAuth.put(urlSetUser, { ...payloadUser });

        userInfo.value.name = resSetUser.data;
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

  const updateToken = async () => {
    const url = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;
    const user = JSON.parse(localStorage.user);

    try {
      const res = await axiosApiInstanceAuth.post(url, `grant_type=refresh_token&refresh_token=a${user.refreshToken}`);

      updateUser({
        refreshToken: res.data.refresh_token,
        token: res.data.access_token,
        expiresIn: res.data.expires_in
      });

    } catch (e) {
      if (e.response) {
        switch (e.response.data.error.message) {
          case 'INVALID_REFRESH_TOKEN':
            error.value = e.response.data.error.message;
            break;

          default:
            break;
        }
      }

      throw new Error(e);
    }
  };

  const updateUser = ({
    refreshToken,
    token,
    expiresIn
  }) => {
    const user = localStorage.user ? JSON.parse(localStorage.user) : {};

    user.refreshToken = refreshToken;
    user.token = token;
    user.expiresIn = expiresIn;
    localStorage.user = JSON.stringify(user);

    userInfo.value.refreshToken = refreshToken;
    userInfo.value.token = token;
    userInfo.value.expiresIn = expiresIn;
  };

  const clearUser = () => {
    for (const key in userInfo.value) {
      userInfo.value[key] = '';
    }

    localStorage.removeItem('user');
  };

  return {
    auth,
    userInfo,
    error,
    updateToken,
    updateUser,
    clearUser
  };
});
