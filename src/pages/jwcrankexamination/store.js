import Vue from 'vue';
import Vuex from 'vuex';

import API from '../../config/api';
import {
  POST,
} from '../../utils/request';
import {
  JWC_RANK_EXAMINATION_LOADING_TRUE,
  JWC_RANK_EXAMINATION_LOADING_FALSE,
  JWC_RANK_EXAMINATION,
} from '../../store/mutation-types';

Vue.use(Vuex);

const initialState = () => ({
  rankExamResultInfo: [],
  loaded: false, // 是否应成功加载了数据
  loading: false, // 是否正在加载数据
});

const store = new Vuex.Store({
  state: {
    ...initialState(),
  },
  mutations: {
    [JWC_RANK_EXAMINATION_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.loading = true;
    },
    [JWC_RANK_EXAMINATION_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.loading = false;
    },
    [JWC_RANK_EXAMINATION]: (state, payload) => {
      const obj = state;
      obj.loaded = true;
      obj.rankExamResultInfo = payload.rankExamResultInfo;
    },
  },
  actions: {
    // 获取等级考试的信息
    async [JWC_RANK_EXAMINATION]({ commit, state }, { payload }) {
      commit({
        type: JWC_RANK_EXAMINATION_LOADING_TRUE,
      });
      POST({
        url: API.schoolService.jwc.rankExamination,
        data: {
          studentId: payload.studentId,
          cookie: payload.cookie,
        },
        success: (res) => {
          if (!res.data.errno) {
            commit({
              type: JWC_RANK_EXAMINATION,
              rankExamResultInfo: res.data.data,
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
            type: JWC_RANK_EXAMINATION_LOADING_FALSE,
          });
        },
      });
    },
  },
});

export default store;
