<script setup>
import MyHeader from './components/MyHeader.vue';
import MyNav from './components/MyNav.vue';
import MyLoader from './components/MyLoader.vue';
import { ref, provide } from 'vue';

const showLoader = ref(false);
const updateShowLoader = (isShow) => {
  showLoader.value = isShow;
};
provide('showLoader', {
  showLoader,
  updateShowLoader
});
</script>

<template>
  <div class="app">
    <MyHeader class="my-header"/>
    <MyNav class="my-nav"/>

    <div class="views-wrap">
      <router-view/>
      <MyLoader :show="showLoader"/>
    </div>

    <img
        class="img-background"
        src="./assets/imgs/lampochka_lampa_edisona_nit_nakalivaniia_146432_3840x2400.jpg"
        alt="background"
    />
  </div>
</template>

<style scoped>
.app {
  position: relative;
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 10px;
}

.my-header {
  grid-column: 1/-1;
}

.my-nav {
  grid-column: 1/2;
}

.views-wrap {
  grid-column: 2/-1;
  text-align: center;
  padding-right: 20px;
  position: relative;
}

.img-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -999;
  object-fit: cover;
}
</style>
