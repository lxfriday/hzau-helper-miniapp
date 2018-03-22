<template>
  <div class="container">
    <picker @change="bindTypeSelectorChange" :range="typeArray">
      <div class="selector-wrapper">
        <div class="selector-left-wrapper">
          <image class="selector-left-location" :src="selectedTypeIcon"></image>
          <text class="selector-center-text">{{ selectedTypeName }}</text>
        </div>
        <image class="selector-right-arrow" src="/static/images/arrow-right.png"></image>
      </div>
    </picker>
    <map
      id="map"
      show-location
      :markers="markers"
      :polyline="polyline"
      :style="'width: 100%; height: '+ mapHeight +'px;'"
      :longitude="locationInfo.longitude"
      :latitude="locationInfo.latitude">
    </map>
  </div>
</template>

<script>
import card from '@/components/card';
import MARKERS, { administrativeBuildingPos, typeArray, typeIconArray } from '../../../static/config/mapInfo';

export default {
  data() {
    return {
      userInfo: {},
      mapHeight: 0, // 可视区域的高度，除去了导航条和底部的tab栏
      // 系统默认定位到行政楼
      locationInfo: {
        latitude: administrativeBuildingPos[0],
        longitude: administrativeBuildingPos[1],
      },
      markers: MARKERS(),
      // markersShowType: 'all', // 默认是查看所有类型的场所， 'all' => 所有 || 'single' => '某种'
      typeArray,
      selectedTypeName: '所有地点',
      selectedTypeIcon: typeIconArray[typeIconArray.length - 1],
      // 点击控制键
    };
  },

  components: {
    card,
  },

  methods: {
    bindTypeSelectorChange(e) {
      const index = +e.mp.detail.value;
      if (index === typeArray.length - 1) {
        this.markers = MARKERS();
      } else {
        this.markers = MARKERS(index);
      }
      this.selectedTypeName = typeArray[e.mp.detail.value];
      this.selectedTypeIcon = typeIconArray[e.mp.detail.value];
    },
    // 获取用户信息
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo;
            },
          });
        },
      });
    },
    /**
     * 获取设备的可视区域的宽、高
     */
    getWindowInfo() {
      wx.getSystemInfo({
        success: (res) => {
          this.mapHeight = res.windowHeight - 30;
        },
      });
    },
    /**
     * 获取用户的位置信息
     */
    getLocation() {
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          this.locationInfo = {
            latitude: res.latitude,
            longitude: res.longitude,
          };
        },
      });
    },
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
    this.getWindowInfo();
    this.getLocation();
  },
};
</script>

<style scoped>
  .selector-wrapper {
    flex: 1;
    height: 80rpx;
    padding: 0 16rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #efefef;
  }
  .selector-left-wrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .selector-left-location {
    width: 40rpx;
    height: 40rpx;
  }
  .selector-right-arrow {
    width: 40rpx;
    height: 40rpx;
  }
  .selector-center-text {
    margin-left: 20rpx;
    font-size: 30rpx;
  }
  .option-buttons {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 35rpx;
    width: 100%;
  }

</style>
