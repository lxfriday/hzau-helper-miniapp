<template>
  <div class="notitext" :style="'border-color:' + borderColor">
    {{ text }}
  </div>
</template>

<script>
  /**
   * 特色的侧边提示条
   * @time 2018/04/11
   * @author lxfriday
   */
  export default {
    props: {
      // 侧边的颜色
      borderColor: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped lang="less">
  .notitext {
    font-weight: bold;
    font-size: 14px;
    border-left: 3px solid #cccccc;
    padding-left: 5px;
  }
</style>
