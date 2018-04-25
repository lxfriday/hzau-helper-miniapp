import Vue from 'vue';
import Vuex from 'vuex';

import API from '../../config/api';
import { GET } from '../../utils/request';
import {
  EATANDHAVEFUN_LOADING_FALSE,
  EATANDHAVEFUN_LOADING_TRUE,
  EATANDHAVEFUN_LIST,
  EATANDHAVEFUN_LIST_RESET,
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
    [EATANDHAVEFUN_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.loading = true;
    },
    [EATANDHAVEFUN_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.loading = false;
    },
    [EATANDHAVEFUN_LIST]: (state, payload) => {
      const obj = state;
      obj.page = payload.page;
      obj.listData = [...obj.listData, ...payload.listData];
    },
    [EATANDHAVEFUN_LIST_RESET]: (state) => {
      const obj = state;
      const initialStateData = initialState();
      Object.keys(initialStateData).forEach((key) => {
        obj[key] = initialStateData[key];
      });
    },
  },
  actions: {
    async [EATANDHAVEFUN_LIST]({ commit, state }) {
      // 正在加载的时候，不再继续加载，防止重复
      if (!state.loading) {
        const newPage = state.page + 1;
        commit({
          type: EATANDHAVEFUN_LOADING_TRUE,
        });
        GET({
          url: API.publicarea.eatAndHaveFun,
          data: {
            page: newPage,
          },
          success: (res) => {
            if (!res.data.errno) {
              commit({
                type: EATANDHAVEFUN_LIST,
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
              type: EATANDHAVEFUN_LOADING_FALSE,
            });
          },
        });
      }
    },
  },
});

export default store;
