<script setup>
import { inject, ref, watch, onMounted } from 'vue';
import MyProduct from '@/components/MyProduct.vue';
import FormFilter from '@/components/MyFilter.vue';
import { request, urlProducts } from '@/request/request.js';
import { useLoader } from '@/stores/loader.js';

const loaderStore = useLoader();
const products = ref([]);
const productDelete = ref();

watch(productDelete, () => {
  products.value = products.value.filter((item) => {
    return productDelete.value !== item.id;
  });
});

const getProducts = async () => {
  loaderStore.toggleShowLoader();
  products.value = await request({ url: urlProducts });
  loaderStore.toggleShowLoader();
};

onMounted(getProducts);
</script>


<template>
  <div>
    <FormFilter class="form-filter"/>

    <TransitionGroup v-if="products.length"
                     tag="ul"
                     name="fade1"
                     class="fade1"
                     appear
    >
      <MyProduct v-for="(product, index) in products"
                 :key="product.id"
                 :data-index="index"
                 :product="product"
                 @delete="(id) => {productDelete = id;}"
      />
    </TransitionGroup>

    <p v-else>Посты пока не найдены</p>
  </div>
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
  position: absolute;
}

.form-filter {
  margin-bottom: 30px;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

p {
  font-style: italic;
}
</style>
