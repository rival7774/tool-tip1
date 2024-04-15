<script setup>
import { computed, inject, ref, watch } from 'vue';
import MyProduct from '@/components/MyProduct.vue';
import FormFilter from '@/components/MyFilter.vue';
import { request, urlProducts } from '@/request/request.js';

const {
  updateShowLoader
} = inject('showLoader');

const products = ref([]);

const productDelete = ref();
const deleteProduct = computed(() => {
  return products.value = products.value.filter((item) => {
    return productDelete.value !== item.id;
  });
});

const getProducts = async () => {
  updateShowLoader(true);
  products.value = await request({ url: urlProducts });
  updateShowLoader(false);
};

getProducts();
</script>

<template>
  <div>
    <FormFilter class="form-filter"/>

    <ul v-if="products.length">
      <MyProduct v-for="product in products"
                 :key="product.id"
                 :product="product"
                 @delete="(id) => {productDelete = id;console.log(deleteProduct);deleteProduct}"
      />
    </ul>
    <p v-else>Посты пока не найдены</p>
  </div>
</template>

<style scoped>
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
