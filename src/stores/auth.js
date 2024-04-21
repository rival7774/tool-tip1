import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

// const apiKey = import.meta.env.API_KEY_FIREBASE;

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  });

  const error = ref('');

  const auth = async (payload, type) => {
    const typeAuth = type === 'signup' ? 'signUp' : 'signInWithPassword';
    const urlAuth = `https://identitytoolkit.googleapis.com/v1/accounts:${typeAuth}?key=${'AIzaSyBj9cqLemyWkvZJqtrMiydHlnsNx3Pjx7w'}`;

    try {
      const res = await axios.post(urlAuth, {
        ...payload,
        returnSecureToken: true
      });
      console.log(res.data);
      userInfo.value = {
        token: res.data.token,
        email: res.data.email,
        userId: res.data.userId,
        refreshToken: res.data.refreshToken,
        expiresIn: res.data.expiresIn
      };
    } catch (e) {
      let typeError;
      const arrayErrors = ['EMAIL_EXISTS', 'OPERATION_NOT_ALLOWED', 'TOO_MANY_ATTEMPTS_TRY_LATER', 'INVALID_LOGIN_CREDENTIALS', 'USER_DISABLED'];

      arrayErrors.forEach(error => {
        if (e.response.data.error.message.includes(error)) {
          typeError = error;
        }
      });

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
          error.value = e.response.data.error.message;
          break;
      }
      throw error.value;
    }
  };

  return {
    auth,
    userInfo,
    error
  };
});
