<script setup>
defineProps({
  classInnerPopup: String
});
</script>

<template>
  <div @click="onClickWrapPopup" class="wrap-popup">
    <div :class="[classInnerPopup, 'my-popup']">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.wrap-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}

.my-popup {
  background: var(--color-bac-product);
  border-radius: var(--border-radius);
  padding: 20px;
  width: 100%;
  box-shadow: 1px 1px 28px 10px rgba(0, 0, 0, 0.69);
  -webkit-box-shadow: 1px 1px 28px 10px rgba(0, 0, 0, 0.69);
  -moz-box-shadow: 1px 1px 28px 10px rgba(0, 0, 0, 0.69);
  position: relative;
}
</style>
