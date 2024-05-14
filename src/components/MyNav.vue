<script setup>
import MyLink from '@/components/ui/MyLink.vue';
import MyNavLink from '@/components/ui/MyNavLink.vue';
import MyPopup from '@/components/MyPopup.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authUser';
import { useAboutStore } from '@/stores/about';

const authStore = useAuthStore();
const aboutStore = useAboutStore();
const router = useRouter();
const isShowPopup = ref(false);
const showPopup = () => {
  isShowPopup.value = true;
};

const onClickBtnExit = () => {
  aboutStore.clearDataUser();
  authStore.clearUser();
  router.push({ name: 'signin' });
};

const onClickBtnCansel = () => {
  isShowPopup.value = false;
};

const onClickWrapPopup = (e) => {
  if (e.currentTarget === e.target) {
    onClickBtnCansel();
  }
};

const links = [
  {
    to: '/home/main',
    text: 'Главная'
  },
  {
    to: '/home/products',
    text: 'Товары'
  },
  {
    to: '/home/about',
    text: 'Мои данные'
  }
];
</script>

<template>
  <nav>
    <ul>
      <li v-for="link in links" :key="link">
        <MyNavLink :data-link="link"/>
      </li>
      <li>
        <MyLink @click="showPopup">Выйти</MyLink>
      </li>
    </ul>

    <transition>
      <MyPopup @click="onClickWrapPopup" v-if="isShowPopup" class="wrap-popup">
        <p>Вы уверенны, что хотите выйти из своего профиля?</p>
        <div class="wrap-button">
          <MyLink tag="button" @click="onClickBtnExit">Выйти</MyLink>
          <MyLink tag="button" @click="onClickBtnCansel">Отмена</MyLink>
        </div>
      </MyPopup>
    </transition>
  </nav>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 13px;
}

.wrap-popup {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: calc(50% - 150px);
  padding-right: calc(50% - 150px);
}

.wrap-button {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}

@media (max-width: 424px) {
  .my-popup {
    max-width: 90%;
  }
}
</style>
