<script setup>
import FormLogin from '@/components/FormLogin.vue';
import MyPopup from '@/components/MyPopup.vue';
import MyLoader from '@/components/MyLoader.vue';
</script>

<template>
  <MyPopup class="popup">
    <FormLogin/>
  </MyPopup>
  <MyLoader/>
</template>

<style scoped>

.popup {
  max-width: 600px;
  width: 100%;
}
</style>
