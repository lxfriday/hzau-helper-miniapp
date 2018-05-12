import Vue from 'vue';
import Vuex from 'vuex';

import API from '../../config/api';
import { GET, POST } from '../../utils/request';
import {
  ELECTRIC_CHARGE_LOADING_TRUE,
  ELECTRIC_CHARGE_LOADING_FALSE,
  ELECTRIC_CHARGE_ALL_BUILDING_INFO,
  ELECTRIC_CHARGE_BUILDING_FLOOR_ROOM,
  ELECTRIC_CHARGE_ROOM_CHARGE,
  ELECTRIC_CHARGE_RESET,
  ELECTRIC_CHARGE_ROOM_CHARGE_AUTO,
} from '../../store/mutation-types';

Vue.use(Vuex);

const initialState = () => ({
  sourceBuildingInfo: [],
  sourceRoomInfo: [],
  roomChargeInfo: null,
  loading: false, // 是否正在加载数据
});

const store = new Vuex.Store({
  state: {
    ...initialState(),
  },
  mutations: {
    [ELECTRIC_CHARGE_LOADING_TRUE]: (state) => {
      const obj = state;
      obj.loading = true;
    },
    [ELECTRIC_CHARGE_LOADING_FALSE]: (state) => {
      const obj = state;
      obj.loading = false;
    },
    [ELECTRIC_CHARGE_ALL_BUILDING_INFO]: (state, payload) => {
      const obj = state;
      obj.sourceBuildingInfo = payload.sourceBuildingInfo;
    },
    [ELECTRIC_CHARGE_BUILDING_FLOOR_ROOM]: (state, payload) => {
      const obj = state;
      obj.sourceRoomInfo = payload.sourceRoomInfo;
    },
    [ELECTRIC_CHARGE_ROOM_CHARGE]: (state, payload) => {
      const obj = state;
      obj.roomChargeInfo = payload.roomChargeInfo;
    },
    [ELECTRIC_CHARGE_RESET]: (state) => {
      const obj = state;
      const initialStateData = initialState();
      Object.keys(initialStateData).forEach((key) => {
        obj[key] = initialStateData[key];
      });
    },
  },
  actions: {
    // 获取所有楼栋信息
    async [ELECTRIC_CHARGE_ALL_BUILDING_INFO]({ commit, state }) {
      // 正在加载的时候，不再继续加载，防止重复
      if (!state.loading) {
        commit({
          type: ELECTRIC_CHARGE_LOADING_TRUE,
        });
        GET({
          url: API.schoolService.electricCharge.allBuildingInfo,
          success: (res) => {
            if (!res.data.errno) {
              commit({
                type: ELECTRIC_CHARGE_ALL_BUILDING_INFO,
                sourceBuildingInfo: res.data.data,
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
              type: ELECTRIC_CHARGE_LOADING_FALSE,
            });
          },
        });
      }
    },

    // 获取某一楼层的所有宿舍信息
    async [ELECTRIC_CHARGE_BUILDING_FLOOR_ROOM]({ commit, state }, { payload }) {
      // 正在加载的时候，不再继续加载，防止重复
      if (!state.loading) {
        commit({
          type: ELECTRIC_CHARGE_LOADING_TRUE,
        });
        POST({
          url: API.schoolService.electricCharge.buildingFloorRoom,
          data: {
            buildingId: payload.buildingId,
            floor: payload.floor,
          },
          success: (res) => {
            if (!res.data.errno) {
              commit({
                type: ELECTRIC_CHARGE_BUILDING_FLOOR_ROOM,
                sourceRoomInfo: res.data.data,
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
              type: ELECTRIC_CHARGE_LOADING_FALSE,
            });
          },
        });
      }
    },

    // 查询某个宿舍的电费
    async [ELECTRIC_CHARGE_ROOM_CHARGE]({ commit, state }, { payload }) {
      // 正在加载的时候，不再继续加载，防止重复
      if (!state.loading) {
        commit({
          type: ELECTRIC_CHARGE_LOADING_TRUE,
        });
        POST({
          url: API.schoolService.electricCharge.roomCharge,
          data: {
            roomId: payload.roomId,
          },
          success: (res) => {
            if (!res.data.errno) {
              commit({
                type: ELECTRIC_CHARGE_ROOM_CHARGE,
                roomChargeInfo: res.data.data,
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
              type: ELECTRIC_CHARGE_LOADING_FALSE,
            });
          },
        });
      }
    },

    // 查询某个宿舍的电费
    async [ELECTRIC_CHARGE_ROOM_CHARGE_AUTO]({ commit, state }, { payload }) {
      commit({
        type: ELECTRIC_CHARGE_LOADING_TRUE,
      });
      POST({
        url: API.schoolService.electricCharge.roomCharge,
        data: {
          roomId: payload.roomId,
        },
        success: (res) => {
          if (!res.data.errno) {
            commit({
              type: ELECTRIC_CHARGE_ROOM_CHARGE,
              roomChargeInfo: res.data.data,
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
            type: ELECTRIC_CHARGE_LOADING_FALSE,
          });
        },
      });
    },
  },
});

export default store;
