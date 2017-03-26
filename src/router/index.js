import Vue from 'vue';
import Router from 'vue-router';
import Index from 'pages/Index';
import Gallery from 'pages/Gallery';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    },
  ]
})
