<script setup>
</script>

<template>
  <button><span></span></button>
</template>

<style scoped>
button {
  background: transparent;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-time-hover-link);
}

button:active {
  transform: scale(0.8);
}

span {
  width: 16px;
  height: 16px;
  display: block;
  position: relative;
  transition: all var(--transition-time-hover-link);
}

span:after,
span:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 3px;
  height: 150%;
  background: var(--color-link);
  border-radius: var(--border-radius);
}

span:before {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>
