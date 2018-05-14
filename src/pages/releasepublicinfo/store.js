import Vue from 'vue';
import Vuex from 'vuex';

import API from '../../config/api';
import userStore from '../about/store';
import publicareaStore from '../publicarea/store';
import { POST } from '../../utils/request';
import {
  PUBLICAREA_SUBMIT_LOADING_TRUE,
  PUBLICAREA_SUBMIT_LOADING_FALSE,
  PUBLICAREA_SUBMIT,
  PUBLICAREA_LIST_REFRESH,
} from '../../store/mutation-types';


Vue.use(Vuex);

const initialState = () => ({
  loading: false, // 是否正在加载中、发布中
});

const store = new Vuex.Store({
  state: {
    ...initialState(),
  },
  mutations: {
    [PUBLICAREA_SUBMIT_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.loading = true;
    },
    [PUBLICAREA_SUBMIT_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.loading = false;
    },
  },
  actions: {
    async [PUBLICAREA_SUBMIT]({ commit, state }, { payload }) {
      if (!state.loading) {
        commit({
          type: PUBLICAREA_SUBMIT_LOADING_TRUE,
        });
        POST({
          url: API.publicarea.submit,
          data: {
            token: userStore.state.userInfo.token,
            type: payload.type,
            images: payload.images,
            content: payload.content,
          },
          success: (res) => {
            if (!res.data.errno) {
              wx.showToast({
                title: '发布动态成功',
                icon: 'none',
              });
              payload.cb();
              // 成功发布之后，刷新公共区域的列表
              setTimeout(() => {
                publicareaStore.dispatch({
                  type: PUBLICAREA_LIST_REFRESH,
                });
              }, 500);
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
              type: PUBLICAREA_SUBMIT_LOADING_FALSE,
            });
          },
        });
      }
    },
  },
});

export default store;
