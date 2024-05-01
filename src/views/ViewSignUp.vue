<script setup>
import MyInput from '@/components/ui/MyInput.vue';
import MyFieldset from '@/components/MyFieldset.vue';
import MyLink from '@/components/ui/MyLink.vue';
import MyError from '@/components/MyError.vue';
import MyPopup from '@/components/MyPopup.vue';
import MyLoader from '@/components/MyLoader.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authUser.js';
import { useLoader } from '@/stores/loader.js';
import { useValidation } from '@/stores/validation';
import { useRouter } from 'vue-router';

const PAGE_SIGNUP = { name: 'signin' };
const REQUEST = 'signup';

const router = useRouter();

const authStore = useAuthStore();
const loaderStore = useLoader();
const validationStore = useValidation();

const dataSignUp = ref({});

const errorRequest = ref('');
const errorsValidation = ref([]);

const onClickEntry = () => {
  router.push(PAGE_SIGNUP);
};

const auth = async (event) => {
  const form = event.target;
  errorsValidation.value = validationStore.validate(form);

  if (!errorsValidation.value.length) {
    try {
      loaderStore.toggleShowLoader();
      await authStore.auth(dataSignUp.value, REQUEST);

      event.target.reset();
      router.push(PAGE_SIGNUP);
    } catch (e) {
      console.log(e);
      errorRequest.value = e;
    } finally {
      loaderStore.toggleShowLoader();
    }
  }
};
</script>

<template>
  <MyPopup class="popup">
    <form action="" ref="formLogin" name="form-login" @submit.prevent="auth" novalidate>
      <MyFieldset class="fieldset" legend-value="Форма регистрации">

        <MyInput type="email"
                 placeholder="Email"
                 id="email"
                 v-model="dataSignUp.email"
                 label-value="Введите свой email :"
                 :required="true"
        />
        <MyInput type="password"
                 placeholder="Password"
                 id="password"
                 v-model="dataSignUp.password"
                 label-value="Введите пароль :"
                 :required="true"
        />
        <MyInput type="text"
                 placeholder="Name"
                 id="Name"
                 v-model="dataSignUp.name"
                 label-value="Введите имя :"
        />
      </MyFieldset>

      <MyError :error-request="errorRequest" :errors-validation="errorsValidation"/>

      <div class="wrap-button">
        <MyLink @click="onClickEntry" class="button" type="button" :tag="'button'">Войти в аккаунт</MyLink>

        <MyLink class="button" :tag="'button'">Зарегистрироваться</MyLink>
      </div>
    </form>
  </MyPopup>

  <MyLoader/>
</template>

<style scoped>
.popup {
  max-width: 600px;
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.fieldset {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wrap-button {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
}

@media all and (max-width: 520px) {
  .button {
    width: 100%;
    text-align: center;
  }
}
</style>
