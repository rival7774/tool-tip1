<script setup>
import MyLink from '@/components/ui/MyLink.vue';
import MyPopup from '@/components/MyPopup.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authUser';

const authStore = useAuthStore();
const router = useRouter();
const isShowPopup = ref(false);
const showPopup = () => {
  isShowPopup.value = true;
};

const onClickBtnExit = () => {
  authStore.clearUser();
  router.push({ name: 'signin' });
};

const onClickBtnCansel = () => {
  isShowPopup.value = false;
};

const links = [
  {
    to: '/home/main',
    text: 'Главная'
  },
  {
    to: '/home/products',
    text: 'Продукты'
  },
  {
    to: '/home/about',
    text: 'Мои данные'
  },
  {
    to: '/home/contacts',
    text: 'Контакты'
  },
  {
    to: '/home/settings',
    text: 'Настройки'
  },
  {
    to: '',
    text: 'Выйти'
  }
];
</script>

<template>
  <nav>
    <ul>
      <li v-for="link in links" :key="link">
        <router-link v-if="link.to"
                     :to="link.to"
                     v-slot="{ navigate, isActive, isExactActive }"
        >
          <MyLink :tag="'button'"
                  :active="isActive"
                  :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                  @click="navigate"
          >
            {{ link.text }}
          </MyLink>
        </router-link>

        <MyLink v-else @click="showPopup">{{ link.text }}</MyLink>
      </li>
    </ul>

    <transition>
      <MyPopup v-if="isShowPopup" class="my-popup">
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

.router-link-active {
  color: var(--color-hover-link);
}

.router-link-active:before {
  width: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  width: 0;
}

.my-popup {
  max-width: 378px;
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
