import Vue from 'vue';
import Vuex from 'vuex';

import API from '../../config/api';
import { GET } from '../../utils/request';
import {
  LOSTANDFOUND_LOADING_FALSE,
  LOSTANDFOUND_LOADING_TRUE,
  LOSTANDFOUND_LIST,
  LOSTANDFOUND_LIST_RESET,
} from '../../store/mutation-types';

Vue.use(Vuex);

const initialState = () => ({
  page: 0,
  loading: false, // 是否正在加载数据
  listData: [], // 广场列表数据
});

const store = new Vuex.Store({
  state: {
    ...initialState(),
  },
  mutations: {
    [LOSTANDFOUND_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.loading = true;
    },
    [LOSTANDFOUND_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.loading = false;
    },
    [LOSTANDFOUND_LIST]: (state, payload) => {
      const obj = state;
      obj.page = payload.page;
      obj.listData = [...obj.listData, ...payload.listData];
    },
    [LOSTANDFOUND_LIST_RESET]: (state) => {
      const obj = state;
      const initialStateData = initialState();
      Object.keys(initialStateData).forEach((key) => {
        obj[key] = initialStateData[key];
      });
    },
  },
  actions: {
    async [LOSTANDFOUND_LIST]({ commit, state }) {
      // 正在加载的时候，不再继续加载，防止重复
      if (!state.loading) {
        const newPage = state.page + 1;
        commit({
          type: LOSTANDFOUND_LOADING_TRUE,
        });
        GET({
          url: API.publicarea.lostAndFound,
          data: {
            page: newPage,
          },
          success: (res) => {
            if (!res.data.errno) {
              commit({
                type: LOSTANDFOUND_LIST,
                listData: res.data.data,
                page: newPage,
              });
            } else {
              wx.showToast({
                title: res.data.errmsg,
                icon: 'none',
              });
            }
          },
          fail() {
            wx.showToast({
              title: '网络请求失败，请稍后再试',
              icon: 'none',
            });
          },
          complete() {
            commit({
              type: LOSTANDFOUND_LOADING_FALSE,
            });
          },
        });
      }
    },
  },
});

export default store;
