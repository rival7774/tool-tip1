import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createUserInDatabase } from '@/api/createUserInDatabase';
import { sendAuthRequest } from '@/api/sendAuthRequest';

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    refreshToken: '',
    localId: ''
  });

  const error = ref('');

  const auth = async (payload, type) => {
    const typeAuth = type.toLowerCase() === 'signup' ? 'signUp' : 'signInWithPassword';

    try {
      const dataAuthUser = await sendAuthRequest(payload, typeAuth);

      updateUser({
        refreshToken: dataAuthUser.refreshToken,
        token: dataAuthUser.idToken,
        localId: dataAuthUser.localId
      });

      if (type.toLowerCase() === 'signup') {
        await createUserInDatabase(dataAuthUser.localId, payload);
      }
    } catch (e) {
      handleAuthError(e);
    }
  };

  const handleAuthError = (error) => {
    const errorMapping = {
      EMAIL_EXISTS: 'Адрес электронной почты уже используется другой учетной записью.',
      OPERATION_NOT_ALLOWED: 'Для этого проекта вход с паролем отключен.',
      TOO_MANY_ATTEMPTS_TRY_LATER: 'Мы заблокировали все запросы с этого устройства из-за необычной активности. Попробуйте позже.',
      INVALID_LOGIN_CREDENTIALS: 'Неверный логин или пароль',
      USER_DISABLED: 'Учетная запись пользователя отключена администратором.'
    };

    if (error.response) {
      const errorMessage = error.response.data.error.message;
      const matchedError = Object.keys(errorMapping)
                                 .find(err => errorMessage.includes(err));
      if (matchedError) {
        throw new Error(errorMapping[matchedError]);
      }
    }
    throw error;
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
