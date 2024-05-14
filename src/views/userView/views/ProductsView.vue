<script setup>
import FormFilter from '@/components/MyFilter.vue';
import MySubstrate from '@/components/MySubstrate.vue';
import MyNavLink from '@/components/ui/MyNavLink.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

if (route.name === 'products') {
  router.push({ name: 'all-products' });
}
</script>

<template>
  <div>
    <FormFilter class="form-filter"/>

    <MySubstrate class="wrap-control">
      <div class="control">
        <MyNavLink :data-link="{to: '/home/products/all-products', text: 'Все товары'}"/>
        <MyNavLink :data-link="{to: '/home/products/add-products', text: 'Добавить товар'}"/>
      </div>
    </MySubstrate>

    <router-view/>
  </div>
</template>

<style scoped>
.wrap-control {
  margin-bottom: 10px;
}

.control {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
