import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';

import './NormalPageTitle.less';
import theme from '../../../utils/theme';

class NormalPageTitle extends Component {
  render() {
    const {
      title,
      show,
    } = this.props;

    return (
      <View className='components_common_normalpagetitle' style={show ? {}: { display: 'none' }}>
        <View className='wrapper'>
          <Text className='title'>{title}</Text>
          <View className='bottomLine' style={{ backgroundColor: theme.color }} />
        </View>
      </View>
    );
  }
}

export default NormalPageTitle;
