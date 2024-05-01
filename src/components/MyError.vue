<script setup>
defineProps({
  errorsValidation: Array,
  errorRequest: String
});
</script>

<template>
  <div v-if="errorRequest || errorsValidation.length" class="wrap-error">
    <p>{{ errorRequest }}</p>
    <p v-for="errorValidate in errorsValidation" :key="errorValidate.message">{{ errorValidate.message }}</p>
  </div>
</template>

<style scoped>
.wrap-error {
  color: var(--color-error);
}
</style>
