import Vue from 'vue';
import Vuex from 'vuex';

import API from '../../config/api';
import { GET } from '../../utils/request';
import {
  PUBLICAREA_LOADING_FALSE,
  PUBLICAREA_LOADING_TRUE,
  PUBLICAREA_LIST,
  PUBLICAREA_LIST_REFRESH,
  PUBLICAREA_LIST_CLEAN,
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
    [PUBLICAREA_LIST_REFRESH]: (state, payload) => {
      const obj = state;
      obj.page = payload.page;
      obj.listData = [...payload.listData];
    },
    [PUBLICAREA_LIST_CLEAN]: (state) => {
      const obj = state;
      obj.page = 1;
      obj.listData = [];
    },
  },
  actions: {
    async [PUBLICAREA_LIST]({ commit, state }) {
      // 正在加载的时候，不再继续加载，防止重复
      if (!state.loading) {
        const newPage = state.page + 1;
        commit({
          type: PUBLICAREA_LOADING_TRUE,
        });
        GET({
          url: API.publicarea.index,
          data: {
            page: newPage,
          },
          success: (res) => {
            if (!res.data.errno) {
              commit({
                type: PUBLICAREA_LIST,
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
              type: PUBLICAREA_LOADING_FALSE,
            });
          },
        });
      }
    },
    async [PUBLICAREA_LIST_REFRESH]({ commit, state }) {
      // 正在加载的时候，不再继续加载，防止重复
      if (!state.loading) {
        const newPage = 1;
        commit({
          type: PUBLICAREA_LOADING_TRUE,
        });
        commit({
          type: PUBLICAREA_LIST_CLEAN,
        });
        GET({
          url: API.publicarea.index,
          data: {
            page: newPage,
          },
          success: (res) => {
            if (!res.data.errno) {
              commit({
                type: PUBLICAREA_LIST_REFRESH,
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
              type: PUBLICAREA_LOADING_FALSE,
            });
          },
        });
      }
    },
  },
});

export default store;
