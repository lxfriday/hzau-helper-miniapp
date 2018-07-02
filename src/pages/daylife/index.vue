<template>
  <div class="container">
    <img src="/static/images/icecream1_128x128.png">
    <span>敬请期待</span>
  </div>
</template>

<script>
/**
 * 敬请期待
 */

export default {
  data() {
  },
  methods: {
  },

  created() {
  },
};
</script>

<style scoped lang="less">
 .container {
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;

   img {
     width: 50px;
     height: 50px;
   }
   span {
     margin-top: 20px;
     color: #666;
     font-size: 14px;
   }
 }
</style>
