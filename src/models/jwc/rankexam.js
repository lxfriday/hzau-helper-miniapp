import Taro from '@tarojs/taro';
import {
  jwcRankExamService,
} from '../../services/API';

export default {
  namespace: 'jwcRankExam',
  state: {
    list: [],
  },
  effects: {
    * getRankExamListEffect(_, { put, call, select }) {
      const jwcLogin = yield select(state => state.jwcLogin);
      const result = yield call(jwcRankExamService, {
        studentId: jwcLogin.studentId,
        cookie: jwcLogin.cookie,
      });
      if(result && !result.errno) {
        const rdata = result.data;
        yield put({
          type: 'saveRankExamListReducer',
          payload: {
            list: rdata,
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
    saveRankExamListReducer(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
