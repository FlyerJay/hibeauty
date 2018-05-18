'use strict';

import {
  SET_ALBUM_LIST,
  SET_ALBUM_DETAIL
} from './mutation-type'

const mutations = {
  [SET_ALBUM_LIST] (state, items){
    state.albumList = items.data;
  },
  [SET_ALBUM_DETAIL](state, data) {
    state.album = data;
  }
};
export default mutations
