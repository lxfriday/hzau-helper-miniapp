import Vue from 'vue';
import Vuex from 'vuex';

import API from '../../config/api';
import {
  GET,
  POST,
} from '../../utils/request';
import {
  JWC_SIGNIN_SIGNIN_CODE_LOADING_TRUE,
  JWC_SIGNIN_SIGNIN_CODE_LOADING_FALSE,
  JWC_SIGNIN_CODE,
  JWC_SIGNIN_LOADING_TRUE,
  JWC_SIGNIN_LOADING_FALSE,
  JWC_SIGNIN,
} from '../../store/mutation-types';

Vue.use(Vuex);

const initialState = () => ({
  signInCodeLoading: true,
  signInCodeInfo: {
    cookie: '', // cookie
    img: '', // 验证码base64
    viewstate: '', // 状态
  },

  // 登录成功之后，会获取到登陆成功的cookie和学生的学号
  studentInfo: {
    cookie: '',
    studentId: '',
  },
  signInSuccess: false, // 是否登陆了

  loading: false, // 是否正在加载数据
});

const store = new Vuex.Store({
  state: {
    ...initialState(),
  },
  mutations: {
    [JWC_SIGNIN_SIGNIN_CODE_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.signInCodeLoading = true;
    },
    [JWC_SIGNIN_SIGNIN_CODE_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.signInCodeLoading = false;
    },
    [JWC_SIGNIN_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.loading = true;
    },
    [JWC_SIGNIN_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.loading = false;
    },
    [JWC_SIGNIN_CODE]: (state, payload) => {
      const obj = state;
      obj.signInCodeInfo = payload.signInCodeInfo;
    },
    [JWC_SIGNIN]: (state, payload) => {
      const obj = state;
      obj.studentInfo = payload.studentInfo;
      obj.signInSuccess = true;
    },
  },
  actions: {
    // 获取singnin code
    async [JWC_SIGNIN_CODE]({ commit }) {
      commit({
        type: JWC_SIGNIN_SIGNIN_CODE_LOADING_TRUE,
      });
      GET({
        url: API.schoolService.jwc.verifyCode,
        success: (res) => {
          if (!res.data.errno) {
            commit({
              type: JWC_SIGNIN_CODE,
              signInCodeInfo: res.data.data,
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
            type: JWC_SIGNIN_SIGNIN_CODE_LOADING_FALSE,
          });
        },
      });
    },

    // 登录教务管理系统
    async [JWC_SIGNIN]({ commit, state, dispatch }, { payload }) {
      commit({
        type: JWC_SIGNIN_LOADING_TRUE,
      });
      POST({
        url: API.schoolService.jwc.signIn,
        data: {
          studentId: payload.studentId,
          password: payload.password,
          verifyCode: payload.verifyCode,
          cookie: state.signInCodeInfo.cookie,
          viewstate: state.signInCodeInfo.viewstate,
        },
        success: (res) => {
          if (!res.data.errno && res.data.data.loginSuccess) {
            // 登录成功之后、允许记录，则记录用户名和密码
            // 成功登录之后，保存用户的登录信息
            if (payload.rememberInfoFlag) {
              wx.setStorage({
                key: 'jwcUserInfo',
                data: {
                  username: payload.studentId,
                  password: payload.password,
                },
                success() {
                },
              });
            }
            commit({
              type: JWC_SIGNIN,
              studentInfo: {
                studentId: res.data.data.studentId,
                cookie: res.data.data.cookie,
              },
            });
            payload.successCb();
          } else {
            wx.showToast({
              title: '登录失败，验证码或密码错误',
              icon: 'none',
            });
            // 由于登录一次之后验证码和cookie的对会失效，必须重新获取对
            dispatch({
              type: JWC_SIGNIN_CODE,
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
            type: JWC_SIGNIN_LOADING_FALSE,
          });
        },
      });
    },
  },
});

export default store;
