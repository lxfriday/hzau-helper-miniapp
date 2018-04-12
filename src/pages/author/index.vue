<template>
  <div class="container">
    <div class="backimage">
      <img :src="authorInfo.backImage" mode="aspectFill">
    </div>
    <div class="info-wrapper">
      <div class="center-wrapper">
        <div class="avatar-wrapper">
          <img :src="authorInfo.avatarUrl" mode="aspectFill">
        </div>
        <div class="nickname">{{ authorInfo.nickname }}</div>
        <div class="motto">{{ authorInfo.motto }}</div>
      </div>
      <div class="bottom-wrapper">
        <div>
          <div class="bottom-item-wrapper" @click="copyEmail">
            <img src="/static/images/email_64x64.png" mode="aspectFit">
            <div class="text">{{ authorInfo.email }}</div>
          </div>
          <div class="bottom-item-wrapper">
            <img src="/static/images/gitee.jpg" mode="aspectFit">
            <div class="text">{{ authorInfo.gitee }}</div>
          </div>
          <div class="bottom-item-wrapper">
            <img src="/static/images/github_64x64.png" mode="aspectFit">
            <div class="text">{{ authorInfo.github }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 关于作者页面
 */
import AUTHOR_INFO from '../../config/authorInfo';

export default {
  data() {
    return {
      authorInfo: AUTHOR_INFO,
    };
  },

  methods: {
    // 点击邮箱，复制到剪贴板
    copyEmail() {
      wx.setClipboardData({
        data: this.authorInfo.email,
        success() {
          wx.showToast({
            title: '复制成功',
          });
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
 .container {
   position: relative;
   .backimage {
     img {
       filter: blur(4px);
       width: 100%;
       height: 220px;
     }
   }
   .info-wrapper {
     position: relative;
     top: -52px;
     .center-wrapper {
       text-align: center;
       .avatar-wrapper {
         img {
           border: 2px solid #ffffff;
           width: 100px;
           height: 100px;
           border-radius: 50%;
         }
       }
       .nickname {
         font-size: 18px;
         font-weight: bold;
         color: #000000;
       }
       .motto {
         font-size: 14px;
         color: #aaaaaa;
       }
     }
     .bottom-wrapper {
       margin-top: 30px;
       display: flex;
       justify-content: center;
       &>div {
         display: flex;
         flex-direction: column;
         align-items: flex-start;

         .bottom-item-wrapper {
           display: flex;
           padding: 8px 12px;
           justify-content: center;
           align-items: center;
           img {
             width: 20px;
             height: 20px;
           }
           .text {
             margin-left: 16px;
             font-size: 14px;
           }
         }
       }
     }
   }
 }
</style>
