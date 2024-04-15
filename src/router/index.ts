import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import HomePage from '~/views/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/vue-coins' : '/'),
  routes,
});

export default router;
