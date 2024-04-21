<script setup>
import { defineProps, defineEmits, inject } from 'vue';
import { urlProducts, request } from '@/request/request.js';
import MyLink from '@/components/ui/MyLink.vue';
import { useLoader } from '@/stores/loader';

const storeLoader = useLoader();

defineProps({
  product: Object
});

const emit = defineEmits('delete');

const requestDelete = async (id) => {
  storeLoader.toggleShowLoader();
  try {
    const res = await request({
      url: `${urlProducts}${id}`,
      method: 'DELETE'
    });

    emit('delete', res.id);
  } catch (e) {
    console.log(e);
  } finally {
    storeLoader.toggleShowLoader();
  }
};
</script>

<template>
  <li>
    <h2 class="title">{{ product.title }}</h2>

    <div :class="{'wrap-img': true}">
      <div>
        <img width="400" height="auto" :src="product.image" :alt="product.title">
      </div>
    </div>

    <div class="wrap-info">
      <p class="text"><span>Description:</span> {{ product.description }}</p>
      <p><span>Price:</span> {{ product.price }} $</p>
      <p><span>Category:</span> {{ product.category }}</p>
      <p><span>Id:</span> {{ product.id }}</p>
    </div>

    <div class="wrap-settings">
      <MyLink :tag="button" @click="requestDelete(product.id)">Удалить товар</MyLink>
    </div>
  </li>
</template>

<style scoped>
li {
  display: flex;
  flex-wrap: wrap;
  padding: 30px 20px 20px;
  gap: 20px;
  background-color: var(--color-bac-product);
  backdrop-filter: blur(5px);
  border-radius: var(--border-radius);
}


.title {
  width: 100%;
}

.wrap-img {
  max-width: fit-content;
  width: 100%;
}

.wrap-img div {
  width: fit-content;
  overflow: hidden;
  max-width: 130px;
  max-height: 130px;
}

img {
  max-width: 130px;
  max-height: 130px;
}

.wrap-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 77%;
  width: 100%;
  text-align: start;
}

.wrap-info span {
  color: var(--color-info-title);
  font-style: italic;
  font-weight: bold;
}

.wrap-settings {
  width: 100%;
  display: flex;
  justify-content: start;
}
</style>
