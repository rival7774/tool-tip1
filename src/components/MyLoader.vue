<script setup>
import { useLoader } from '@/stores/loader.js';

const loaderStore = useLoader();
</script>

<template>
  <div v-if="loaderStore.isShowLoader" class="loader-wrap">
    <div class='demo'>
      <div class='circle'>
        <div class='inner'></div>
      </div>
      <div class='circle'>
        <div class='inner'></div>
      </div>
      <div class='circle'>
        <div class='inner'></div>
      </div>
      <div class='circle'>
        <div class='inner'></div>
      </div>
      <div class='circle'>
        <div class='inner'></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato);

a {
  position: fixed;
  bottom: 2%;
  display: block;
  text-align: center;
  color: #0fa;
  font-family: "Lato", sans-serif;
  text-decoration: none !important;
  width: 100%;
}

body, html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  background: linear-gradient(90deg, #00b377, #00d68f);
  box-shadow: inset 0 0 90px rgba(0, 0, 0, 0.5);
  margin: 0;
  padding: 0;
}

.loader-wrap {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
}

.demo {
  width: 100px;
  height: 102px;
  border-radius: 100%;
  position: absolute;
  top: 45%;
  left: calc(50% - 50px);
}

.circle {
  width: 100%;
  height: 100%;
  position: absolute;
}

.circle .inner {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 5px solid rgba(0, 255, 170, 0.7);
  border-right: none;
  border-top: none;
  backgroudn-clip: padding;
  box-shadow: inset 0 0 10px rgba(0, 255, 170, 0.15);
}

@-webkit-keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.circle:nth-of-type(0) {
  transform: rotate(0deg);
}

.circle:nth-of-type(0) .inner {
  -webkit-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
}

.circle:nth-of-type(1) {
  transform: rotate(70deg);
}

.circle:nth-of-type(1) .inner {
  -webkit-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
}

.circle:nth-of-type(2) {
  transform: rotate(140deg);
}

.circle:nth-of-type(2) .inner {
  -webkit-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
}

.demo {
  -webkit-animation: spin 5s infinite linear;
  animation: spin 5s infinite linear;
}
</style>
