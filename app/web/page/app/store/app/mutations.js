'use strict';

import {
  SET_ALBUM_LIST,
  SET_ALBUM_DETAIL,
  APPEND_TO_ALBUM_LIST
} from './mutation-type';

const mutations = {
  [SET_ALBUM_LIST](state, items) {
    state.albumList = items.data;
  },
  [APPEND_TO_ALBUM_LIST](state, items) {
    state.albumList = state.albumList.concat(items.data);
  },
  [SET_ALBUM_DETAIL](state, data) {
    state.album = data.data.slice(1, data.data.length);
  }
};
export default mutations;
