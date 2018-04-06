<template>
  <div class="container">
    folder1
  </div>
</template>

<script>
  /**
   * 公共区域的失物招领页面
   * @time 2018/04/07
   * @author lxfriday
   */
  export default {
    data() {
      return {
      };
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
  };
</script>

<style scoped lang="less">
</style>
