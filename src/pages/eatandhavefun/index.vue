<template>
  <scroll-view
    :style="'height: ' + scrollviewHeight + 'px'"
    :scroll-y="true"
    :lower-threshold="0"
    @scrolltolower="handleScrollToBottom">
    <div class="container">
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
   * 吃喝玩乐列表页面
   * @time 2018/04/11
   * @author lxfriday
   */
  import ListItem from '../../components/publicarea/ListItem';
  import LoadingComponent from '../../components/common/Loading';
  import {
    EATANDHAVEFUN_LIST,
    EATANDHAVEFUN_LIST_RESET,
  } from '../../store/mutation-types';
  import store from './store';

  export default {
    data() {
      return {
        scrollviewHeight: 0,
      };
    },
    components: {
      ListItem,
      LoadingComponent,
    },
    computed: {
      loading() {
        return store.state.loading;
      },
      listData() {
        return store.state.listData;
      },
    },
    methods: {
      handleScrollToBottom() {
        // 获取下一页
        store.dispatch({
          type: EATANDHAVEFUN_LIST,
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
    mounted() {
      this.getAvailableAreaHeight();
      store.dispatch({
        type: EATANDHAVEFUN_LIST,
      });
    },
    onUnload() {
      store.commit({
        type: EATANDHAVEFUN_LIST_RESET,
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
