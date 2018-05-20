'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
let host;
if (typeof document === 'object') {
  host = '/app';
} else {
  host = 'http://127.0.0.1:7002/app';
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
  }
};

export default actions;