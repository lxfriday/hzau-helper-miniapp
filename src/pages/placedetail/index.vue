<template>
  <div class="container">
    <div class="title">
      {{ name }}
    </div>
    <div class="intro-wrapper">
      {{ introduction }}
    </div>
    <div class="notitext">
      图片查看
    </div>
    <div class="images-wrapper">
      <image v-for="(image, index) in images" :src="image" :key="index" @click="handlePreviewImage(index)" mode="aspectFill"></image>
    </div>
    <div class="notitext">
      位置查看
    </div>
    <div class="map-wrapper">
      <map
        id="map"
        show-location
        :markers="markers"
        :longitude="locationInfo[1]"
        :latitude="locationInfo[0]">
      </map>
    </div>
  </div>
</template>

<script>
  import { getPlaceDetailMarker } from '../../config/placesInfo';

  export default {
    data() {
      return {
        images: [],
        introduction: '',
        name: '',
        locationInfo: [], // 该店的精确位置
        markers: [],
      };
    },

    methods: {
      handlePreviewImage(index) {
        // 点击图片的时候预览图片
        const images = this.images;
        wx.previewImage({
          current: images[index],
          urls: images,
        });
      },
    },

    mounted() {
      const {
        images,
        introduction,
        name,
        location,
      } = JSON.parse(this.$mp.query.info);
      wx.setNavigationBarTitle({
        title: name,
      });
      this.images = images;
      this.introduction = introduction;
      this.name = name;
      this.locationInfo = location;
      this.markers = getPlaceDetailMarker(location);
    },
  };
</script>

<style scoped lang="less">
  .container {
    padding: 8px 12px 30px;
    font-size: 16px;
  }

  .title {
    border-left: 4px solid #006d33;
    padding-left: 5px;
    font-weight: bold;
    font-size: 20px;
  }

  .intro-wrapper {
    margin: 12px 0 12px;
  }

  .images-wrapper {
    text-align: center;
    width: 100%;

    image{
      margin-top: 12px;
      width: 100%;
    }
  }

  .notitext {
    margin-top: 12px;
    font-weight: bold;
    font-size: 14px;
    border-left: 3px solid #ff0000;
    padding-left: 5px;
  }

  .map-wrapper {
    margin-top: 10px;

    map {
      width: 100%;
      height: 500px;
    }
  }
</style>
