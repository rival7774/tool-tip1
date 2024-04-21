<script setup>
import ImgBackground from '@/components/ImgBackground.vue';
import { useRouter } from 'vue-router';
import { provide } from 'vue';

const router = useRouter();
router.push({ name: 'login' });
</script>

<template>
  <router-view/>
  <ImgBackground/>
</template>

<style scoped>

</style>
