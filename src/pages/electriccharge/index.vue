<template>
  <div class="container">
    <div class="selector_wrapper">
      <item-picker :itemName="selectedBuildingInfo ? selectedBuildingInfo.buildingName :'楼栋'" :range="building" :handleChange="handleSelectBuilding" />
      <item-picker :itemName="selectedFloor ? selectedFloor : '楼层'" :range="floor" :handleChange="handleSelectFloor" />
      <item-picker :itemName="selectedRoomInfo && selectedFloor ? selectedRoomInfo.roomAlias : '房间号'" :range="room" :handleChange="handleSelectRoom" />
    </div>
    <room-charge-card v-if="roomChargeInfo && selectedRoomInfo" :roomName="selectedRoomInfo.roomAlias" :available="roomChargeInfo.available" :lastTime="roomChargeInfo.lastTime"></room-charge-card>
    <div class="noti" v-if="roomChargeInfo">
      下一次进入将会自动显示当前获取的宿舍的电费信息
    </div>
    <loading-modal v-if="loading"></loading-modal>
  </div>
</template>

<script>
  /**
   * 宿舍电费查询
   * @time 2018/05/12
   * @author lxfriday
   */
  import LoadingModal from '../../components/common/LoadingModal';
  import ItemPicker from '../../components/electriccharge/ItemPicker';
  import RoomChargeCard from '../../components/electriccharge/RoomChargeCard';
  import store from './store';
  import {
    ELECTRIC_CHARGE_ALL_BUILDING_INFO,
    ELECTRIC_CHARGE_BUILDING_FLOOR_ROOM,
    ELECTRIC_CHARGE_ROOM_CHARGE,
    ELECTRIC_CHARGE_ROOM_CHARGE_AUTO,
    ELECTRIC_CHARGE_RESET,
  } from '../../store/mutation-types';

  export default {
    data() {
      return {
        floor: [],

        selectedBuildingInfo: null,
        selectedFloor: null,
        selectedRoomInfo: null,
      };
    },

    computed: {
      building() {
        return store.state.sourceBuildingInfo.map(v => v.buildingName);
      },
      room() {
        return store.state.sourceRoomInfo.map(v => v.roomAlias);
      },
      roomChargeInfo() {
        return store.state.roomChargeInfo;
      },
      loading() {
        return store.state.loading;
      },
    },

    components: {
      ItemPicker,
      RoomChargeCard,
      LoadingModal,
    },

    methods: {
      // 选择宿舍楼
      handleSelectBuilding(e) {
        const selectedBuildingInfo = store.state.sourceBuildingInfo[e.target.value];
        // 选择之后重置数据
        // {
        //   buildingId: 143,
        //   buildingName: '荟01栋',
        //   buildingMaxFloor: 6,
        //   buildingMinFloor: 1,
        // },
        this.selectedBuildingInfo = selectedBuildingInfo;
        this.floor = new Array(selectedBuildingInfo.buildingMaxFloor).fill('').map((v, i) => `${i + 1} 楼`);
        this.selectedFloor = null;
        this.selectedRoomInfo = null;
      },
      // 选择楼层
      handleSelectFloor(e) {
        const that = this;
        const selectedFloor = +e.target.value + 1;

        store.dispatch({
          type: ELECTRIC_CHARGE_BUILDING_FLOOR_ROOM,
          payload: {
            buildingId: that.selectedBuildingInfo.buildingId,
            floor: selectedFloor,
          },
        });
        // 选择之后重置数据
        this.selectedFloor = `${selectedFloor} 楼`;
        this.selectedRoomInfo = null;
      },
      // 选择房间
      handleSelectRoom(e) {
        const selectedRoomInfo = store.state.sourceRoomInfo[e.target.value];

        store.dispatch({
          type: ELECTRIC_CHARGE_ROOM_CHARGE,
          payload: {
            roomId: selectedRoomInfo.roomId,
          },
        });

        // 将选择的宿舍信息存到本地
        wx.setStorage({
          key: 'electriccharge',
          data: {
            selectedRoomInfo,
          },
          success() {
            // console.log('electriccharge 存储成功');
          },
        });
        // {
        //   roomId: 22110,
        //   roomAlias: '荟8-602',
        // },
        this.selectedRoomInfo = selectedRoomInfo;
      },
    },
    mounted() {
      const that = this;
      wx.getStorage({
        key: 'electriccharge',
        success(res) {
          that.selectedRoomInfo = res.data.selectedRoomInfo;
          store.dispatch({
            type: ELECTRIC_CHARGE_ROOM_CHARGE_AUTO,
            payload: {
              roomId: res.data.selectedRoomInfo.roomId,
            },
          });
        },
        fail() {
          // 之前没查询过，则在获取key的时候回获取失败
          // console.log('用户之前没有查询过宿舍电量', err);
        },
      });
      store.dispatch({
        type: ELECTRIC_CHARGE_ALL_BUILDING_INFO,
      });
    },
    onUnload() {
      Object.assign(this.$data, this.$options.data());
      store.commit({
        type: ELECTRIC_CHARGE_RESET,
      });
    },
  };
</script>

<style scoped lang="less">

  .container {
    .selector_wrapper {
      display: flex;
      border-bottom: 1px solid #cccccc;
    }
    .noti {
      margin: 20px auto;
      font-size: 14px;
      color: #dddddd;
    }
  }
</style>
