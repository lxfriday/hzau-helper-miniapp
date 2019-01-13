/**
 * 左侧带有竖向线的标题
 */
import Taro, {Component} from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import {View, Text} from '@tarojs/components';
import theme from '../../../utils/theme';

import './NoticeTitle.less';

@connect(() => ({}))
class Index extends Component {
  render() {
    const {
      title,
    } = this.props;
    return (
      <View className='components_common_notice_title' style={{ borderLeftColor: theme.color }}>
        <View className='leftLine'>
          <Text className='text'>
            {title}
          </Text>
        </View>
      </View>
    );
  }
}

export default Index;
