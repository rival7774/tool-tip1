<script setup>
import MySubstrate from '@/components/MySubstrate.vue';
import { useAboutStore } from '@/stores/about';
import { useLoader } from '@/stores/loader';

const aboutStore = useAboutStore();
const userDataStore = aboutStore.userData;
const loader = useLoader();

const getDataUser = async () => {
  try {
    loader.toggleShowLoader();
    await aboutStore.getUser();
  } catch (e) {
    console.log(e);
  } finally {
    loader.toggleShowLoader();
  }
};

getDataUser();
</script>

<template>
  <div class="about">
    <MySubstrate><p><span>Мой email:</span> {{ userDataStore.email }}</p></MySubstrate>
    <MySubstrate><p><span>Моё имя:</span> {{ userDataStore.name }}</p></MySubstrate>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: start;
}

.about span {
  color: var(--color-info-title);
}
</style>
