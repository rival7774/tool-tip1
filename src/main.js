import { createPinia } from 'pinia';
import router from './router';
import { createApp } from 'vue';
import './assets/base.css';
import App from './App.vue';

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBj9cqLemyWkvZJqtrMiydHlnsNx3Pjx7w',
  authDomain: 'vue-crm-8cbad.firebaseapp.com',
  projectId: 'vue-crm-8cbad',
  storageBucket: 'vue-crm-8cbad.appspot.com',
  messagingSenderId: '744316776315',
  appId: '1:744316776315:web:8655b5b99b269c0eb717de'
};

const firebaseApp = initializeApp(firebaseConfig);
getStorage(firebaseApp, 'gs://vue-crm-8cbad.appspot.com');

let pinia = createPinia();
let app = createApp(App);

app.use(pinia)
   .use(router)
   .mount('#app');
