<template>
  <div class="container">
    <div class="top-wrapper">
      <image
        class="top-image"
        mode="aspectFill"
        src="/static/images/publicarea/image4.jpg">
      </image>
      <div class="top-content">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        <div class="tab-wrapper">
          <div class="tab">
            <a href="/pages/lostandfound/lostandfound">失物招领</a>
          </div>
          <div class="tab">
            <a href="/pages/eatandhavefun/eatandhavefun">吃喝玩乐</a>
          </div>
        </div>
      </div>
    </div>
    <div class="list-wrapper">
      <list-item></list-item>
      <list-item></list-item>
      <list-item></list-item>
      <list-item></list-item>
      <list-item></list-item>
      <list-item></list-item>
    </div>
  </div>
</template>

<script>
  /**
   * 公共区域的index页面，默认获取新鲜事列表
   * @time 2018/04/07
   * @author lxfriday
   */
  import ListItem from '../../components/publicarea/ListItem';

  export default {
    data() {
      return {
        isUserInfoAvailable: false, // 是否获取了用户的信息
        userInfo: {},
      };
    },

    components: {
      ListItem,
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

<style scoped lang="less">
  .top-wrapper {
    position: relative;
    width: 100%;
    height: 190px;

    .top-image {
      width: 100%;
      height: 190px;
      opacity: .93;
    }

    .top-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .userinfo-avatar {
        width: 75px;
        height: 75px;
        margin: 25px;
        border-radius: 50%;
      }

      .tab-wrapper {
        width: 100%;
        display: flex;
        background-color: rgba(255,255,255,.25);

        .tab {
          flex: 1;
          padding: 5px 0;
          text-align: center;

          a {
            flex: 1;
            color: #ffffff;
            font-size: 18px;
            font-weight: 500;
          }
        }
      }
    }
  }


</style>
