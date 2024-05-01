<script setup>
import MyInput from '@/components/ui/MyInput.vue';
import MyFieldset from '@/components/MyFieldset.vue';
import MyLink from '@/components/ui/MyLink.vue';
import MyError from '@/components/MyError.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authUser.js';
import { useLoader } from '@/stores/loader.js';
import { useValidation } from '@/stores/validation';
import { useRouter } from 'vue-router';
import MyPopup from '@/components/MyPopup.vue';
import MyLoader from '@/components/MyLoader.vue';

const router = useRouter();
const PAGE_HOME = '/home';
const PAGE_SIGNUP = { name: 'signup' };
const REQUEST = 'signin';

const authStore = useAuthStore();
const loaderStore = useLoader();
const validationStore = useValidation();

const formLogin = ref(null);
const emailValue = ref('');
const passwordValue = ref('');

const errorRequest = ref('');
const errorsValidation = ref([]);

const onClickRegistration = () => {
  router.push(PAGE_SIGNUP);
};

const auth = async (event) => {
  const form = event.target;
  errorsValidation.value = validationStore.validate(form);

  if (!errorsValidation.value.length) {
    try {
      loaderStore.toggleShowLoader();
      await authStore.auth({
        email: emailValue.value,
        password: passwordValue.value
      }, REQUEST);

      form.reset();


      router.push(PAGE_HOME);
    } catch (e) {
      errorRequest.value = e;
    } finally {
      loaderStore.toggleShowLoader();
    }
  }
};
</script>

<template>
  <MyPopup class="popup">
    <form action="" ref="formLogin" name="form-login" @submit="onSubmitForm" @submit.prevent="auth" novalidate>
      <MyFieldset class="fieldset" legend-value="Форма входа">

        <MyInput type="email"
                 placeholder="Email"
                 id="email"
                 v-model="emailValue"
                 label-value="Введите свой email :"
                 :required="true"
        />
        <MyInput type="password"
                 placeholder="Password"
                 id="password"
                 v-model="passwordValue"
                 label-value="Введите пароль :"
                 :required="true"
        />
      </MyFieldset>

      <MyError :error-request="errorRequest" :errors-validation="errorsValidation"/>

      <div class="wrap-button">
        <MyLink class="button" @click="onClickRegistration" type="button" :tag="'button'">
          Зарегистрироваться
        </MyLink>

        <MyLink class="button" :tag="'button'">
          Войти в аккаунт
        </MyLink>
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

.disabledButton {
  pointer-events: none;
  opacity: 0.5;
}

@media all and (max-width: 520px) {
  .button {
    width: 100%;
    text-align: center;
  }
}
</style>
