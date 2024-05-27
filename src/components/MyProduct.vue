<script setup>
import MySubstrate from '@/components/MySubstrate.vue';
import MyLink from '@/components/ui/MyLink.vue';
import MyDate from '@/components/MyDate.vue';
import { ref } from 'vue';
import { deleteProduct } from '@/api/deleteProduct';
import { useProductsStore } from '@/stores/allProducts';
import { useLoader } from '@/stores/loader';
import { useAuthStore } from '@/stores/authUser';
import { useRouter } from 'vue-router';
import { deleteImageToStorageRequest } from '@/api/deleteImageToStorageRequest';
import { getRelationUserProductsRequest } from '@/api/getRelationUserProductsRequest';
import { deleteRelationUserProductsRequest } from '@/api/deleteRelationUserProductsRequest';

const props = defineProps({
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
const descriptions = props.product.description.trim()
                          .split('\n');

const isShowControls = async () => {
  const userId = authStore.userInfo.localId;
  const relationUserProducts = await getRelationUserProductsRequest(userId);

  if (relationUserProducts) {
    const userProductsIds = relationUserProducts.idsProducts;

    showControls.value = userProductsIds.indexOf(props.product.idProduct) !== -1;
  }
};
isShowControls();

const onClickBtnDelete = async () => {
  try {
    loaderStore.toggleShowLoader();

    await deleteProduct(props.product.idProduct);
    await deleteRelationUserProductsRequest(authStore.userInfo.localId, props.product.idProduct);

    await productsStore.deleteProduct(props.product.idProduct);
    if (props.product.img.name) {
      await deleteImageToStorageRequest(props.product.img.name);
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
    params: { id: props.product.idProduct }
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
            <p class="info__price"><span class="title">Цена:</span> {{ product.price }} {{ product.currency }}</p>
            <p class="info__description">
              <span class="title">Описание:</span>
              <span v-for="description of descriptions" :key="description">{{ description }}<br></span>
            </p>
            <p class="info__code">{{ product.code }}</p>
          </div>
        </div>

        <div class="footer">
          <div class="wrap-date">
            <MyDate :date="product.timeOfCreation" title="Дата создания"/>
            <MyDate v-if="product.timeLastModified" :date="product.timeLastModified" title="Дата последнего изменения"/>
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
  gap: 20px;
  flex-wrap: wrap;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: end;
  align-items: end;
}
</style>
