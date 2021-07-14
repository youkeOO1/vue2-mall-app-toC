import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
    goodsList: [],
    size: 5,
    type: null,
    showContent: false,
    counterMap: {},
  },
  mutations: {
    setSideBarList(state, arr) {
      state.sideBarList = arr;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
      console.log(state.goodsList);
    },
    resetGoodList(state) {
      state.goodsList = [];
    },
    setType(state, type) {
      state.type = type;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setCounterMap(state, obj) {
      state.counterMap = obj;
    },
    storageChange(state, { id, value }) {
      /**
       * 第一种情况 数量正常加加
       * 第二种情况 数量减减， 当数量小与1 赋值为null
       * 第三种情况 初始没有值，将值从null修改为1
       * 每次修改对本地缓存进行更新
       */
      console.log(id, value, 'update');
      if (state.counterMap[id]) {
        if (state.counterMap[id] < 2 && value === '-1') {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
  },
  actions: {
    /**
     * 获取侧边栏的数据
     * @param {*} param0
     * @param {*} type
     */
    async getSideBarList({ commit }, type) {
      commit('setShowContent', false);
      const value = await api.getSideList(type);
      commit('setSideBarList', value);
      commit('setShowContent', true);
    },
    /**
     * 获取商品列表数据
     */
    async getGoodsList({ commit, state }, options) {
      const { page, sort } = options;
      const type = options.type || state.type;
      commit('setType', type);
      const { total, list } = await api.getGoodsList(type, page, state.size, sort);
      commit('setGoodsList', list);
      console.log(total);
      if (total > state.goodsList.length) {
        return true;
      }
      return false;
    },

  },
  modules: {},
});
