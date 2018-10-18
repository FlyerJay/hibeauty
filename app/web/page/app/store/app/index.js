'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  opendefence: false, // 是否开启守护
  olduser: false, // 是否老用户
  personal: {}, // 用户信息
  address: {}, // 地址信息
  area: {}, // 活动区域
  contact: {
    home: {},
    other: {}
  }, // 联系人信息
  trail: {}, // 活动轨迹
  pageTurnAnimate: 'default' // 页面过渡动画
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});