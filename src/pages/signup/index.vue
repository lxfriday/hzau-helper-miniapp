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
            <input class="weui-input" v-model="nickname"/>
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">手机号</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="phone"/>
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">密码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" v-model="password"/>
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">验证码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="verifyCode"/>
          </div>
          <div class="weui-cell__ft">
            <div class="weui-vcode-btn">获取验证码</div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area bottom-submit-wrapper">
      <button class="weui-btn" type="primary" @click="submit" plain="true">注册</button>
    </div>
  </div>
</template>

<script>
  /**
   * 登录页面
   * @time 2018/04/12
   * @author lxfriday
   */
  export default {
    data() {
      return {
        avatarUrl: '', // 头像地址
        nickname: '', // 昵称
        phone: '',
        password: '',
        verifyCode: '',
      };
    },
    computed: {
      showAvatar() {
        return this.avatarUrl.length ? this.avatarUrl : '/static/images/avatar_200x200.png';
      },
    },
    methods: {
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
