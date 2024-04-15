<script setup>
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/posts">Products</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/contacts">Contacts</router-link>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 13px;
}

a {
  color: var(--color-link);
  position: relative;
  transition: color ease var(--transition-time-hover-link);
}

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

a:hover:before {
  width: 100%;
}

.router-link-active {
  color: var(--color-hover-link);
}

.router-link-active:before {
  width: 100%;
}
</style>
