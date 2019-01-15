/**
 * 剩余电量显示条
 * @time 2019/01/15
 * @author lxfriday
 */
import Taro, {Component} from '@tarojs/taro';
import {View, Button, Text} from '@tarojs/components';
import theme from '../../../../utils/theme';

import './RemainingCapacity.less';

class RemainingCapacity extends Component {
  render() {
    const {
      roomName,
      available,
      lastTime,
    } = this.props;
    return (
      <View className='components_schoolservice_dormitory_electricity_remainingcapacity'>
        <View class='info_area'>
          <View class='roomname'>
            <Text>
              {roomName}
            </Text>
          </View>
          <View class='available'>
            <Text>剩余电量  </Text><Text className='availableValue'>{available}</Text><Text>  度</Text>
          </View>
          <View class='lastTime'>
            <Text>
              最后抄表时间 {lastTime}
            </Text>
          </View>
        </View>
        <View class='noti_area' style={{
          backgroundColor: available > 20 ? theme.color : (available > 10 ? '#FB8C00' : 'red')
        }}
        />
      </View>
    );
  }
}

export default RemainingCapacity;
