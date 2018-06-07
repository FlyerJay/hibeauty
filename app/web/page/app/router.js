import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './page/index';
import Register from './page/register';
import Login from './page/login';
import Mine from './page/mine';
import Collection from './page/collection';

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
    },
    {
      path: '/collection',
      component: Collection
    }
  ]
});

const routeFilters = ['/mine', '/collection'];

router.beforeEach((to, from, next) => {
  if (Vue.prototype.$isServer) return;
  if (routeFilters.indexOf(to.path) > -1) {
    const accessToken = getCookie('access_token');
    if (!accessToken) {
      store.dispatch('SET_JUMP_PAGE', to.path);
      next('/login');
    } else {
      if (from.path === '/login' && to.path !== '/register') {
        store.dispatch('CHANGE_PAGE_TURN_ANIMATE', 'slidedown');
      }
      if (to.path === '/login' && from.path !== '/register') {
        store.dispatch('CHANGE_PAGE_TURN_ANIMATE', 'popover');
      }
      next();
    }
    next();
  } else {
    if (from.path === '/login' && to.path !== '/register') {
      store.dispatch('CHANGE_PAGE_TURN_ANIMATE', 'slidedown');
    }
    if (to.path === '/login' && from.path !== '/register') {
      store.dispatch('CHANGE_PAGE_TURN_ANIMATE', 'popover');
    }
    next();
  }
});

export default router;
