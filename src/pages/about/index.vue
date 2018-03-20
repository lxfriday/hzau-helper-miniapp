<template>
  <div class="container">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>
    <div class="items-wrapper weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <div style="display: inline-block; vertical-align: middle">华中农业大学助手</div>
        </div>
        <div class="weui-cell__ft">V0.0.1</div>
      </div>
      <a href="/pages/author/author" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <div style="display: inline-block; vertical-align: middle">作者</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </a>
    </div>
  </div>
</template>

<script>
/**
 * 关于
 */
import card from '@/components/card';

export default {
  data() {
    return {
      userInfo: {},
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
              console.log(res.userInfo);
              this.userInfo = res.userInfo;
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
};
</script>

<style scoped>
 .container {
   padding: 200rpx 0;
 }

 .items-wrapper {
   flex: 1;
   margin-top: 50rpx;
 }

.userinfo {
  display: flex;
  width: 100%;
  height: 350rpx;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 180rpx;
  height: 180rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}
</style>
