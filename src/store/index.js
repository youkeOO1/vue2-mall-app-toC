import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
  },
  mutations: {
    setSideBarList(state, arr) {
      console.log(arr);
      state.sideBarList = arr;
    },
  },
  actions: {
    async getSideBarList({ commit }, type) {
      console.log(type);
      const value = await api.getSideList(type);
      commit('setSideBarList', value);
    },
  },
  modules: {
  },
});
