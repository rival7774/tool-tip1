<script setup>
import { useRoute } from 'vue-router';
import { getProductRequest } from '@/api/getProductRequest';
import { ref } from 'vue';
import { useLoader } from '@/stores/loader';

const loaderStore = useLoader();
const route = useRoute();
const productId = route.params.id;

const product = ref();

const init = async () => {
  try {
    loaderStore.toggleShowLoader();

    product.value = await getProductRequest(productId);
  } catch (e) {
    console.log(e);
  } finally {
    loaderStore.toggleShowLoader();
  }
};
init();
</script>

<template>
  <p>{{ product }}</p>
  <img v-if="product && product.img.url" :src="product.img.url" alt="">
</template>

<style scoped>

</style>
