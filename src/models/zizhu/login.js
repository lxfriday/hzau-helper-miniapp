import Taro from '@tarojs/taro';
import {
  zizhuSignInCodeService,
  zizhuSignInService,
} from '../../services/API';
import storage from '../../utils/storage';

export default {
  namespace: 'zizhuLogin',
  state: {
    PHPSESSIDStr: '', // cookie 的 PHPSESSID
    img: '', // 验证码的 base64 数据
    headercsrf: '', // 头部cookie的 _csrf=xxx
    formcsrf: '', // 表单中的 _csrf=xxx
    studentId: '', // 学号

    haveSignIn: false, // 是否已经登录了
  },
  effects: {
    * getZizhuSignInCodeEffect(_, { put, call }) {
      const result = yield call(zizhuSignInCodeService);
      if(result && !result.errno) {
        const rdata = result.data;

        yield put({
          type: 'saveZizhuSignInCode',
          payload: {
            PHPSESSIDStr: rdata.PHPSESSIDStr,
            img: rdata.img,
            headercsrf: rdata.headercsrf,
            formcsrf: rdata.formcsrf,
          },
        });
      } else {
        Taro.showToast({
          title: '验证码获取失败',
          icon: 'none',
        });
      }
    },
    * zizhuSignInEffect({ payload: { data } }, { put, call, select }) {
      const zizhuLogin = yield select(state => state.zizhuLogin);
      const userInfo = {
        studentId: data.username,
        password: data.password,
      };
      const result = yield call(zizhuSignInService, {
        ...userInfo,
        verifyCode: data.verifyCode,
        PHPSESSIDStr: zizhuLogin.PHPSESSIDStr,
        headercsrf: zizhuLogin.headercsrf,
        formcsrf: zizhuLogin.formcsrf,
      });

      if(result && !result.errno && result.data.loginSuccess) {
        const rdata = result.data;

        yield put({
          type: 'saveSignInData',
          payload: {
            PHPSESSIDStr: rdata.newPHPSESSIDStr,
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
            key: storage.zizhu,
            data: userInfo,
          });
        }
      } else {
        // 登录失败，则刷新验证码等校验信息
        yield put({
          type: 'saveZizhuSignInCode',
        });
        Taro.showToast({
          title: '用户名、密码、验证码错误',
          icon: 'none',
        });
      }
    },
  },
  reducers: {
    saveSignInData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveZizhuSignInCode(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
