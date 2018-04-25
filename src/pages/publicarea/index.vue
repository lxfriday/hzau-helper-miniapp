<template>
  <scroll-view
    :style="'height: ' + scrollviewHeight + 'px'"
    :scroll-y="true"
    :lower-threshold="0"
    @scrolltolower="handleScrollToBottom"
    @scroll="handleScroll">
    <div class="container">
      <div class="release-button" @click="handleGoToSubmit">
        <img src="/static/images/add.png" class="release-img" >
      </div>
      <div class="top-wrapper">
        <img
          class="top-image"
          mode="aspectFill"
          src="/static/images/publicarea/image4.jpg">
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
        <list-item
          v-for="(item, index) in listData"
          :avatarUrl="item.avatarUrl"
          :nickname="item.nickname"
          :releasedTime="item.releasedTime"
          :content="item.content"
          :images="item.images"
          :key="index"/>
      </div>
      <LoadingComponent :show="loading" />
    </div>
  </scroll-view>
</template>


<script>
  /**
   * 公共区域的index页面，默认获取新鲜事列表
   * @time 2018/04/07
   * @author lxfriday
   */
  import ListItem from '../../components/publicarea/ListItem';
  import LoadingComponent from '../../components/common/Loading';
  import { PUBLICAREA_LIST } from '../../store/mutation-types';
  import store from './store';
  import userStore from '../about/store';

  export default {
    data() {
      return {
        scrollviewHeight: 0,
        isUserInfoAvailable: false, // 是否获取了用户的信息
        userInfo: {},
      };
    },

    computed: {
      loading() {
        return store.state.loading;
      },
      listData() {
        return store.state.listData;
      },
    },

    components: {
      ListItem,
      LoadingComponent,
    },

    methods: {
      handleGoToSubmit() {
        // 只有登录了，才能进入到发布动态的页面
        if (userStore.state.haveSignIn) {
          wx.navigateTo({
            url: '/pages/releasepublicinfo/releasepublicinfo',
          });
        } else {
          wx.showToast({
            title: '请登录后再进行动态发布',
            icon: 'none',
          });
        }
      },
      // 滚动到底部触发的回调
      handleScrollToBottom() {
        store.dispatch({
          type: PUBLICAREA_LIST,
        });
        // console.log(store);
      },
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
      // 获得可滚动区域的高度
      getAvailableAreaHeight() {
        const that = this;
        wx.getSystemInfo({
          success(res) {
            that.scrollviewHeight = res.windowHeight;
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

      this.getAvailableAreaHeight();

      // 开启加载
      store.dispatch({
        type: PUBLICAREA_LIST,
      });
    },

  };
</script>

<style scoped lang="less">
  .container {
    position: relative;
    .release-button {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 999;
      width: 45px;
      height: 45px;
      border-radius: 50%;

      .release-img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }

    .top-wrapper {
      position: relative;
      width: 100%;
      height: 220px;

      .top-image {
        width: 100%;
        height: 220px;
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
    .list-wrapper {
      background-color: #dddddd;
    }
  }
</style>
