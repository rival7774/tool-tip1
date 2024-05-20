import { axiosApiInstanceAuth } from '@/api/interceptors';

const apiKey = process.env.VUE_APP_KEY_FIREBASE;

export const sendAuthRequest = async (payload, type) => {
  const urlAuth = `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${apiKey}`;

  const res = await axiosApiInstanceAuth.post(urlAuth, {
    ...payload,
    returnSecureToken: true
  })

  return res.data;
}
