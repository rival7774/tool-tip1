import { axiosApiInstanceAuth } from '@/api/interceptors';

export const createUserInDatabase = async (localId, payload) => {
  const urlUser = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}.json`;
  const payloadUser = {};

  for (const key in payload) {
    if (key !== 'password') {
      payloadUser[key] = payload[key];
    }
  }

  await axiosApiInstanceAuth.put(urlUser, payloadUser);
};
