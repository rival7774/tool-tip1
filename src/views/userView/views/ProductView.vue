<script setup>
import { useRoute } from 'vue-router';
import { getProductRequest } from '@/api/getProductRequest';
import { ref } from 'vue';
import { useLoader } from '@/stores/loader';
import MySubstrate from '@/components/MySubstrate.vue';
import FormProduct from '@/components/FormProduct.vue';
import MyLink from '@/components/ui/MyLink.vue';

const loaderStore = useLoader();
const route = useRoute();
const productId = route.params.id;

const product = ref();
const name = ref();

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
  <MySubstrate>
    <FormProduct v-model="name">
      <MyLink tag="button" type="submit" class="submit">Создать</MyLink>
      <MyLink tag="button" type="reset" class="submit">Сбросить</MyLink>
    </FormProduct>
    <p>{{ name }}</p>
  </MySubstrate>
</template>

<style scoped>

</style>
