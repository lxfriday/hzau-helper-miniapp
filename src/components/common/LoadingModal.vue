<template>
  <div class="container">
    <ball-pulse-loader :size="10" color="#006d33" />
  </div>
</template>

<script>
  import BallPulseLoader from 'mpvue-loading/src/loaders/ball-pulse';

  export default {
    components: {
      BallPulseLoader,
    },
  };
</script>

<style lang="less" scoped>
  .container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    overflow: hidden;
    outline: 0;
    background-color: rgba(0,0,0,.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
