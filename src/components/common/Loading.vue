<template>
  <div class="container">
    <ball-pulse-loader :size="size" :color="color" />
  </div>
</template>

<script>
  import BallPulseLoader from 'mpvue-loading/src/loaders/ball-pulse';

  export default {
    props: {
      size: {
        type: Number,
        default: 10,
      },
      color: {
        type: String,
        default: '#006d33',
      },
    },
    components: {
      BallPulseLoader,
    },
  };
</script>

<style lang="less" scoped>
  .container {
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
