<script setup>
import ImgBackground from '@/components/ImgBackground.vue';
import { useAuthStore } from '@/stores/authUser';

const authStore = useAuthStore();
const checkUser = () => {
  if (localStorage.user) {
    const user = JSON.parse(localStorage.user);

    if (user.token && user.refreshToken) {
      authStore.updateUser({
        refreshToken: user.refreshToken,
        token: user.token,
        localId: user.localId
      });
    }
  }
};
checkUser();
</script>

<template>
  <router-view/>
  <ImgBackground/>
</template>

<style scoped>

</style>
