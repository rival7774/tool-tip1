import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoader = defineStore('loader', () => {
  const isShowLoader = ref(false);
  const toggleShowLoader = () => {
    isShowLoader.value = !isShowLoader.value;
  };
  return {
    toggleShowLoader,
    isShowLoader
  };
});
