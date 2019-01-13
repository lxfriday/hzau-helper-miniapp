import Taro from '@tarojs/taro';
import storage from '../utils/storage';
import routes from '../utils/routes';
import { PEGradeService } from '../services/API';

export default {
  namespace: 'pe',
  state: {
    lakeRun: {},
    PETest: [],
  },
  effects: {
    * getPEGradeEffect({ payload: { data } }, { call, put }) {
      const info = {
        cardID: data.cardID,
        password: data.password,
      };
      const result = yield call(PEGradeService, info);
      if(result && !result.errno && result.data.PETest.length) {
        const rdata = result.data;
        yield put({
          type: 'saveData',
          payload: {
            lakeRun: rdata.lakeRun,
            PETest: rdata.PETest,
          },
        });
        // 登录成功之后页面重定向，显示数据
        Taro.redirectTo({
          url: routes.pe.result,
        });
        if (data.saveInfo) {
          Taro.setStorage({
            key: storage.pe,
            data: info,
          });
        }
      } else {
        Taro.showToast({
          title: '用户名、密码错误或暂时没有数据',
          icon: 'none',
        });
      }
    },
  },
  reducers: {
    saveData(state, { payload }) {
      return {
        ...state,
        lakeRun: payload.lakeRun,
        PETest: payload.PETest,
      };
    },
  },
};
