import * as types from '../mutation-types';

const state = {
  clothesParam: {},
  clothesImg: {}
}

const actions = {
  selectClothesType({
    commit,
    state
  }, po) {
    commit(types.RECEIVE_SELECT_CLOTHES_TYPE, po)
  },
  selectClothesImg({
    commit,
    state
  }, po) {
    commit(types.RECEIVE_SELECT_CLOTHES_IMG, po)
  },
  clearParams({
    commit,
    state
  }) {
    commit(types.RECEIVE_CLEAR_PARAMS)
  }
}

const mutations = {
  [types.RECEIVE_SELECT_CLOTHES_TYPE](state, po) {
    state.clothesParam = Object.assign({}, state.clothesParam, po);
  },
  [types.RECEIVE_SELECT_CLOTHES_IMG](state, po) {
    state.clothesImg = Object.assign({}, state.clothesImg, po);
  },
  [types.RECEIVE_CLEAR_PARAMS](state) {
    state.clothesParam = {};
    state.clothesImg = {};
  }
}

export default {
  state,
  actions,
  mutations
}
