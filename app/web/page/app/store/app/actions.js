'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { getCookie } from '../../util/cookie';

Vue.use(Vuex);
const vm = new Vue();
const actions = {
  // 初始化应用数据
  FLUSH_APPLICATION_DATA: ({ commit, dispatch, state }, params) => {
    if (!Vue.prototype.$isServer) {
      const personal = vm.$storage.get('personal');
      const address = vm.$storage.get('address');
      const contact = vm.$storage.get('contact');
      const trail = vm.$storage.get('trail');
      const area = vm.$storage.get('area');
      const olderuser = vm.$storage.get('olderuser');
      const opendefence = vm.$storage.get('opendefence');

      personal && commit('SAVE_PERSONAL', personal);
      address && commit('SAVE_ADDRESS', address);
      contact && commit('SAVE_CONTACT', contact);
      trail && commit('SAVE_TRAIL', trail);
      area && commit('SAVE_AREA', area);
      olderuser && commit('MARK_AS_OLDUSER');
      opendefence && commit('CHANGE_DEFENCE_STATE', opendefence);

      console.log('成功刷新数据');
    }
  },

  // 切换页面动画效果
  CHANGE_PAGE_TURN_ANIMATE: ({ commit, dispatch, state }, animate) => {
    commit(Type.CHANGE_PAGE_TURN_ANIMATE, animate);
  },
};

export default actions;