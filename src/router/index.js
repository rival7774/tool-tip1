import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [{
  path: '/home',
  name: 'home',
  component: () => import('../views/userView/UserView.vue'),
  meta: {
    requiresAuth: true
  },
  children: [{
    path: '/index',
    name: 'index',
    component: () => import('../views/userView/views/HomeView.vue')
  },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/userView/views/AboutView.vue')
    }, {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/userView/views/ContactsView.vue')
    }, {
      path: '/products',
      name: 'Products',
      component: () => import('../views/userView/views/ProductsView.vue')
    }
  ]
},
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/ViewLogin.vue')
  },
  {
    path: '/',
    name: '/start',
    component: () => import('../App.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const isAuthenticated = true;

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      name: 'login'
    };
  }
});

export default router;
