
import Taro from '@tarojs/taro';
import {
  dormitoryElectricChargeAllBuildingInfoService,
  dormitoryElectricChargeBuildingFloorRoomService,
  dormitoryElectricChargeRoomChargeService,
} from '../../services/API';

export default {
  namespace: 'dormitoryElectricity',
  state: {
    sourceBuildingInfo: [],
    sourceRoomInfo: [],

    roomChargeInfo: null,
    // roomChargeInfo: {
    //   lastTime: '2019-01-15 13:41', // 最后一次抄表时间
    //   available: '147.64', // 可用电量
    // },
  },
  effects: {
    * getBuildingListEffect(_, { put, call }) {
      const result = yield call(dormitoryElectricChargeAllBuildingInfoService);
      if(result && !result.errno) {
        const rdata = result.data;
        yield put({
          type: 'saveBuildingList',
          payload: {
            sourceBuildingInfo: rdata,
          },
        });
      } else {
        Taro.showToast({
          title: '获取楼栋信息失败',
          icon: 'none',
        });
      }
    },
    * getFloorRoomListEffects({ payload: { data } }, { put, call }) {
      const info = {
        buildingId: data.buildingId,
        floor: data.floor,
      };
      const result = yield call(dormitoryElectricChargeBuildingFloorRoomService, info);
      if(result && !result.errno) {
        const rdata = result.data;
        yield put({
          type: 'saveFloorRoomList',
          payload: {
            sourceRoomInfo: rdata,
          },
        });
      } else {
        Taro.showToast({
          title: '获取楼层房间信息失败',
          icon: 'none',
        });
      }
    },
    * getRoomChargeEffects({ payload: { data } }, { put, call }) {
      const info = {
        roomId: data.roomId,
      };
      const result = yield call(dormitoryElectricChargeRoomChargeService, info);
      if(result && !result.errno) {
        const rdata = result.data;
        yield put({
          type: 'saveRoomCharge',
          payload: {
            roomChargeInfo: rdata,
          },
        });
      } else {
        Taro.showToast({
          title: '获取宿舍电量信息失败',
          icon: 'none',
        });
      }
    },
  },
  reducers: {
    saveBuildingList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveFloorRoomList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveRoomCharge(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
