import Taro from '@tarojs/taro';
import {
  zizhuPaymentListService,
} from '../../services/API';

export default {
  namespace: 'zizhuPaymentList',
  state: {
    title: [
    ],
    record: [
    ],
  },
  effects: {
    * getZizhuPaymentListEffect(_, { put, call, select }) {
      const zizhuLogin = yield select(state => state.zizhuLogin);
      const result = yield call(zizhuPaymentListService, {
        PHPSESSIDStr: zizhuLogin.PHPSESSIDStr,
        headercsrf: zizhuLogin.headercsrf,
      });
      if(result && !result.errno) {
        const rdata = result.data;
        yield put({
          type: 'saveZizhuPaymentList',
          payload: {
            title: rdata.title,
            record: rdata.record,
          },
        });
      } else {
        Taro.showToast({
          title: '获取缴费历史信息失败',
          icon: 'none',
        });
      }
    },
  },
  reducers: {
    saveZizhuPaymentList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
