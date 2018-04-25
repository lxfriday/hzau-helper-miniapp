<template>
  <div class="container">
    <div class="userinfo" @click="handlePressAvatar">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <span class="nickname">{{ userInfo.nickname }}</span>
    </div>
    <div class="items-wrapper weui-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <div style="display: inline-block; vertical-align: middle">华中农业大学助手</div>
        </div>
        <div class="weui-cell__ft">{{ versionInfo.version }}</div>
      </div>
      <a href="/pages/author/author" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <div style="display: inline-block; vertical-align: middle">作者</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </a>
      <div v-if="haveSignIn" class="weui-cell weui-cell_access" @click="handleSignOut">
        <div class="weui-cell__bd">
          <div style="display: inline-block; vertical-align: middle;color: orange">退出登录</div>
        </div>
      </div>
    </div>
    <div class="weui-footer weui-footer_fixed-bottom">
      <div class="weui-footer__text">{{ authorInfo.nickname }}</div>
      <div class="weui-footer__text">{{ authorInfo.email }}</div>
      <div class="weui-footer__text">{{ authorInfo.motto }}</div>
    </div>
  </div>
</template>

<script>
/**
 * 关于
 */
import CONFIG_VERSION from '../../config/version';
import AUTHOR_INFO from '../../config/authorInfo';
import store from './store';
import { USER_SIGNIN_FROM_LOCAL, USER_SIGNOUT } from '../../store/mutation-types';

export default {
  data() {
    return {
      isUserInfoAvailable: false, // 是否获取了用户的信息
      versionInfo: CONFIG_VERSION,

      authorInfo: AUTHOR_INFO,
    };
  },

  computed: {
    signInLoading() {
      return store.state.signInLoading;
    },
    signUpLoading() {
      return store.state.signUpLoading;
    },
    userInfo() {
      return store.state.userInfo;
    },
    haveSignIn() {
      return store.state.haveSignIn;
    },
  },

  methods: {
    handlePressAvatar() {
      if (!this.haveSignIn) {
        wx.navigateTo({
          url: '/pages/signin/signin',
        });
      }
    },
    handleSignOut() {
      store.dispatch({
        type: USER_SIGNOUT,
      });
    },
    getUserInfo() {
      store.dispatch({
        type: USER_SIGNIN_FROM_LOCAL,
      });
    },
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  },

  mounted() {
    // 如果没有获取到用户的信息，则显示其他内容
    // if (!this.isUserInfoAvailable) {
    //   this.userInfo = {
    //     avatarUrl: 'http://qiniu1.lxfriday.xyz/hzau-helper/crying-3.png',
    //     nickName: '匿名用户',
    //   };
    // }
  },
};
</script>

<style scoped lang="less">
 .container {
   .userinfo {
     display: flex;
     height: 68px;
     padding: 20px 16px 0;
     width: 100%;
     flex-direction: row;
     align-items: center;

     .userinfo-avatar {
       width: 68px;
       height: 68px;
       border-radius: 50%;
       border: 1px solid #ccc;
     }

     .nickname {
       color: #000;
       font-size: 18px;
       margin-left: 16px;
       font-weight: bold;
     }
   }
   .items-wrapper {
     flex: 1;
     margin-top: 25px;
   }
 }





</style>
