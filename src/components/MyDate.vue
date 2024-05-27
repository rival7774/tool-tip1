<script setup>
import { formatDate } from '@/helpers/formatDate';

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const date = formatDate(props.date);
</script>

<template>
  <div>
    <p>{{ title }}</p>
    <span>{{ date.date }}.{{ date.month }}.{{ date.year }}</span>
    <span>{{ date.hour }}:{{ date.minute }}:{{ date.second }}</span>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}

p {
  color: var(--color-info-title);
}
</style>
