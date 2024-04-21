<script setup>
import MyLink from '@/components/ui/MyLink.vue';

const links = [
  {
    to: '/index',
    text: 'Home'
  },
  {
    to: '/products',
    text: 'Products'
  },
  {
    to: '/about',
    text: 'About'
  },
  {
    to: '/contacts',
    text: 'Contacts'
  }
];
</script>

<template>
  <nav>
    <router-link v-for="link in links" :key="link" :to="link.to"
                 v-slot="{ navigate, isActive, isExactActive }"
    >
      <MyLink :tag="'button'"
              :active="isActive"
              :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
              @click="navigate"
      >
        {{ link.text }}
      </MyLink>
    </router-link>
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

.router-link-active {
  color: var(--color-hover-link);
}

.router-link-active:before {
  width: 100%;
}
</style>
