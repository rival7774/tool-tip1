import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authUser';

const routes = [{
  path: '/home',
  name: 'home',
  component: () => import('../views/userView/HomeView.vue'),
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: 'main',
      name: 'main',
      component: () => import('../views/userView/views/MainView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'about',
      name: 'about',
      component: () => import('../views/userView/views/AboutView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'contacts',
      name: 'contacts',
      component: () => import('../views/userView/views/ContactsView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home/products',
      name: 'products',
      component: () => import('../views/userView/views/ProductsView.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'all-products',
          name: 'all-products',
          component: () => import('../views/userView/views/AllProductsView.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'add-products',
          name: 'add-products',
          component: () => import('../views/userView/views/AddProductView.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'product/:id',
          name: 'product',
          component: () => import('../views/userView/views/ProductView.vue'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: 'settings',
      name: 'settings',
      component: () => import('../views/userView/views/SettingsView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
},
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/ViewSignUp.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'signin',
    component: () => import('../views/ViewSignIn.vue'),
    meta: {
      requiresAuth: false
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.userInfo.token) {
    next('/');
  } else if (!to.meta.requiresAuth && authStore.userInfo.token) {
    next('/home/main');
  } else {
    next();
  }
});

export default router;
