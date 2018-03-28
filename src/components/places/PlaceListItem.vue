<template>
  <div  @click="clickItem" class="item-wrapper">
    <image class="left-image" :src="imgPath" />
    <div class="right-wrapper">
      <text class="name">{{ name }}</text>
      <image class="type-image" :src="typeImage" />
    </div>
  </div>
</template>

<script>
  import { getPlaceTypeIcon } from '../../config/placesInfo';

  export default {
    props: {
      // 图片的路径
      imgPath: {
        type: String,
        required: true,
      },
      // 地点的名称
      name: {
        type: String,
        required: true,
      },
      // 地点的类型
      type: {
        type: String,
        required: true,
      },
      // 包含的数据
      info: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        typeImage: getPlaceTypeIcon(),
      };
    },
    methods: {
      clickItem() {
        const {
          info,
        } = this.$props;
        wx.navigateTo({
          url: `/pages/placedetail/placedetail?info=${JSON.stringify(info)}`,
        });
      },
    },
    mounted() {
      const {
        type,
      } = this.$props;
      this.typeImage = getPlaceTypeIcon(type);
    },
  };
</script>

<style>
  .item-wrapper {
    display: flex;
    flex-direction: row;
    padding: 10px 12px;
    border-bottom: 1px solid #eeeeee;
  }
  .right-wrapper {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    justify-content: space-between;
  }
  .name {
    font-size: 16px;
    font-weight: bold;
  }
  .left-image {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  .type-image {
    width: 20px;
    height: 20px;
  }
</style>
