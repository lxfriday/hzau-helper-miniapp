import Vue from 'vue';
import Vuex from 'vuex';

import API from '../../config/api';
import { POST } from '../../utils/request';
import {
  USER_SIGNIN_LOADING_TRUE,
  USER_SIGNUP_LOADING_TRUE,
  USER_SIGNIN_LOADING_FALSE,
  USER_SIGNUP_LOADING_FALSE,
  USER_SIGNIN,
  USER_SIGNUP,
  USER_SIGNOUT,
  USER_SIGNIN_FROM_LOCAL,
  USER_SIGNUP_SEND_VERIFYCODE,
} from '../../store/mutation-types';

Vue.use(Vuex);

// 没有登录的情况下，用户的初始数据
const notSignInUserInfo = () => ({
  token: '',
  nickname: '登录',
  avatarUrl: '/static/images/user_256x256.png',
  phone: '',
});


const initialState = () => ({
  signInLoading: false, // 登录的时候是否正在加载
  signUpLoading: false, // 注册的时候是否正在加载

  // 用户信息
  userInfo: {
    ...notSignInUserInfo(),
  }, // 广场列表数据
  haveSignIn: false, // 是否登录
});

const store = new Vuex.Store({
  state: {
    ...initialState(),
  },
  mutations: {
    [USER_SIGNIN_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.signInLoading = true;
    },
    [USER_SIGNIN_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.signInLoading = false;
    },
    [USER_SIGNUP_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.signUpLoading = true;
    },
    [USER_SIGNUP_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.signUpLoading = false;
    },
    [USER_SIGNIN]: (state, { payload }) => {
      const obj = state;
      obj.haveSignIn = true;
      obj.userInfo = {
        token: payload.token,
        nickname: payload.nickname,
        avatarUrl: payload.avatarUrl,
        phone: payload.phone,
      };
    },
    [USER_SIGNOUT]: (state) => {
      const obj = state;
      const initialStateData = initialState();
      Object.keys(initialStateData).forEach((key) => {
        obj[key] = initialStateData[key];
      });
    },
    [USER_SIGNUP]: (state, { payload }) => {
      const obj = state;
      obj.haveSignIn = true;
      obj.userInfo = {
        token: payload.token,
        nickname: payload.nickname,
        avatarUrl: payload.avatarUrl,
        phone: payload.phone,
      };
    },
  },
  actions: {
    async [USER_SIGNIN]({ commit, state }, { payload }) {
      // 如果已经处于加载状态，则点击按钮不会有效果
      if (!state.signInLoading) {
        commit({
          type: USER_SIGNIN_LOADING_TRUE,
        });
        POST({
          url: API.user.signIn,
          data: {
            phone: payload.phone,
            password: payload.password,
          },
          success: (res) => {
            if (!res.data.errno) {
              const userData = res.data.data;
              commit({
                type: USER_SIGNIN,
                payload: {
                  ...userData,
                },
              });
              // 登录成功了，则把数据存储在本地一份
              // 用户信息
              wx.setStorage({
                key: 'user',
                data: {
                  userInfo: {
                    token: userData.token,
                    nickname: userData.nickname,
                    avatarUrl: userData.avatarUrl,
                    phone: userData.phone,
                  },
                  haveSignIn: true,
                },
                success() {
                  console.log('user 存储成功');
                },
              });
              // 返回上个页面
              wx.navigateBack();
              wx.showToast({
                title: '登录成功',
                icon: 'none',
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
              type: USER_SIGNIN_LOADING_FALSE,
            });
          },
        });
      }
    },

    // 用户进入app的时候，从本地获取用户信息，如果能获取到并且登陆了，则将本地数据放到store中
    async [USER_SIGNIN_FROM_LOCAL]({ commit }) {
      wx.getStorage({
        key: 'user',
        success(res) {
          // console.log(res);
          commit({
            type: USER_SIGNIN,
            payload: {
              ...res.data.userInfo,
            },
          });
        },
        fail(err) {
          // 用户之前没有登录过，则获取user这个key对应的数据会调用fail回调
          console.log('用户没有登录或者注册过', err);
        },
      });
    },

    // 用户退出登录
    async [USER_SIGNOUT]({ commit }) {
      wx.removeStorage({
        key: 'user',
      });
      commit({
        type: USER_SIGNOUT,
      });
    },

    // 用户注册的时候发送验证码
    async [USER_SIGNUP_SEND_VERIFYCODE]({ commit }, { payload }) {
      POST({
        url: API.user.getVerifyCode,
        data: {
          phone: payload.phone,
        },
        success: (res) => {
          if (!res.data.errno) {
            wx.showToast({
              title: '验证码已发送',
              icon: 'success',
            });
            payload.cb();
          } else {
            wx.showToast({
              title: res.data.errmsg,
              icon: 'none',
            });
          }
        },
      });
    },

    async [USER_SIGNUP]({ commit, state }, { payload }) {
      // 如果已经处于加载状态，则点击按钮不会有效果
      if (!state.signUpLoading) {
        commit({
          type: USER_SIGNUP_LOADING_TRUE,
        });
        POST({
          url: API.user.signUp,
          data: {
            phone: payload.phone,
            password: payload.password,
            nickname: payload.nickname,
            avatarUrl: payload.avatarUrl,
            verifyCode: payload.verifyCode,
          },
          success: (res) => {
            if (!res.data.errno) {
              const userData = res.data.data;
              commit({
                type: USER_SIGNUP,
                payload: {
                  ...userData,
                },
              });
              // 登录成功了，则把数据存储在本地一份
              // 用户信息
              wx.setStorage({
                key: 'user',
                data: {
                  userInfo: {
                    token: userData.token,
                    nickname: userData.nickname,
                    avatarUrl: userData.avatarUrl,
                    phone: userData.phone,
                  },
                  haveSignIn: true,
                },
                success() {
                  console.log('user 存储成功');
                },
              });
              // 返回上个页面
              wx.navigateBack({
                delta: 2,
              });
              wx.showToast({
                title: '注册成功',
                icon: 'none',
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
              type: USER_SIGNUP_LOADING_FALSE,
            });
          },
        });
      }
    },
  },
});

export default store;
