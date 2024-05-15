<script setup>
import MyFieldset from '@/components/MyFieldset.vue';
import MyInput from '@/components/ui/MyInput.vue';
import { ref, watch } from 'vue';

const { modelValue } = defineProps({
  modelValue: String
});

// const name = defineModel();

const emits = defineEmits(['update:modelValue']);
const name = ref(modelValue);
watch(name, () => {
  emits('update:modelValue', name.value);
});
</script>

<template>
  <form novalidate>
    <MyFieldset class="fieldset" legend-value="Создание продукта">
<!--      <MyInput-->
<!--          v-model="name"-->
<!--          name="name"-->
<!--          label-value="Название продукта"-->
<!--          required-->
<!--      />-->
<!--      <MyInput-->
<!--          v-model="product.price"-->
<!--          name="price"-->
<!--          type="number"-->
<!--          label-value="Цена продукта"-->
<!--          required-->
<!--      />-->
<!--      <MyInput-->
<!--          v-model="product.currency"-->
<!--          name="currency"-->
<!--          label-value="Валюта"-->
<!--          required-->
<!--      />-->
<!--      <MyInput-->
<!--          v-model="product.description"-->
<!--          name="description"-->
<!--          type="textarea"-->
<!--          label-value="Описание продукта"-->
<!--      />-->
<!--      <MyInputFile-->
<!--          :name="NAME_FILE"-->
<!--          id="file-product"-->
<!--          accept="image/png, image/jpeg"-->
<!--          label-value="Добавить фото"-->
<!--          @change="onChangeInputFife"-->
<!--      >-->
<!--        <div class="wrap-img"><img :src="srcPhoto" alt=""></div>-->
<!--      </MyInputFile>-->
    </MyFieldset>

    <!--    <MyError :error-request="errorRequest" :errors-validation="errorsValidation"/>-->

    <slot></slot>
  </form>
</template>

<style scoped>

</style>
