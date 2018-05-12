<template>
  <div class="container">
    <div class="info_area">
      <div class="roomname">{{ roomName }}</div>
      <div class="avalable">剩余电量  <span>{{ available }}</span>  度</div>
      <div class="lastTime">最后抄表时间 {{ lastTime }}</div>
    </div>
    <div class="noti_area" :style="'background-color:' + (available > 20 ? '#66BB6A' : (available > 10 ? '#FB8C00' : 'red'))"></div>
  </div>
</template>

<script>
  /**
   * 宿舍电量显示卡片
   * @time 2018/05/13
   * @author lxfriday
   */

  // 电量在20度以上为绿色，10度以上为橙色，10度以下为红色
  export default {
    props: {
      // 余量
      available: {
        type: Number,
        required: true,
      },
      // 最后查表时间
      lastTime: {
        type: String,
        required: true,
      },
      // 查询的宿舍房间名
      roomName: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: row;
    border-radius: 6px;
    box-shadow: 0 0 3px #dddddd;
    height: 80px;
    width: 80%;
    margin: 50px auto 0;

    .info_area {
      flex: 1;
      padding-top: 5px;
      padding-left: 10px;

      .roomname {
        font-size: 12px;
      }
      .avalable {
        font-size: 14px;
        span {
          font-weight: bold;
          font-size: 20px;
        }
      }
      .lastTime {
        font-size: 14px;
      }
    }

    .noti_area {
      height: 100%;
      width: 40px;
      border-bottom-right-radius: 6px;
      border-top-right-radius: 6px;
      background-color: #66BB6A;
    }
  }
</style>
