import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './page/index';
import Register from './page/register';
import Login from './page/login';
import Mine from './page/mine';

import store from './store/app';

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
  store.dispatch('CHANGE_PAGE_TURN_ANIMATE', 'default');
  if (routeFilters.indexOf(to.path) > -1) {
    const accessToken = getCookie('access_token');
    if (!accessToken) {
      store.dispatch('SET_JUMP_PAGE', to.path);
      next('/login');
    } else {
      next();
    }
    next();
  } else {
    if (from.path === '/login') {
      store.dispatch('CHANGE_PAGE_TURN_ANIMATE', 'slidedown');
    }
    if (to.path === '/login') {
      store.dispatch('CHANGE_PAGE_TURN_ANIMATE', 'popover');
    }
    next();
  }
});

export default router;
