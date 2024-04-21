<script setup>
defineProps({
  link: String,
  tag: {
    type: String,
    default: 'a',
    validator: val => {
      if (val === 'a' || val === 'button') {
        return true;
      }
      throw new Error(`Используй строку "a" или "Button" для пропса "tag" в компоненте < MyLink />`);
    }
  }
});
</script>

<template>
  <component :is="tag" :href="link">
    <slot></slot>
  </component>
</template>

<style scoped>
button,
a {
  font-family: var(--font-family);
  color: var(--color-link);
  position: relative;
  transition: color ease var(--transition-time-hover-link);
  cursor: pointer;
  background: inherit;
  font-size: inherit;
}

button:before,
a:before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 1px;
  background: var(--color-link);
  transform: translateX(-50%);
  transition: width ease var(--transition-time-hover-link);
}

button:hover:before,
a:hover:before {
  width: 100%;
}
</style>
