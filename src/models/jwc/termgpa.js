import Taro from '@tarojs/taro';
import {
  jwcTermGPAService,
} from '../../services/API';

export default {
  namespace: 'jwcTermGPA',
  state: {
    list: [],
  },
  effects: {
    * getTermGPAListEffect(_, { put, call, select }) {
      const jwcLogin = yield select(state => state.jwcLogin);
      const result = yield call(jwcTermGPAService, {
        studentId: jwcLogin.studentId,
        cookie: jwcLogin.cookie,
      });
      if(result && !result.errno) {
        const rdata = result.data;
        yield put({
          type: 'saveTermGPAListReducer',
          payload: {
            list: rdata,
          },
        });
      } else {
        Taro.showToast({
          title: '获取考试成绩失败',
          icon: 'none',
        });
      }
    },
  },
  reducers: {
    saveTermGPAListReducer(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
