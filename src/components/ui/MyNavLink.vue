<script setup>
import MyLink from '@/components/ui/MyLink.vue';

defineProps({
  dataLink: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <router-link
      :to="dataLink.to"
      v-slot="{ navigate, isActive, isExactActive }"
  >
    <MyLink :tag="'button'"
            :active="isActive"
            :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
            @click="navigate"
    >
      {{ dataLink.text }}
    </MyLink>
  </router-link>
</template>

<style scoped>
.router-link-active {
  color: var(--color-hover-link);
  pointer-events: none;
}

.router-link-active:before {
  width: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  width: 0;
}
</style>
