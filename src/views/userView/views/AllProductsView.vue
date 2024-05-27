<script setup>
import MyProduct from '@/components/MyProduct.vue';
import MySubstrate from '@/components/MySubstrate.vue';
import { useProductsStore } from '@/stores/allProducts';
import { onBeforeMount } from 'vue';
import { useLoader } from '@/stores/loader';

const productsStore = useProductsStore();
const loaderStore = useLoader();

const initialization = async () => {
  try {
    loaderStore.toggleShowLoader();
    await productsStore.getProducts();
  } catch (e) {
    console.log(e);
  } finally {
    loaderStore.toggleShowLoader();
  }
};
initialization();

onBeforeMount(() => {
  productsStore.cleanProducts();
});
</script>

<template>
  <TransitionGroup
      v-if="productsStore.products && Object.keys(productsStore.products).length"
      tag="ul"
      name="fade1"
      class="fade1"
      appear
  >
    <MyProduct v-for="product in productsStore.products" :product="product" :key="product"/>
  </TransitionGroup>


  <MySubstrate v-else class="no-product">
    <p>Товары не найдены</p>
  </MySubstrate>
</template>

<style scoped>
.fade1-move,
.fade1-enter-active,
.fade1-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade1-enter-from,
.fade1-leave-to {
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade1-leave-active {
  position: fixed;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.no-product {
  margin: 0 auto;
  color: var(--color-info-title);
  font-style: italic;
}
</style>
