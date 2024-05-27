import { getRelationUserProductsRequest } from '@/api/getRelationUserProductsRequest';
import { axiosApiInstanceAuth } from '@/api/interceptors';

export const deleteRelationUserProductsRequest = async (idUser, idProduct) => {
  const resUserProducts = await getRelationUserProductsRequest(idUser);
  const arrProductsIds = resUserProducts.idsProducts.filter((id) => id !== idProduct);
  const urlPut = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/user-products/${idUser}.json`;

  return await axiosApiInstanceAuth.put(urlPut, { idsProducts: arrProductsIds });
};
