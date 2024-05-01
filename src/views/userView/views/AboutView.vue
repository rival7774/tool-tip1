<script setup>
import { useAuthStore } from '@/stores/authUser';

const authStore = useAuthStore();


</script>

<template>
  <button @click="authStore.updateToken">обновить токен</button>
</template>

<style scoped>

</style>
