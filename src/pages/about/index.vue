<template>
  <div class="container">
    <div class="items-wrapper weui-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <div style="display: inline-block; vertical-align: middle">华中农业大学助手</div>
        </div>
        <div class="weui-cell__ft">{{ versionInfo.version }}</div>
      </div>
    </div>
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
   .userinfo {
     display: flex;
     height: 68px;
     padding: 20px 16px 0;
     flex-direction: row;
     align-items: center;

     .userinfo-avatar {
       width: 68px;
       height: 68px;
       border-radius: 50%;
       border: 1px solid #ccc;
     }

     .nickname {
       color: #000;
       font-size: 18px;
       margin-left: 16px;
       font-weight: bold;
     }
   }
   .items-wrapper {
     flex: 1;
     margin-top: 25px;
   }
 }
</style>
