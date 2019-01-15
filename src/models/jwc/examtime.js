import Taro from '@tarojs/taro';
import {
  jwcExamTimeService,
} from '../../services/API';

export default {
  namespace: 'jwcExamTime',
  state: {
    list: [],
    yearTerm: '',
  },
  effects: {
    * getExamTimeListEffect(_, { put, call, select }) {
      const jwcLogin = yield select(state => state.jwcLogin);
      const result = yield call(jwcExamTimeService, {
        studentId: jwcLogin.studentId,
        cookie: jwcLogin.cookie,
      });
      if(result && !result.errno) {
        const rdata = result.data;
        yield put({
          type: 'saveExamTimeListReducer',
          payload: {
            list: rdata.examInfo,
            yearTerm: rdata.yearTerm,
          },
        });
      } else {
        Taro.showToast({
          title: '获取等级考试信息失败',
          icon: 'none',
        });
      }
    },
  },
  reducers: {
    saveExamTimeListReducer(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
