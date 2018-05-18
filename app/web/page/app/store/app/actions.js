'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const host = 'http://127.0.0.1:7001';

const actions = {

  FETCH_ALBUM_LIST: ({ commit, dispatch, state }, param) => {
    if (!state.albumList.length) {
      return axios.get(`${host}/app/api/album`, param)
        .then(response => {
          const data = response.data;
          commit(Type.SET_ALBUM_LIST, data);
          return data;
        });
    }
    return Promise.resolve();
  },

  FETCH_ALBUM_DETAIL: ({ commit, dispatch, state }, { id }) => {
    if (state.album.id !== id) {
      return axios.get(`${host}/app/api/album/${id}`)
        .then(response => {
          const data = response.data;
          commit(Type.SET_ALBUM_DETAIL, data);
        });
    }
    return Promise.resolve();
  }
};

export default actions;