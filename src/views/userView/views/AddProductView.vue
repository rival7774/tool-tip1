<script setup>
import MyFieldset from '@/components/MyFieldset.vue';
import MySubstrate from '@/components/MySubstrate.vue';
import MyInput from '@/components/ui/MyInput.vue';
import MyInputFile from '@/components/ui/MyInputFile.vue';
import MyLink from '@/components/ui/MyLink.vue';
import MyError from '@/components/MyError.vue';
import { useLoader } from '@/stores/loader';
import { reactive, ref } from 'vue';
import { useValidation } from '@/stores/validation';
import { useAuthStore } from '@/stores/authUser';
import { uploadImageToStorage } from '@/api/uploadImageToStorage';
import { getProductRequest } from '@/api/getProductRequest';
import { productChangeRequest } from '@/api/productChangeRequest';
import { addRelationUserProductsRequest } from '@/api/addRelationUserProductsRequest';
import { addProductRequest } from '@/api/addProductRequest';

const product = reactive({
  name: '',
  price: '',
  currency: '',
  description: '',
  file: '',
  img: {
    url: '',
    name: ''
  },
});
const srcPhoto = ref('');

const authStore = useAuthStore();
const loaderStore = useLoader();
const validation = useValidation();

const errorsValidation = ref([]);
const errorRequest = ref('');

const onChangeInputFife = ({
  file,
  src
}) => {
  product.file = file;
  srcPhoto.value = src;
};

const onResetForm = () => {
  srcPhoto.value = '';
};

const onSubmit = async (e) => {
  const form = e.target;
  errorsValidation.value = validation.validate(form);

  if (errorsValidation.value.length) return;

  try {
    loaderStore.toggleShowLoader();

    product.timeOfCreation = new Date();

    const resIdProduct = await addProductRequest(product);
    const idProduct = resIdProduct.data.name;
    const productData = await getProductRequest(idProduct);

    productData.idProduct = idProduct;
    if (product.file) {
      const nameImg = `${idProduct}${product.file.name}`;
      const urlImg = await uploadImageToStorage(nameImg, product.file);

      productData.img.name = nameImg;
      productData.img.url = urlImg;
    }

    await productChangeRequest(idProduct, productData);
    await addRelationUserProductsRequest(authStore.userInfo.localId, idProduct);

    form.reset();
  } catch (e) {
    errorRequest.value = e;
  } finally {
    loaderStore.toggleShowLoader();
  }
};
</script>

<template>
  <MySubstrate>
    <form @submit.prevent="onSubmit" @reset="onResetForm" novalidate>
      <MyFieldset class="fieldset" legend-value="Создание продукта">
        <MyInput
            v-model="product.name"
            name="name"
            label-value="Название продукта"
            required
        />
        <MyInput
            v-model.num="product.price"
            name="price"
            type="number"
            label-value="Цена продукта"
            required
        />
        <MyInput
            v-model="product.currency"
            name="currency"
            label-value="Валюта"
            required
        />
        <MyInput
            v-model="product.description"
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

      <MyError :error-request="errorRequest" :errors-validation="errorsValidation"/>

      <MyLink tag="button" type="submit" class="submit">Создать</MyLink>
      <MyLink tag="button" type="reset" class="submit">Сбросить</MyLink>
    </form>
  </MySubstrate>
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

.submit {
  margin: 20px auto 0;
  display: block;
  width: fit-content;
}
</style>
