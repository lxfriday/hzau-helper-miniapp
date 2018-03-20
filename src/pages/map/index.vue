<template>
  <div class="container">
    <map
      id="map"
      show-location
      :markers="markers"
      :polyline="polyline"
      :style="'width: 100%; height: '+ windowHeight +'px;'"
      v-if="locationInfo"
      :longitude="locationInfo.longitude"
      :latitude="locationInfo.latitude"
    >
    </map>
  </div>
</template>

<script>
import card from '@/components/card';
import MAP_INFO from '../../../static/config/mapInfo';

const canteenPosition = MAP_INFO.canteenPosition; // 餐厅
const supermarketPosition = MAP_INFO.supermarketPosition; // 超市
const bankPosition = MAP_INFO.bankPosition; // 银行

const markers = [
  ...canteenPosition.pos.map((v, i) => ({
    iconPath: canteenPosition.icon,
    id: i,
    latitude: v.pos[0],
    longitude: v.pos[1],
    width: 20,
    height: 20,
  })),
  ...supermarketPosition.pos.map((v, i) => ({
    iconPath: supermarketPosition.icon,
    id: canteenPosition.length + i,
    latitude: v.pos[0],
    longitude: v.pos[1],
    width: 20,
    height: 20,
  })),
  ...bankPosition.pos.map((v, i) => ({
    iconPath: bankPosition.icon,
    id: canteenPosition.length + supermarketPosition.length + i,
    latitude: v.pos[0],
    longitude: v.pos[1],
    width: 20,
    height: 20,
  })),
];

export default {
  data() {
    return {
      userInfo: {},
      windowHeight: 0, // 可视区域的高度，除去了导航条和底部的tab栏
      // locationInfo: {
      //   latitude: 0,
      //   longitude: 0,
      // },
      locationInfo: null,
      markers,
    };
  },

  components: {
    card,
  },

  methods: {
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
          this.windowHeight = res.windowHeight;
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

</style>
