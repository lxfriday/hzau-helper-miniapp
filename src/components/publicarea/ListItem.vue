<template>
  <div class="container">
    <!-- 顶部的头像用户名 -->
    <div class="header">
      <img :src="avatarUrl" class="avatar">
      <div class="header-right">
        <p class="nickname">{{ nickname }}</p>
        <p class="released-time">{{ releasedTime }}</p>
      </div>
    </div>
    <!-- 中间的文字的文字 -->
    <div class="center" @click="navigateToDetail">
      {{ showContentText }}
      <span v-if="showGoToDetailFlag" class="detail-text">详情</span>
    </div>
    <!-- 底部的图片列表 -->
    <div class="bottom">
      <div class="images-wrapper">
        <img class="bottom-image" v-for="(path, index) in images" :src="path" :key="index" @click="handlePreviewImage(index)" mode="aspectFill">
      </div>
    </div>
  </div>
</template>

<script>

  const contentLengthFlag = 70; // 超过70的字符的时候收起多余的字

  export default {
    props: {
      // 用户头像
      avatarUrl: {
        type: String,
        required: true,
      },
      // 用户的昵称
      nickname: {
        type: String,
        required: true,
      },
      // 发布的时间
      releasedTime: {
        type: String,
        required: true,
      },
      // 发布的主体文字内容
      content: {
        type: String,
        required: true,
      },
      // 附带的图片，是一个数组
      images: {
        type: Array,
      },
    },
    data() {
      return {
        avatarUrl: '',
        nickname: '',
        releasedTime: '',
        content: '',
        images: [],
        showGoToDetailFlag: false, //
      };
    },
    computed: {
      showContentText() {
        const text = this.$props.content;
        return text.length > contentLengthFlag ? `${text.substr(0, contentLengthFlag)}...` : text;
      },
    },
    methods: {
      handlePreviewImage(index) {
        wx.previewImage({
          current: this.images[index],
          urls: this.images,
        });
      },
      navigateToDetail() {
        wx.navigateTo({
          url: `/pages/publicareadetail/publicareadetail?info=${JSON.stringify(this.$props)}`,
        });
      },
    },
    created() {
      const text = this.$props.content;
      this.showGoToDetailFlag = text.length > contentLengthFlag; // 字数大于70的时候，会收起多余的字，要进入详情才能查看
    },
  };
</script>

<style scoped lang="less">
  .container {
    margin: 8px 0 0;
    padding: 10px 10px 20px;
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
      color: #555555;

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
