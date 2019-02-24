/**
 * Created by rule on 2019/2/24.
 */

import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX)

import * as API from '../api/index.js'

export default new VueX.Store({
  state: {
	goodsMap: {},
	categoryList: []
  },

  mutations: {
	SET_GOODS: (state, {guid, goods}) => state.goodsMap[guid] = goods,
	SET_CATEGORY: (state, list) => state.categoryList = list
  },

  actions: {
	async getGoodsByGuid({commit, state}, guid) {
	  if (state.goodsMap[guid]) return Promise.resolve()
	  let res = await API.getGoodsList(guid)
	  commit('SET_GOODS', {guid, goods: res.data})
	},
	async getCategory({commit}) {
	  let res = await API.getCategory()
	  commit('SET_CATEGORY', res.data)
	},
  }

})