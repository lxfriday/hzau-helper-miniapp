import Taro from '@tarojs/taro';
import {
  zizhuNormalInfoService,
} from '../../services/API';

export default {
  namespace: 'zizhuNormalInfo',
  state: {
    userInfo: [
    ],
    onlineInfo: [
    ],
    productInfo: [
    ],
  },
  effects: {
    * getZizhuNormalInfoEffect(_, { put, call, select }) {
      const zizhuLogin = yield select(state => state.zizhuLogin);
      const result = yield call(zizhuNormalInfoService, {
        PHPSESSIDStr: zizhuLogin.PHPSESSIDStr,
        headercsrf: zizhuLogin.headercsrf,
      });
      if(result && !result.errno) {
        const rdata = result.data;
        console.log(rdata);
        yield put({
          type: 'saveZizhuNormalInfo',
          payload: {
            userInfo: rdata.userInfo,
            onlineInfo: rdata.onlineInfo,
            productInfo: rdata.productInfo,
          },
        });
      } else {
        Taro.showToast({
          title: '获取网费信息失败',
          icon: 'none',
        });
      }
    },
  },
  reducers: {
    saveZizhuNormalInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
