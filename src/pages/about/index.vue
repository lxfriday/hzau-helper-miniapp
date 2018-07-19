<template>
  <div class="container">
    <div class="swiperWrapper page__bd page__bd_spacing">
      <swiper
        :indicator-dots="true"
        :autoplay="true"
        :interval="5000"
        :duration="1000"
        :circular="false">
        <div v-for="(item, index) in swiperImgs" :key="index">
          <swiper-item>
            <img :src="item" mode="aspectFill" class="slideImage" />
          </swiper-item>
        </div>
      </swiper>
    </div>
    <div class="itemsWrapper weui-cells">
      <a href="/pages/map/map" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">华农地图</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </a>
      <a href="/pages/places/places" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">华农特色地点</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </a>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <div style="display: inline-block; vertical-align: middle">华中农业大学助手</div>
        </div>
        <div class="weui-cell__ft">{{ versionInfo.version }}</div>
      </div>
    </div>
    <ad unit-id="adunit-6f0b186182c9a9c8"></ad>
    <div class="weui-footer weui-footer_fixed-bottom">
      <div class="weui-footer__text">联系方式</div>
      <div class="weui-footer__text">{{ author.email }}</div>
    </div>
  </div>
</template>

<script>
/**
 * 关于
 */
import CONFIG_VERSION from '../../config/version';
import CONFIG_AUTHOR from '../../config/authorInfo';

export default {
  data() {
    return {
      versionInfo: CONFIG_VERSION,
      author: CONFIG_AUTHOR,
      swiperImgs: [
        'http://qiniu1.lxfriday.xyz/hzauhelper/20180202170817.jpg', // 校庆宣传图，放置在我的个人仓库
        'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%A1%83%E8%8A%B1%E6%BA%9015222339995abb728f8d4ae.png',
        'http://qiniu1.lxfriday.xyz/hzau-helper/%E7%8B%AE%E5%AD%90%E5%B1%B1%E7%BB%BF%E9%81%9315222335485abb70ccf079d.png',
        'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%A8%B1%E8%8A%B1%E5%A4%A7%E9%81%9320180328185437.png',
        'http://qiniu1.lxfriday.xyz/hzau-helper/%E5%8D%97%E6%B9%96%E6%B2%BF%E5%B2%B815222226545abb463e897af.png',
        'http://qiniu1.lxfriday.xyz/hzau-helper/%E7%8B%AE%E5%AD%90%E5%B1%B1%E5%B9%BF%E5%9C%BA15222228955abb472f6b054.png',
        'http://qiniu1.lxfriday.xyz/hzau-helper/%E5%96%B7%E6%B0%B4%E6%B1%A015222228185abb46e2dd6d8.png',
        'http://qiniu1.lxfriday.xyz/hzau-helper/%E4%BA%9A%E8%B7%A815222342775abb73a5133ef.png',
      ],
    };
  },
  methods: {
  },

  created() {
  },
};
</script>

<style scoped lang="less">
 .container {
   .itemsWrapper {
     margin-top: 0;
     .getUserInfoButton {
       box-sizing: border-box;
       font-size: 16px;
       text-align: left;
       text-decoration: none;
       line-height: normal;
       border-radius: 0;
       -webkit-tap-highlight-color: transparent;
       overflow: hidden;
       background-color: #ffffff;

       &::after {
         border: 0;
       }
     }
   }
   .swiperWrapper {
     swiper {
       height: 220px;
     }
     .slideImage {
       width: 100%;
       height: 100%;
     }
   }
 }
</style>
