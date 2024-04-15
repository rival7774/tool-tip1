<script setup>
import { defineProps, defineEmits, inject, ref, watch } from 'vue';
import { urlProducts, request } from '@/request/request.js';

const {
  updateShowLoader
} = inject('showLoader');

defineProps({
  product: Object
});

const isDeleteProduct = ref(true);
const emit = defineEmits('delete');

const requestDelete = async (id) => {
  updateShowLoader(true);
  try {
    const res = await request({
      url: `${urlProducts}${id}`,
      method: 'DELETE'
    });

    // isDeleteProduct.value = false;
    emit('delete', res.id);
  } catch (e) {
    console.log(e);
  } finally {
    updateShowLoader(false);
  }
};
</script>

<template>
  <Transition>
    <li v-if="isDeleteProduct">
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
        <button @click="requestDelete(product.id)" type="button">Удалить товар</button>
      </div>
    </li>
  </Transition>
</template>

<style scoped>
.v-enter-from,
.v-leave-to {
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.5s ease;
}

li {
  display: flex;
  flex-wrap: wrap;
  padding: 30px 20px 20px;
  gap: 20px;
  background-color: rgba(50, 61, 12, 0.5);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  position: relative;
  animation: ease spin 0.5s;
  transform: translateX(0px);
}

@keyframes spin {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0px);
  }
}

.title {
  width: 100%;
}

.wrap-img {
  max-width: 20%;
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

button {
  color: var(--color-link);
  background: transparent;
  cursor: pointer;
}
</style>
