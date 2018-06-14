<template>
  <div class="container">
    <div class="input-area">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">学号</div>
          </div>
          <div class="weui-cell__bd">
            <!-- 手机号位11位 -->
            <input class="weui-input" maxlength="13" v-model="studentId" type="text" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">密码</div>
          </div>
          <div class="weui-cell__bd">
            <!-- 最长18位 -->
            <input class="weui-input" maxlength="30"  v-model="password" type="password" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">验证码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="verifyCode" placeholder="请输入验证码" maxlength="4" />
          </div>
          <div class="weui-cell__ft">
            <img @click="handleRefreshVerifyCode" class="weui-vcode-img" :src="verifyCodeImg" style="width: 108px;" />
          </div>
        </div>
      </div>
      <checkbox-group @click="handleClickRem">
        <label class="weui-agree">
          <div class="weui-agree__text">
            <checkbox class="weui-agree__checkbox" id="weuiAgree" value="agree" :checked="rememberInfoFlag" />
            <div class="weui-agree__checkbox-icon">
              <icon class="weui-agree__checkbox-icon-check" type="success_no_circle" size="9" v-if="rememberInfoFlag"></icon>
            </div>
            记住密码
          </div>
        </label>
      </checkbox-group>
    </div>
    <div class="weui-btn-area bottom-submit-wrapper">
      <button class="weui-btn" type="primary" @click="submit" plain="true">{{ signInLoading? '登录中' : '登录' }}</button>
    </div>
    <div class="noti">
      <span>使用教务管理系统的账号密码登录</span>
    </div>
    <loading-modal v-if="signInLoading || signInCodeLoading" />
  </div>
</template>

<script>
  /**
   * 学期考试地点时间信息查询
   * @time 2018/05/13
   * @author lxfriday
   */
  import LoadingModal from '../../components/common/LoadingModal';
  import jwcStore from './store';
  import {
    JWC_SIGNIN_CODE,
    JWC_SIGNIN,
  } from '../../store/mutation-types';

  export default {
    data() {
      return {
        studentId: '', // 学号
        password: '', // 密码
        verifyCode: '', // 验证码

        rememberInfoFlag: true,
      };
    },

    components: {
      LoadingModal,
    },

    computed: {
      verifyCodeImg() {
        return `data:image/png;base64,${jwcStore.state.signInCodeInfo.img}`;
      },
      signInLoading() {
        return jwcStore.state.loading;
      },
      signInCodeLoading() {
        return jwcStore.state.signInCodeLoading;
      },
    },

    methods: {
      // 记住用户名、密码
      handleClickRem() {
        // 点击了之后切换显示的状态
        this.rememberInfoFlag = !this.rememberInfoFlag;
      },
      // 登录
      submit() {
        const that = this;
        const {
          studentId,
          password,
          verifyCode,
          rememberInfoFlag,
        } = that;
        if (this.checkStudentId() && this.checkPassword() && this.checkVerifyCode()) {
          jwcStore.dispatch({
            type: JWC_SIGNIN,
            payload: {
              studentId,
              password,
              verifyCode,
              rememberInfoFlag,
              // 成功之后进行页面跳转
              successCb: () => {
                wx.redirectTo({
                  url: that.$mp.query.from,
                });
              },
            },
          });
        }
      },
      // 教研学号
      checkStudentId() {
        if (/^[0-9]{13}$/.test(this.studentId)) {
          return true;
        }
        wx.showToast({
          title: '学号格式不正确',
          icon: 'none',
        });
        return false;
      },
      // 校验密码
      checkPassword() {
        if (this.password.length > 3) {
          return true;
        }
        wx.showToast({
          title: '密码过短',
          icon: 'none',
        });
        return false;
      },
      // 校验验证码
      checkVerifyCode() {
        if (this.verifyCode.length === 4) {
          return true;
        }
        wx.showToast({
          title: '验证码为4位',
          icon: 'none',
        });
        return false;
      },
      // 点击验证码，对验证码进行刷新
      handleRefreshVerifyCode() {
        this.getSignInCode();
      },
      getSignInCode() {
        jwcStore.dispatch({
          type: JWC_SIGNIN_CODE,
        });
      },
      getStoredUserInfo() {
        const that = this;
        wx.getStorage({
          key: 'jwcUserInfo',
          success(res) {
            that.studentId = res.data.username;
            that.password = res.data.password;
          },
          fail() {
            // 之前没查询过，则在获取key的时候回获取失败
          },
        });
      },
    },

    mounted() {
      this.getSignInCode();
      // 存储用户保存的学号和密码
      this.getStoredUserInfo();
    },
  };
</script>

<style scoped lang="less">
  .container {


  .noti {
    margin: 5px auto;

    span {
      font-size: 16px;
      color: #aaaaaa;
    }
  }
  }

</style>
