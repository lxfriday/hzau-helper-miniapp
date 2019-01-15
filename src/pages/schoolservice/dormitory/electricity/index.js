import Taro, {Component} from '@tarojs/taro';
import {View, Picker, Text} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import { AtListItem, AtList } from 'taro-ui';

import './index.less';

import RemainingCapacity from '../../../../components/schoolservice/dormitory/electricity/RemainingCapacity';
import MaskLoading from '../../../../components/common/MaskLoading/MaskLoading';

import storage from '../../../../utils/storage';

@connect(({dormitoryElectricity, loading}) => ({
  dormitoryElectricity,
  loading,
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBuildingInfo: {
        buildingId: 0,
        buildingName: '',
        buildingMaxFloor: 0,
        buildingMinFloor: 0,
      },
      selectedFloor: 0,
      selectedRoomInfo: {
        roomId: 0,
        roomAlias: '',
      },
    };
  }

  config = {
    navigationBarTitleText: '电费查询'
  };

  componentDidMount() {
    this.getSelectedRoomInfo();
    this.getBuildigList();
  }

  // 打开页面，请求宿舍楼栋信息
  getBuildigList = () => {
    this.props.dispatch({
      type: 'dormitoryElectricity/getBuildingListEffect',
    });
  };

  getRoomChargeInfo = (roomId) => {
    this.props.dispatch({
      type: 'dormitoryElectricity/getRoomChargeEffects',
      payload: {
        data: {
          roomId,
        },
      },
    });
  };

  // 获取存储在本地的选择的宿舍房间信息
  getSelectedRoomInfo = () => {
    Taro.getStorage({
      key: storage.dormitorySelectedRoomInfo,
    })
      .then(({ data }) => {
        this.setState({ selectedRoomInfo: data });
        this.getRoomChargeInfo(data.roomId);
      })
      .catch(() => {});
  };

  // 选择宿舍漏洞
  handleSelectBuilding = (e) => {
    const {
      dormitoryElectricity: {
        sourceBuildingInfo,
      },
    } = this.props;

    this.setState({
      selectedBuildingInfo: sourceBuildingInfo[e.detail.value],
      // 重置选择的楼层、房间信息
      selectedFloor: 0,
      selectedRoomInfo: {
        roomId: 0,
        roomAlias: '',
      },
    });
  };

  // 选择楼层
  handleSelectFloor = (e) => {
    const {
      selectedBuildingInfo,
    } = this.state;
    const selectedFloor = Number(e.detail.value) + 1;

    this.setState({
      selectedFloor,
    });
    this.props.dispatch({
      type: 'dormitoryElectricity/getFloorRoomListEffects',
      payload: {
        data: {
          buildingId: selectedBuildingInfo.buildingId,
          floor: selectedFloor,
        },
      },
    });
  };

  // 选择房间
  handleSelectRoom = (e) => {
    const {
      dormitoryElectricity: {
        sourceRoomInfo,
      },
    } = this.props;

    const selectedRoomInfo = sourceRoomInfo[e.detail.value];

    this.setState({
      selectedRoomInfo,
    });

    // 将选择的数据保存到本地
    Taro.setStorage({
      key: storage.dormitorySelectedRoomInfo,
      data: selectedRoomInfo,
    })
      .catch(() => {});
    // selectedRoomInfo = {
    //   roomId: 22207,
    //   roomAlias: '荟8-2714',
    // }

    this.getRoomChargeInfo(selectedRoomInfo.roomId);
  };

  render() {
    const {
      dormitoryElectricity: {
        sourceBuildingInfo,
        sourceRoomInfo,
        roomChargeInfo,
      },
      loading,
    } = this.props;
    const {
      selectedBuildingInfo,
      selectedFloor,
      selectedRoomInfo,
    } = this.state;

    const sourceBuildingInfoArr = sourceBuildingInfo.map(v => v.buildingName);
    const floorInfoArr = new Array(selectedBuildingInfo.buildingMaxFloor).fill(0).map((v, i) => i + 1);
    const sourceRoomInfoArr = sourceRoomInfo.map(v => v.roomAlias);

    return (
      <View className='schoolservice_dormitory_electricity'>
        {/* 宿舍、楼层、房间选择器 */}
        <View className='selectForm'>
          <AtList>
            <Picker mode='selector' range={sourceBuildingInfoArr} onChange={this.handleSelectBuilding}>
              <AtListItem title='楼栋' extraText={'' + selectedBuildingInfo.buildingName} />
            </Picker>
            <Picker mode='selector' range={floorInfoArr} onChange={this.handleSelectFloor}>
              {/* 在初始状态下为0，但是不显示，选择额之后才显示 */}
              <AtListItem title='楼层' extraText={Number(selectedFloor) === 0 ? '' : String(selectedFloor)} />
            </Picker>
            <Picker mode='selector' range={sourceRoomInfoArr} onChange={this.handleSelectRoom}>
              <AtListItem title='房间号' extraText={'' + selectedRoomInfo.roomAlias} />
            </Picker>
          </AtList>
        </View>
        {
          roomChargeInfo !== null && (
            (
              <RemainingCapacity
                roomName={selectedRoomInfo.roomAlias}
                available={roomChargeInfo.available}
                lastTime={roomChargeInfo.lastTime}
              />
            )
          )
        }
        <MaskLoading isOpened={
          loading.effects['dormitoryElectricity/getRoomChargeEffects']
          || loading.effects['dormitoryElectricity/getFloorRoomListEffects']
          || loading.effects['dormitoryElectricity/getBuildingListEffect']
        }
        />
      </View>
    );
  }
}

export default Index;
