<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyNav from '@/components/MyNav.vue';
import MyLoader from '@/components/MyLoader.vue';
</script>

<template>
  <div class="app">
    <MyHeader class="my-header"/>
    <MyNav class="my-nav"/>

    <div class="views-wrap">
      <router-view/>
      <MyLoader/>
    </div>
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
</style>
