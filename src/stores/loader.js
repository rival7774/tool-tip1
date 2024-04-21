import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoader = defineStore('loader', () => {
  const isShowLoader = ref(false);
  const toggleShowLoader = () => {
    console.log(isShowLoader.value);
    isShowLoader.value = !isShowLoader.value;
    console.log(isShowLoader.value);
  };
  return {
    toggleShowLoader,
    isShowLoader
  };
});
