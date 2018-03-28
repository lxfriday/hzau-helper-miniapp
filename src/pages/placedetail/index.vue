<template>
  <div class="container">
    <image v-for="(image, index) in images" :src="image" :key="index"></image>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        images: [],
        introduction: '',
        name: '',
      };
    },

    methods: {
    },

    created() {
    },

    mounted() {
      const {
        images,
        introduction,
        name,
      } = JSON.parse(this.$mp.query.info);
      wx.setNavigationBarTitle({
        title: name,
      });
      this.images = images;
      this.introduction = introduction;
      this.name = name;
    },
  };
</script>

<style scoped>

</style>
