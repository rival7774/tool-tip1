<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getProductRequest } from '@/api/getProductRequest';
import { useLoader } from '@/stores/loader';
import MySubstrate from '@/components/MySubstrate.vue';
import FormProduct from '@/components/FormProduct.vue';
import MyLink from '@/components/ui/MyLink.vue';

const loaderStore = useLoader();
const route = useRoute();
const productId = route.params.id;

let productData = reactive({
  name: '',
  price: '',
  currency: '',
  description: '',
  file: '',
  img: {
    url: '',
    name: ''
  }
});

const errorsValidation = ref([]);
const errorRequest = ref('');

const onResetForm = () => {
  productData.img.url = '';
};

const onChangeInputFile = ({
  file,
  src
}) => {
  productData.img.url = src;
  productData.img.file = file;
};

const init = async () => {
  try {
    loaderStore.toggleShowLoader();

    const product = await getProductRequest(productId);

    productData.name = product.name;
    productData.description = product.description;
    productData.price = product.price;
    productData.currency = product.currency;
    productData.img.url = product.img.url;
    productData.img.name = product.img.name;
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
  <MySubstrate>
    <FormProduct
        @reset="onResetForm"
        @change-input-file="onChangeInputFile"
        title="Редактирование продукта"
        v-model:name="productData.name"
        v-model:price="productData.price"
        v-model:currency="productData.currency"
        v-model:description="productData.description"
        :src-photo="productData.img.url"
        :errorsValidation="errorsValidation"
        :errorRequest="errorRequest"
    >
      <MyLink tag="button" type="submit" class="submit">Создать</MyLink>
      <MyLink tag="button" type="reset" class="submit">Сбросить</MyLink>
    </FormProduct>
  </MySubstrate>
</template>

<style scoped>
/* Your styles here */
</style>
