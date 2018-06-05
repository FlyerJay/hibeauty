'use strict';

import {
  SET_ALBUM_LIST,
  SET_ALBUM_DETAIL,
  APPEND_TO_ALBUM_LIST,
  SET_BOTTOM_SHOW
} from './mutation-type';

const mutations = {
  [SET_ALBUM_LIST](state, items) {
    state.albumList = items.data;
    state.albumListTotal = items.pageInfo.totalCount;
  },
  [APPEND_TO_ALBUM_LIST](state, items) {
    state.albumList = state.albumList.concat(items.data);
  },
  [SET_ALBUM_DETAIL](state, data) {
    state.album = data.data.slice(1, data.data.length);
  },
  [SET_BOTTOM_SHOW](state, status) {
    state.pageBottomShow = status;
  }
};
export default mutations;
