<script setup>
import MyFieldset from '@/components/MyFieldset.vue';
import MyInput from '@/components/ui/MyInput.vue';
import MyInputFile from '@/components/ui/MyInputFile.vue';
import MyError from '@/components/MyError.vue';

const emits = defineEmits(['changeInputFile', 'update:name']);
defineProps({
  title: String,
  errorsValidation: Array,
  srcPhoto: String
});

const name = defineModel('name');
const price = defineModel('price');
const currency = defineModel('currency');
const description = defineModel('description');

const onChangeInputFife = ({
  file,
  src
}) => {
  emits('changeInputFile', {
    file,
    src
  });
};
</script>

<template>
  <form novalidate>
    <MyFieldset class="fieldset" :legend-value="title">
      <MyInput
          v-model="name"
          name="name"
          label-value="Название продукта"
          required
      />
      <MyInput
          v-model="price"
          name="price"
          type="number"
          label-value="Цена продукта"
          required
      />
      <MyInput
          v-model="currency"
          name="currency"
          label-value="Валюта"
          required
      />
      <MyInput
          v-model="description"
          name="description"
          type="textarea"
          label-value="Описание продукта"
      />
      <MyInputFile
          name="photo"
          id="file-product"
          accept="image/png, image/jpeg"
          label-value="Добавить фото"
          @change="onChangeInputFife"
      >
        <div class="wrap-img"><img :src="srcPhoto" alt=""></div>
      </MyInputFile>
    </MyFieldset>

    <MyError :errors-validation="errorsValidation"/>

    <slot></slot>
  </form>
</template>

<style scoped>
.fieldset {
  gap: 10px;
}

.wrap-img {
  min-width: 100px;
  max-width: 45%;
  width: 100%;
}
</style>
