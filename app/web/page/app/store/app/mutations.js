'use strict';

import {
  MARK_AS_OLDUSER,
  SAVE_PERSONAL,
  SAVE_ADDRESS,
  SAVE_AREA,
  SAVE_TRAIL,
  SAVE_CONTACT,
  CHANGE_PAGE_TURN_ANIMATE
} from './mutation-type';

import Vue from 'vue';
const vm = new Vue();

const mutations = {
  [SAVE_PERSONAL](state, personal) {
    state.personal = personal;
    !Vue.prototype.$isServer && vm.$storage.set('personal', personal);
  },
  [SAVE_ADDRESS](state, address) {
    state.address = address;
    !Vue.prototype.$isServer && vm.$storage.set('address', address);
  },
  [SAVE_AREA](state, area) {
    state.area = area;
    !Vue.prototype.$isServer && vm.$storage.set('area', area);
  },
  [SAVE_TRAIL](state, trail) {
    state.trail = trail;
    !Vue.prototype.$isServer && vm.$storage.set('trail', trail);
  },
  [SAVE_CONTACT](state, contact) {
    state.contact = contact;
    !Vue.prototype.$isServer && vm.$storage.set('contact', contact);
  },
  [CHANGE_PAGE_TURN_ANIMATE](state, animate) {
    state.pageTurnAnimate = animate;
  },
  [MARK_AS_OLDUSER](state) {
    state.firstIn = false;
    !Vue.prototype.$isServer && vm.$storage.set('olduser', true);
  }
};
export default mutations;
