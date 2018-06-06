import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './page/index';
import Register from './page/register';
import Login from './page/login';
import Mine from './page/mine';

import { getCookie } from './util/cookie';

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
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/mine',
      component: Mine
    }
  ]
});

const routeFilters = ['/mine', '/collection'];

router.beforeEach((to, from, next) => {
  if (routeFilters.indexOf(to.path) > -1) {
    const accessToken = getCookie('access_token');
    if (!accessToken) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
