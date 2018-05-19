import Vue from 'vue';
import '../filter';
import '../directive';
import '../component';

export default function(options) {
  Vue.prototype.$http = require('axios');
  options.store.replaceState(Object.assign({}, options.store.state, window.__INITIAL_STATE__));
  const app = new Vue(options);
  app.$mount('#app');
}
