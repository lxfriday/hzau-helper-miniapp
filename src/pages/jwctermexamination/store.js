import Vue from 'vue';
import Vuex from 'vuex';

import API from '../../config/api';
import {
  POST,
} from '../../utils/request';
import {
  JWC_TERM_EXAMINATION_LOADING_TRUE,
  JWC_TERM_EXAMINATION_LOADING_FALSE,
  JWC_TERM_EXAMINATION,
} from '../../store/mutation-types';

Vue.use(Vuex);

const initialState = () => ({
  yearTerm: '',
  examInfo: [],
  loaded: false, // 是否应成功加载了数据
  loading: false, // 是否正在加载数据
});

const store = new Vuex.Store({
  state: {
    ...initialState(),
  },
  mutations: {
    [JWC_TERM_EXAMINATION_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.loading = true;
    },
    [JWC_TERM_EXAMINATION_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.loading = false;
    },
    [JWC_TERM_EXAMINATION]: (state, payload) => {
      const obj = state;
      obj.loaded = true;
      obj.yearTerm = payload.studentInfo.yearTerm;
      obj.examInfo = payload.studentInfo.examInfo;
    },
  },
  actions: {
    // 获取学期考试信息
    async [JWC_TERM_EXAMINATION]({ commit, state }, { payload }) {
      commit({
        type: JWC_TERM_EXAMINATION_LOADING_TRUE,
      });
      POST({
        url: API.schoolService.jwc.termExamination,
        data: {
          studentId: payload.studentId,
          cookie: payload.cookie,
        },
        success: (res) => {
          if (!res.data.errno) {
            commit({
              type: JWC_TERM_EXAMINATION,
              studentInfo: {
                yearTerm: res.data.data.yearTerm,
                examInfo: res.data.data.examInfo,
              },
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
            type: JWC_TERM_EXAMINATION_LOADING_FALSE,
          });
        },
      });
    },
  },
});

export default store;
