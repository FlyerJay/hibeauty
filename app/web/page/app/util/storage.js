/**
 * @author flyerjay
 * @desc 本地存储
 * @since 2018-10-18
 */
import Vue from 'vue';

if (!Vue.prototype.$isServer) {
  const storage = window.localStorage;
  Vue.prototype.$storage = {
    get(key) {
      try {
        return JSON.parse(storage.getItem(key));
      } catch (e) {
        return storage.getItem(key);
      }
    },
    set(key, o) {
      if (typeof o === 'object') {
        storage.setItem(key, JSON.stringify(o));
      } else {
        storage.setItem(key, o);
      }
    },
    remove(key) {
      storage.removeItem(key);
    }
  };
}
