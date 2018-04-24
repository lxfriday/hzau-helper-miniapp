import Vue from 'vue';
import Vuex from 'vuex';

import mockData from '../../mock/publicarea/mock';

import {
  PUBLICAREA_LOADING_FALSE,
  PUBLICAREA_LOADING_TRUE,
  PUBLICAREA_LIST,
} from '../../store/mutation-types';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    page: 0,
    loading: false, // 是否正在加载数据
    listData: [], // 广场列表数据
  },
  mutations: {
    [PUBLICAREA_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.loading = true;
    },
    [PUBLICAREA_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.loading = false;
    },
    [PUBLICAREA_LIST]: (state, payload) => {
      const obj = state;
      obj.page = payload.page;
      obj.listData = [...obj.listData, ...payload.listData];
    },
  },
  actions: {
    async [PUBLICAREA_LIST]({ commit, state }) {
      if (!state.loading) {
        const newPage = state.page + 1;
        commit({
          type: PUBLICAREA_LOADING_TRUE,
        });
        setTimeout(() => {
          commit({
            type: PUBLICAREA_LIST,
            listData: mockData(),
            page: newPage,
          });
          commit({
            type: PUBLICAREA_LOADING_FALSE,
          });
        }, 2000);
      } else {
        console.log('已经在加载了');
      }
    },
  },
});

export default store;
