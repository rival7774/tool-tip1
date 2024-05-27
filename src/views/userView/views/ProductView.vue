<script setup>
import { useRoute } from 'vue-router';
import { getProductRequest } from '@/api/getProductRequest';
import { onMounted, reactive, ref } from 'vue';
import { useLoader } from '@/stores/loader';
import MySubstrate from '@/components/MySubstrate.vue';
import FormProduct from '@/components/FormProduct.vue';
import MyLink from '@/components/ui/MyLink.vue';
import { uploadImageToStorage } from '@/api/uploadImageToStorage';
import { productChangeRequest } from '@/api/productChangeRequest';
import { deleteImageToStorageRequest } from '@/api/deleteImageToStorageRequest';
import { useValidation } from '@/stores/validation';
import MyPopup from '@/components/MyPopup.vue';
import MyCross from '@/components/ui/MyCross.vue';

const loaderStore = useLoader();
const validation = useValidation();
const route = useRoute();
const showPopup = ref(false);

const productData = reactive({
  name: '',
  price: '',
  currency: '',
  description: '',
  timeOfCreation: '',
  img: {
    url: '',
    name: ''
  },
  idProduct: route.params.id,
  file: ''
});

const srcPhoto = ref('');

const errorsValidation = ref([]);

const onResetForm = () => {
  productData.img.url = '';
  productData.file = '';
  productData.name = '';
  productData.price = '';
  productData.currency = '';
  productData.description = '';
  srcPhoto.value = '';
};

const closePopup = (event) => {
  if (event.currentTarget.classList.contains('wrap-popup')) {
    if (event.target.classList.contains('wrap-popup')) showPopup.value = false;
  } else {
    showPopup.value = false;
  }
};

const openPopup = () => {
  showPopup.value = true;
};

const onChangeInputFife = ({
  file,
  src
}) => {
  srcPhoto.value = src;
  productData.file = file;
};

const sendingPhoto = async (productData) => {
  const dataImg = {
    img: {
      name: productData.img.name,
      url: productData.img.url
    }
  };

  if (productData.file && !productData.img.name) {

    const nameImg = `${productData.idProduct}${productData.file.name}`;
    const urlImg = await uploadImageToStorage(nameImg, productData.file);

    dataImg.img.name = nameImg;
    dataImg.img.url = urlImg;

  } else if (productData.file && productData.img.name) {
    await uploadImageToStorage(productData.img.name, productData.file);

  } else if (!productData.file && productData.img.name && !productData.img.url) {
    await deleteImageToStorageRequest(productData.img.name);
    dataImg.img.name = '';
  }

  return dataImg;
};

const onSubmit = async (e) => {
  const form = e.target;
  errorsValidation.value = validation.validate(form);

  if (errorsValidation.value.length) return;

  try {
    loaderStore.toggleShowLoader();

    productData.timeLastModified = new Date();

    const dataImg = await sendingPhoto(productData);
    Object.assign(productData, dataImg);

    await productChangeRequest(productData.idProduct, productData);

    openPopup();
  } catch (e) {
    console.log(e);
  } finally {
    loaderStore.toggleShowLoader();
  }
};

const init = async () => {
  try {
    loaderStore.toggleShowLoader();

    const product = await getProductRequest(productData.idProduct);

    Object.assign(productData, product);
    srcPhoto.value = product.img?.url;
  } catch (e) {
    console.log(e);
  } finally {
    loaderStore.toggleShowLoader();
  }
};
onMounted(() => {
  init();
});
</script>

<template>
  <MySubstrate class="wrap-form">
    <FormProduct
        @submit.prevent="onSubmit"
        @reset="onResetForm"
        @change-input-file="onChangeInputFife"
        title="Редактирование продукта"
        v-model:name="productData.name"
        v-model:price="productData.price"
        v-model:currency="productData.currency"
        v-model:description="productData.description"
        :src-photo="srcPhoto"
        :errorsValidation="errorsValidation"
    >
      <MyLink tag="button" type="reset" class="submit">Сбросить</MyLink>
      <MyLink tag="button" type="submit" class="submit">Сохранить изменения</MyLink>
    </FormProduct>

    <MyPopup @click="closePopup" v-if="showPopup" class-inner-popup="inner-popup" class="popup">
      <p>Данные продукта<br> успешно изменены</p>
      <MyCross @click="closePopup" class="cross"/>
    </MyPopup>
  </MySubstrate>
</template>

<style>
.wrap-form .inner-popup {
  width: auto;
}
</style>

<style scoped>
.wrap-form {
  position: relative;
}

.popup {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 210px;
  padding-right: 20px;
}

.popup p {
  padding: 5px;
}

.cross {
  position: absolute;
  top: 10px;
  right: 10px;
}

.submit {
  margin: 15px auto 0;
  display: block;
  width: fit-content;
}
</style>
