import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: Index
    }
  ]
});

export default router;
