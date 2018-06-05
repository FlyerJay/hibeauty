import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './page/index';
import Register from './page/register';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/register',
      component: Register
    }
  ]
});

export default router;
