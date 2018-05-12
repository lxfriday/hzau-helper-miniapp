<template>
  <picker @change="handleChange" :range="range" class="picker">
    <div class="container">
      <div class="building_name">{{ itemName }}</div>
      <img src="/static/images/arrow_down_64x64.png">
    </div>
  </picker>
</template>

<script>
  /**
   * 选择
   * @time 2018/05/12
   * @author lxfriday
   */
  export default {
    props: {
      itemName: {
        type: String,
        required: true,
      },
      range: {
        type: Array,
        required: true,
      },
      handleChange: {
        type: Function,
        required: true,
      },
    },
  };
</script>

<style lang="less" scoped>
  .picker {
    flex: 1;
  }
  .container {
    display: flex;
    flex-wrap: nowrap;
    border-left: 1px solid #cccccc;
    position: relative;
    padding: 8px 5px;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .building_name {
      flex: 1;
      font-size: 14px;
    }

    img {
      width: 12px;
      height: 12px;
    }
  }
</style>
