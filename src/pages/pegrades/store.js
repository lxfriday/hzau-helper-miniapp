import Vue from 'vue';
import Vuex from 'vuex';

import API from '../../config/api';
import { POST } from '../../utils/request';
import {
  PEGRADES_LOADING_TRUE,
  PEGRADES_LOADING_FALSE,
  PEGRADES,
  PEGRADES_RESET,
} from '../../store/mutation-types';

Vue.use(Vuex);

const initialState = () => ({
  loading: false, // 是否正在加载数据
  haveChecked: false, // 用户是否已经查询到数据
  grades: {
    lakeRun: null,
    PETest: null,
  },
});

const store = new Vuex.Store({
  state: {
    ...initialState(),
  },
  mutations: {
    [PEGRADES_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.loading = true;
    },
    [PEGRADES_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.loading = false;
    },
    [PEGRADES]: (state, payload) => {
      const obj = state;
      obj.haveChecked = true;
      obj.grades = {
        lakeRun: payload.grades.lakeRun, // 环湖跑成绩
        PETest: payload.grades.PETest, // 体测成绩
      };
    },
    [PEGRADES_RESET]: (state) => {
      const obj = state;
      const initialStateData = initialState();
      Object.keys(initialStateData).forEach((key) => {
        obj[key] = initialStateData[key];
      });
    },
  },
  actions: {
    async [PEGRADES]({ commit, state }, { payload }) {
      // 正在加载的时候，不再继续加载，防止重复
      if (!state.loading) {
        commit({
          type: PEGRADES_LOADING_TRUE,
        });
        POST({
          url: API.schoolService.PEGrade,
          data: {
            cardID: payload.studentID,
            password: payload.password,
          },
          success: (res) => {
            if (!res.data.errno) {
              // 成功登录之后，保存用户的登录信息
              if (payload.rememberInfoFlag) {
                wx.setStorage({
                  key: 'pegradesUserInfo',
                  data: {
                    username: payload.studentID,
                    password: payload.password,
                  },
                  success() {
                  },
                });
              }
              commit({
                type: PEGRADES,
                grades: res.data.data,
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
              type: PEGRADES_LOADING_FALSE,
            });
          },
        });
      }
    },
  },
});

export default store;
