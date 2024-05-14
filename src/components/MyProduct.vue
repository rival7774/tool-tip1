<script setup>
import MySubstrate from '@/components/MySubstrate.vue';
import MyLink from '@/components/ui/MyLink.vue';
import { formatDate } from '@/helpers/formatDate';
import { ref } from 'vue';
import { deleteProduct } from '@/api/deleteProduct';
import { useProductsStore } from '@/stores/allProducts';
import { useLoader } from '@/stores/loader';
import { useRouter } from 'vue-router';
import { deleteImageToStorageRequest } from '@/api/deleteImageToStorageRequest';
import { getRelationUserProductsRequest } from '@/api/getRelationUserProductsRequest';
import { axiosApiInstanceAuth } from '@/api/interceptors';
import { useAuthStore } from '@/stores/authUser';

const { product } = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const loaderStore = useLoader();
const productsStore = useProductsStore();
const authStore = useAuthStore();

const showControls = ref(false);
const date = formatDate(product.timeOfCreation);
const descriptions = product.description.split('\n');

const isShowControls = async () => {
  const userId = authStore.userInfo.localId;
  const relationUserProducts = await getRelationUserProductsRequest(userId);
  const userProductsIds = relationUserProducts.data.idsProducts;

  showControls.value = userProductsIds.indexOf(product.idProduct) !== -1;
};
isShowControls();

const deleteRelationUserProductsRequest = async (idUser, idProduct) => {
  const resUserProducts = await getRelationUserProductsRequest(idUser);
  const arrProductsIds = resUserProducts.data.idsProducts.filter((id) => id !== idProduct);
  const urlPut = `https://vue-crm-8cbad-default-rtdb.europe-west1.firebasedatabase.app/user-products/${idUser}.json`;

  return await axiosApiInstanceAuth.put(urlPut, { idsProducts: arrProductsIds });
};

const onClickBtnDelete = async () => {
  try {
    loaderStore.toggleShowLoader();

    await deleteProduct(product.idProduct);
    await deleteRelationUserProductsRequest(authStore.userInfo.localId, product.idProduct);
    await productsStore.getProducts();
    if (product.img.name) {
      await deleteImageToStorageRequest(product.img.name);
    }
  } catch (e) {
    console.log(e);
  } finally {
    loaderStore.toggleShowLoader();
  }
};

const onClickBtnEdit = async () => {
  router.push({
    name: 'product',
    params: { id: product.idProduct }
  });
};
</script>

<template>
  <div>
    <MySubstrate>
      <div class="wrap-product">
        <div class="author">
          <p class="author__title title">Данные автора продукта</p>
          <div class="author__info">
            <p><span class="title">Имя:</span> {{ product.userName }}</p>
            <p><span class="title">Почта:</span> {{ product.userEmail }}</p>
          </div>
        </div>

        <div class="wrap-info">
          <img v-if="product?.img && product?.img.url" :src="product.img.url" width="110" height="110"
               alt="Картинка товара">
          <p class="substitutionForPicture" v-else>Фото отсутствует</p>

          <div class="info">
            <p class="info__name"><span class="title">Название продукта:</span> {{ product.name }}</p>
            <p class="info__description">
              <span class="title">Описание:<br></span>
              <span
                  v-for="description of descriptions" :key="description">{{ description }}<br></span>
            </p>
            <p class="info__price"><span class="title">Цена:</span> {{ product.price }} {{ product.currency }}</p>
            <p class="info__code">{{ product.code }}</p>
          </div>
        </div>

        <div class="footer">
          <div class="wrap-date">
            <p class="title">Дата создания</p>
            <span>{{ date.date }}.{{ date.month }}.{{ date.year }}</span>
            <span>{{ date.hour }}:{{ date.minute }}:{{ date.second }}</span>
          </div>

          <div v-if="showControls" class="controls">
            <MyLink @click="onClickBtnDelete" tag="button">Удалить</MyLink>
            <MyLink @click="onClickBtnEdit" tag="button">Редактировать</MyLink>
          </div>
        </div>
      </div>
    </MySubstrate>
  </div>
</template>

<style scoped>
.title {
  color: var(--color-info-title);
}

.wrap-product {
  text-align: start;
}

.author {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 20px;
}

.author__title {
  width: 100%;
}

.author__info {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.wrap-info {
  display: flex;
}

img {
  width: 110px;
  height: 110px;
  object-fit: contain;
  border: 2px solid var(--color-info-title);
  border-radius: var(--border-radius);
}

.info {
  margin-left: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: start;
}

.substitutionForPicture {
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--color-info-title);
  border-radius: var(--border-radius);
  text-align: center;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.wrap-date {
  display: flex;
  flex-direction: column;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: end;
  align-items: end;
}
</style>
