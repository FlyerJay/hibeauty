'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { getCookie } from '../../util/cookie';

Vue.use(Vuex);
let host;
if (typeof document === 'object') {
  host = '/hibeauty';
} else {
  host = 'http://127.0.0.1:7002/hibeauty';
}

const actions = {

  FETCH_ALBUM_LIST: ({ commit, dispatch, state }, params) => {
    return axios.get(`${host}/api/album`, { params })
      .then(response => {
        const data = response.data;
        if (params.append) {
          commit(Type.APPEND_TO_ALBUM_LIST, data);
        } else {
          commit(Type.SET_ALBUM_LIST, data);
        }
        return data;
      });
  },

  FETCH_ALBUM_DETAIL: ({ commit, dispatch, state }, id) => {
    return axios.get(`${host}/api/album/${id}`)
      .then(response => {
        const data = response.data;
        commit(Type.SET_ALBUM_DETAIL, data);
      });
  },

  REGISTER_USER: ({ dispatch }, params) => {
    const _csrf = getCookie('csrfToken');
    return axios.post(`${host}/api/register`, Object.assign(params, { _csrf }));
  },

  USER_LOGIN: ({ dispatch }, params) => {
    const _csrf = getCookie('csrfToken');
    return axios.post(`${host}/api/login`, Object.assign(params, { _csrf }));
  },

  CHANGE_PAGE_TURN_ANIMATE: ({ commit, dispatch, state }, animate) => {
    commit(Type.CHANGE_PAGE_TURN_ANIMATE, animate);
  },

  SET_JUMP_PAGE: ({ commit, dispatch, state }, jump) => {
    commit(Type.SET_JUMP_PAGE, jump);
  },
};

export default actions;