<template>
  <div class="container">
    eat at hzau
    <div>
      {{ nickname }}
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      // 用户头衔
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
      };
    },
    methods: {
    },
    mounted() {
      this.nickName = this.$props.nickname;
    },
  };
</script>

<style scoped lang="less">
  .container {

  }
</style>
