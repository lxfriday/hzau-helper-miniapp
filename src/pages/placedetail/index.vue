<template>
  <div class="container">
    <div class="title-wrapper">
      <text class="title">
        {{ name }}
      </text>
    </div>
    <div class="intro-wrapper">
      <text class="intro">
        {{ introduction }}
      </text>
    </div>
    <div class="images-wrapper">
      <image v-for="(image, index) in images" :src="image" :key="index" @click="handlePreviewImage(index)" mode="aspectFill"></image>
    </div>
    <div class="mapnoti-wrapper">
      <text class="notitext">
        位置查看
      </text>
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

  .title-wrapper {
    border-left: 4px solid #006d33;
    padding-left: 5px;

    .title {
      font-weight: bold;
      font-size: 20px;
    }
  }

  .intro-wrapper {
    margin: 12px 0 20px;

    .intro {
      line-height: 22px;
    }
  }

  .images-wrapper {
    text-align: center;
    width: 100%;

    image{
      margin-top: 12px;
      width: 100%;
    }
  }

  .mapnoti-wrapper {
    margin: 10px 0;
    border-left: 3px solid #ff0000;
    padding-left: 5px;

    .notitext {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .map-wrapper {
    margin-top: 10px;

    map {
      width: 100%;
      height: 500px;
    }
  }
</style>
