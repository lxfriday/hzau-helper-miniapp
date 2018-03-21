<template>
  <div class="container">
    <map
      id="map"
      show-location
      @controltap="controltap"
      :controls="controls"
      :markers="markers"
      :polyline="polyline"
      :style="'width: 100%; height: '+ windowHeight +'px;'"
      :longitude="locationInfo.longitude"
      :latitude="locationInfo.latitude">
    </map>
  </div>
</template>

<script>
import card from '@/components/card';
import MARKERS, { administrativeBuildingPos } from '../../../static/config/mapInfo';


export default {
  data() {
    return {
      userInfo: {},
      windowHeight: 0, // 可视区域的高度，除去了导航条和底部的tab栏
      // 系统默认定位到行政楼
      locationInfo: {
        latitude: administrativeBuildingPos[0],
        longitude: administrativeBuildingPos[1],
      },
      markers: MARKERS(),
      // markersShowType: 'all', // 默认是查看所有类型的场所， 'all' => 所有 || 'single' => '某种'
      controls: [],
      // 点击控制键
    };
  },

  components: {
    card,
  },

  methods: {
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
          this.windowHeight = res.windowHeight;
          this.controls = [{
            id: 998,
            iconPath: '/static/images/map_control.png',
            position: {
              left: res.windowWidth - 40,
              top: res.windowHeight - 40,
              width: 30,
              height: 30,
            },
            clickable: true,
          }, {
            id: 999,
            iconPath: '/static/images/map_showall.png',
            position: {
              left: 10,
              top: res.windowHeight - 40,
              width: 30,
              height: 30,
            },
            clickable: true,
          }];
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
    // 点击右下角的控制键
    controltap(e) {
      // 只查看某种类别的
      if (e.mp.controlId === 998) {
        wx.showActionSheet({
          itemList: ['食堂', '超市', '银行', '车站', '学校机构', '教学楼'],
          success: (res) => {
            this.markers = MARKERS(res.tapIndex);
          },
        });
      } else {
        // 查看所有的
        this.markers = MARKERS();
      }
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
