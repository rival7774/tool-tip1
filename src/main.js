import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/base.css';
import App from './App.vue';
import router from './router';

import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBj9cqLemyWkvZJqtrMiydHlnsNx3Pjx7w',
  authDomain: 'vue-crm-8cbad.firebaseapp.com',
  projectId: 'vue-crm-8cbad',
  storageBucket: 'vue-crm-8cbad.appspot.com',
  messagingSenderId: '744316776315',
  appId: '1:744316776315:web:8655b5b99b269c0eb717de'
};

const appFirebase = initializeApp(firebaseConfig);

// const auth = getAuth(appFirebase);
// const user = auth.currentUser;
// console.log(user);
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

let pinia = createPinia();
let app = createApp(App);

app.use(router)
   .use(pinia)
   .mount('#app');
