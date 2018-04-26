<template>
  <div class="container">
    <div class="avatar-wrapper">
      <img :src="showAvatar" class="avatar">
    </div>
    <div class="input-area">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">昵称</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="nickname" maxlength="15" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">手机号</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="phone" maxlength="11"/>
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">密码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" v-model="password" maxlength="18"/>
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">确认密码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" v-model="confirmPassword" maxlength="18"/>
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">验证码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="verifyCode" maxlength="4"/>
          </div>
          <div class="weui-cell__ft" @click="handleSendVerifyCode">
            <div class="weui-vcode-btn">{{ showGetVerifyCode ? '获取验证码' : count }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area bottom-submit-wrapper">
      <button class="weui-btn" type="primary" @click="submit" plain="true">{{signUpLoading? '注册中': '注册'}}</button>
    </div>
  </div>
</template>

<script>
  /**
   * 登录页面
   * @time 2018/04/12
   * @author lxfriday
   */
  import store from '../about/store';
  import { USER_SIGNUP_SEND_VERIFYCODE, USER_SIGNUP } from '../../store/mutation-types';
  import {
    checkPhone,
    checkPassword,
    checkVerifyCode,
    checkNickname,
    checkAvatarUrl,
    checkConfirmPassword,
  } from '../../utils/checkUserInfo';


  export default {
    data() {
      return {
        avatarUrl: '', // 头像地址
        nickname: '', // 昵称
        phone: '',
        password: '',
        confirmPassword: '', // 确认密码
        verifyCode: '',

        showGetVerifyCode: true,
        count: 0,
        timer: null,
      };
    },
    computed: {
      showAvatar() {
        return this.avatarUrl.length ? this.avatarUrl : '/static/images/avatar_200x200.png';
      },
      signUpLoading() {
        return store.state.signUpLoading;
      },
    },
    methods: {
      countDown() {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.showGetVerifyCode = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.showGetVerifyCode = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      },
      handleSendVerifyCode() {
        const that = this;
        const nickname = this.nickname;
        const phone = this.phone;
        if (this.count === 0) {
          if (checkNickname(nickname) && checkPhone(phone)) {
            store.dispatch({
              type: USER_SIGNUP_SEND_VERIFYCODE,
              payload: {
                phone,
                cb: that.countDown,
              },
            });
          }
        }
      },
      // 点击注册按钮
      submit() {
        const {
          avatarUrl,
          nickname,
          phone,
          password,
          confirmPassword,
          verifyCode,
        } = this;

        if (checkPassword(password) &&
            checkConfirmPassword(confirmPassword, password) &&
            checkAvatarUrl(avatarUrl) &&
            checkNickname(nickname) &&
            checkPhone(phone) &&
            checkVerifyCode(verifyCode)) {
          if (!this.signUpLoading) {
            store.dispatch({
              type: USER_SIGNUP,
              payload: {
                avatarUrl,
                nickname,
                phone,
                password,
                verifyCode,
              },
            });
          }
        }
      },
      // 获取微信用户的头像，默认使用微信用户的头像
      getWXUserAvatar() {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                this.avatarUrl = res.userInfo.avatarUrl;
              },
            });
          },
        });
      },
    },
    mounted() {
      this.getWXUserAvatar();
    },
    onUnload() {
      // 退出页面的时候，复原原有的值
      // this.$options.data() 重新调用data函数返回的数据值
      Object.assign(this.$data, this.$options.data());
    },
  };
</script>

<style scoped lang="less">
  .container {
    .avatar-wrapper {
      margin: 40px;
      text-align: center;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .bottom-submit-wrapper {
      margin-top: 50px;
    }
  }
</style>
