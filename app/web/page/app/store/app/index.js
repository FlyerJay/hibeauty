'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  albumList: [],
  albumListTotal: 0,
  album: [],
  pageBottomShow: true
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});