<template>
  <div class="container">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickname"></card>
      </div>
    </div>
    <div class="items-wrapper weui-cells weui-cells_after-title">
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
import card from '@/components/card';
import CONFIG_VERSION from '../../config/version';
import AUTHOR_INFO from '../../config/authorInfo';

export default {
  data() {
    return {
      isUserInfoAvailable: false, // 是否获取了用户的信息
      userInfo: {},
      versionInfo: CONFIG_VERSION,

      authorInfo: AUTHOR_INFO,
    };
  },

  components: {
    card,
  },

  methods: {
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo;
              this.isUserInfoAvailable = true;
            },
          });
        },
      });
    },
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  },

  mounted() {
    // 如果没有获取到用户的信息，则显示其他内容
    if (!this.isUserInfoAvailable) {
      this.userInfo = {
        avatarUrl: 'http://qiniu1.lxfriday.xyz/hzau-helper/crying-3.png',
        nickName: '匿名用户',
      };
    }
  },
};
</script>

<style scoped>
 .container {
   padding: 100px 0;
 }

 .items-wrapper {
   flex: 1;
   margin-top: 25px;
 }

.userinfo {
  display: flex;
  width: 100%;
  height: 175px;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 90px;
  height: 90px;
  margin: 10px;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}
</style>
