'use strict';

import {
  SET_ALBUM_LIST,
  SET_ALBUM_DETAIL,
  APPEND_TO_ALBUM_LIST,
  CHANGE_PAGE_TURN_ANIMATE,
  SET_JUMP_PAGE,
  SET_USER_INFO
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
  [CHANGE_PAGE_TURN_ANIMATE](state, animate) {
    state.pageTurnAnimate = animate;
  },
  [SET_JUMP_PAGE](state, jump) {
    state.jumpPage = jump;
  },
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo.data;
  }
};
export default mutations;
