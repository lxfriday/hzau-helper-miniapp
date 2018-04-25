<template>
  <div class="container">
    <div class="logo-wrapper">
      <img src="/static/images/hzaulogo.jpg" class="logo">
    </div>
    <div class="input-area">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">手机号</div>
          </div>
          <div class="weui-cell__bd">
            <!-- 手机号位11位 -->
            <input class="weui-input" maxlength="11" v-model="phone" type="text" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">密码</div>
          </div>
          <div class="weui-cell__bd">
            <!-- 最长18位 -->
            <input class="weui-input" maxlength="18"  v-model="password" type="password" />
          </div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area bottom-submit-wrapper">
      <button class="weui-btn" type="primary" @click="submit" plain="true">{{ signInLoading? '登录中' : '登录' }}</button>
    </div>
    <div class="goto-signup">
      <!--<span @click="navigateToSignUp">前往注册</span>-->
      <span @click="navigateToSignUp">前往注册</span>
    </div>
  </div>
</template>

<script>
  /**
   * 登录页面
   * @time 2018/04/12
   * @author lxfriday
   */
  import { checkPhone, checkPassword } from '../../utils/checkUserInfo';
  import store from '../about/store';
  import { USER_SIGNIN } from '../../store/mutation-types';

  export default {
    data() {
      return {
        phone: '',
        password: '',
      };
    },

    computed: {
      signInLoading() {
        return store.state.signInLoading;
      },
    },

    methods: {
      navigateToSignUp() {
        wx.navigateTo({
          url: '/pages/signup/signup',
        });
      },
      submit() {
        if (!this.signInLoading) {
          if (checkPhone(this.phone) && checkPassword(this.password)) {
            store.dispatch({
              type: USER_SIGNIN,
              payload: {
                phone: this.phone,
                password: this.password,
              },
            });
          }
        }
      },
    },
  };
</script>

<style scoped lang="less">
  .container {
    .logo-wrapper {
      margin: 40px;
      text-align: center;
      .logo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .bottom-submit-wrapper {
      margin-top: 50px;
    }
    .goto-signup {
      margin-top: 5px;
      margin-right: 20px;
      text-align: right;

      span {
        padding: 5px;
        font-size: 16px;
        color: #aaaaaa;
      }
    }
  }
</style>
