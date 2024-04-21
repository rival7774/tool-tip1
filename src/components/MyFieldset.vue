<script setup>
defineProps({
  legendValue: String
});
</script>

<template>
  <fieldset>
    <legend>{{ legendValue }}</legend>
    <slot></slot>
  </fieldset>
</template>

<style scoped>
fieldset {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  align-items: center;
}

legend {
  margin-bottom: 20px;
  font-size: 20px;
  font-style: italic;
  color: var(--color-info-title);
  text-align: center;
  width: 100%;
}
</style>
