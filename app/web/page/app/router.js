import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './page/index';
import FirstIn from './page/firstin';

import Personal from './page/setting/personal';
import Address from './page/setting/address';
import Contact from './page/setting/contact';
import Area from './page/setting/area';

import Trail from './page/trail';

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
      path: '/area',
      component: Area
    },
    {
      path: '/firstin',
      component: FirstIn
    },
    {
      path: '/personal',
      component: Personal
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/address',
      component: Address
    },
    {
      path: '/trail',
      component: Trail
    }
  ]
});

export default router;
