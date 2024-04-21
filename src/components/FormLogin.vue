<script setup>
import MyInput from '@/components/ui/MyInput.vue';
import MyFieldset from '@/components/MyFieldset.vue';
import MyLink from '@/components/ui/MyLink.vue';
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { useLoader } from '@/stores/loader.js';
import { useValidation } from '@/stores/validation';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();
const loaderStore = useLoader();
const validationStore = useValidation();

const formLogin = ref(null);
const emailValue = ref('');
const passwordValue = ref('');
const nameValue = ref('');

const errorRequest = ref('');
const errorsValidation = ref([]);
const deleteErrorValidation = (target) => {
  errorsValidation.value = errorsValidation.value.filter((objError) => {
    return objError.elem !== target;
  });

  if (!errorsValidation.value.length) {
    disabledButton.value = false;
  }
};
const addErrorValidation = (error) => {
  errorsValidation.value = [...errorsValidation.value, error];
  disabledButton.value = true;
};
const checkErrorValidation = (input) => {
  let isError = false;

  errorsValidation.value.forEach((objError) => {
    if (objError.elem === input) {
      isError = true;
    }
  });

  return isError;
};

const disabledButton = ref(true);

const onChangeForm = (e) => {
  if (!errorsValidation.value.length) {
    disabledButton.value = false;
  }

  const target = e.target;
  const resultValidate = validationStore.validate(target);

  if (resultValidate && !checkErrorValidation(target)) {
    addErrorValidation(resultValidate);
  } else {
    if (!resultValidate && checkErrorValidation(target)) {
      deleteErrorValidation(target);
    }
  }
};

const isHideInputName = ref(true);
const hideInputName = () => {
  isHideInputName.value = !isHideInputName.value;
  errorRequest.value = '';
  errorsValidation.value = [];
  formLogin.value.reset();
  disabledButton.value = true;
};

const getLegendValue = computed(() => {
  return isHideInputName.value ? 'Форма входа' : 'Форма регистрации';
});

const getAuth = computed(() => {
  return isHideInputName.value ? 'signin' : 'signup';
});

const auth = async (event) => {
  try {
    loaderStore.toggleShowLoader();
    await authStore.auth({
      email: emailValue.value,
      password: passwordValue.value
    }, getAuth.value);

    event.target.reset();

    if (getAuth.value === 'signin') {
      router.push('/index');
    } else {
      isHideInputName.value = !isHideInputName.value;
    }

  } catch (e) {
    errorRequest.value = e;
  } finally {
    loaderStore.toggleShowLoader();
  }
};
</script>

<template>
  <form action="" ref="formLogin" name="form-login" @change="onChangeForm" @submit.prevent="auth" novalidate>
    <MyFieldset class="fieldset" :legend-value="getLegendValue">

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
      <MyInput v-if="!isHideInputName"
               type="text"
               placeholder="Name"
               id="Name"
               v-model="nameValue"
               label-value="Введите имя :"
      />
    </MyFieldset>

    <div v-if="errorRequest || errorsValidation.length" class="wrap-error">
      <p>{{ errorRequest }}</p>
      <p v-for="errorValidate in errorsValidation" :key="errorValidate.message">{{ errorValidate.message }}</p>
    </div>

    <div class="wrap-button">
      <MyLink class="button" v-if="isHideInputName" @click="hideInputName" type="button" :tag="'button'">
        Зарегистрироваться
      </MyLink>
      <MyLink class="button" v-else @click="hideInputName" type="button" :tag="'button'">Войти в аккаунт
      </MyLink>

      <MyLink :class="['button', {'disabledButton': disabledButton}]" v-if="isHideInputName" :tag="'button'">
        Войти в аккаунт
      </MyLink>
      <MyLink :class="['button', {'disabledButton': disabledButton}]" v-else :tag="'button'">
        Зарегистрироваться
      </MyLink>
    </div>
  </form>
</template>

<style scoped>
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

.wrap-error {
  color: var(--color-error);
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
