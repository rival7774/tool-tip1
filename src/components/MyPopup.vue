<script setup>
</script>

<template>
  <div class="wrap-popup">
    <div class="my-popup">
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
  padding: 20px;
}

.my-popup {
  background: var(--color-bac-product);
  border-radius: var(--border-radius);
  padding: 20px;
  width: 100%;
}
</style>
