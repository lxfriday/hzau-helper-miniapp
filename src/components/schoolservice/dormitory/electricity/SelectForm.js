/**
 * 选择楼栋、楼层、房间的选择器
 * @time 2019/01/15
 * @author lxfriday
 */
import Taro, {Component} from '@tarojs/taro';
import PropTypes from 'prop-types';
import {View, Picker} from '@tarojs/components';
import {AtList, AtListItem} from 'taro-ui';

import './SelectForm.less';

class SelectForm extends Component {

  handleSelectBuilding = (e) => {
    const {
      handleSelectBuilding,
    } = this.props;
    handleSelectBuilding(e);
  };
  render() {
    const {
      sourceBuildingInfoArr,
      buildingName,
      floorInfoArr,
      selectedFloor,
      sourceRoomInfoArr,
      roomAlias,
      // handleSelectBuilding,
      handleSelectFloor,
      handleSelectRoom,
    } = this.props;
    return (
      <View className='components_schoolservice_dormitory_electricity_selectform'>
        <AtList>
          <Picker mode='selector' range={sourceBuildingInfoArr} onChange={this.handleSelectBuilding}>
            <AtListItem title='楼栋' extraText={'' + buildingName} />
          </Picker>
          <Picker mode='selector' range={floorInfoArr} onChange={handleSelectFloor}>
            {/* 在初始状态下为0，但是不显示，选择额之后才显示 */}
            <AtListItem title='楼层' extraText={Number(selectedFloor) === 0 ? '' : String(selectedFloor)} />
          </Picker>
          <Picker mode='selector' range={sourceRoomInfoArr} onChange={handleSelectRoom}>
            <AtListItem title='房间号' extraText={'' + roomAlias} />
          </Picker>
        </AtList>
      </View>
    );
  }
}

SelectForm.propTypes = {
  handleSelectBuilding: PropTypes.func,
};

SelectForm.defaultProps = {
  handleSelectBuilding: () => {},
};

export default SelectForm;

