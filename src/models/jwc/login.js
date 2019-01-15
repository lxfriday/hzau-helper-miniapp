import Taro from '@tarojs/taro';
import {
  jwcVerifyCodeService,
  jwcLoginService,
} from '../../services/API';
import storage from '../../utils/storage';

export default {
  namespace: 'jwcLogin',
  state: {
    // 登录时候需要的相关信息
    cookie: '',
    img: '',
    viewstate: '',
    studentId: '',
    haveSignIn: false, // 是否已经登录了
  },
  effects: {
    * getVerifyCodeEffect(_, { put, call }) {
      const result = yield call(jwcVerifyCodeService);
      if(result && !result.errno) {
        const rdata = result.data;
        yield put({
          type: 'saveVerifyCode',
          payload: {
            cookie: rdata.cookie,
            img: rdata.img,
            viewstate: rdata.viewstate,
          },
        });
      } else {
        Taro.showToast({
          title: '验证码获取失败',
          icon: 'none',
        });
      }
    },
    * loginEffect({ payload: { data } }, { put, call, select }) {
      const jwcLogin = yield select(state => state.jwcLogin);
      const userInfo = {
        studentId: data.username,
        password: data.password,
      };
      const result = yield call(jwcLoginService, {
        ...userInfo,
        verifyCode: data.verifyCode,
        cookie: jwcLogin.cookie,
        viewstate: jwcLogin.viewstate,
      });

      if(result && !result.errno && result.data.loginSuccess) {
        const rdata = result.data;
        yield put({
          type: 'saveVerifyCode',
          payload: {
            cookie: rdata.cookie,
            studentId: rdata.studentId,
            haveSignIn: rdata.loginSuccess,
          },
        });
        // 登录成功之后页面重定向，显示数据
        Taro.redirectTo({
          url: data.redirectUrl,
        });
        if (data.saveInfo) {
          Taro.setStorage({
            key: storage.jwc,
            data: userInfo,
          });
        }
      } else {
        // 登录失败，则刷新验证码等校验信息
        yield put({
          type: 'getVerifyCodeEffect',
        });
        Taro.showToast({
          title: '用户名、密码、验证码错误',
          icon: 'none',
        });
      }
    },
  },
  reducers: {
    saveVerifyCode(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
