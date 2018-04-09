<template>
  <div class="container">
    <!-- 顶部的头像用户名 -->
    <div class="header">
      <img :src="item.avatarUrl" class="avatar">
      <div class="header-right">
        <p class="nickname">{{ item.nickname }}</p>
        <p class="released-time">{{ item.releasedTime }}</p>
      </div>
    </div>
    <!-- 中间的文字的文字 -->
    <div class="center">
      {{ item.content }}
    </div>
    <!-- 底部的图片列表 -->
    <div class="bottom">
      <div class="images-wrapper">
        <img class="bottom-image" v-for="(path, index) in item.images" :src="path" :key="index" @click="handlePreviewImage(index)" mode="aspectFill">
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 广场列表的详情
   * @time 2018/04/09
   * @author lxfriday
   */
  import ListItem from '../../components/publicarea/ListItem';

  export default {
    data() {
      return {
        item: {},
      };
    },

    components: {
      ListItem,
    },

    methods: {
      handlePreviewImage(index) {
        wx.previewImage({
          current: this.item.images[index],
          urls: this.item.images,
        });
      },
    },

    beforeMount() {
      this.item = JSON.parse(this.$mp.query.info);
    },
  };
</script>

<style scoped lang="less">
  .container {
    margin: 8px 0 0;
    padding: 10px;
    background-color: #ffffff;

    .header {
      display: flex;

      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 1px solid #dddddd;
      }

      .header-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 12px;
        font-size: 15px;
        color: #666666;

        .nickname {
          font-size: 16px;
          color: #111111;
        }
      }
    }
    .center {
      margin-top: 8px;
      font-size: 16px;

      .detail-text {
        display: inline;
        color: #6666ff;
      }
    }
    .bottom {
      margin-top: 8px;
      .images-wrapper {
        display: flex;
        flex-wrap: wrap;

        .bottom-image {
          margin-top: 2px;
          width: 31vw;
          height: 31vw;
          margin-right: 2px;
        }
        img:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
</style>
