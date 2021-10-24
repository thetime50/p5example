import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/page/home/home.vue';
import demo from './demo';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: 'home',
  },
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  demo,

  {
    path: '*',
    component: () => import('@/page/error404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
