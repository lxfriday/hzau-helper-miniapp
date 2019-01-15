/**
 * 左侧带有竖向线的标题
 */
import Taro, {Component} from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import {View, Text} from '@tarojs/components';
import PropTypes from 'prop-types';

import theme from '../../../utils/theme';

import './NoticeTitle.less';

@connect(() => ({}))
class NoticeTitle extends Component {
  render() {
    const {
      title,
      rightText,
    } = this.props;
    return (
      <View className='components_common_notice_title' style={{ borderLeftColor: theme.color }}>
        <View className='leftLine'>
          <Text className='text'>
            {title}
          </Text>
          <Text className='rightText'>{rightText}</Text>
        </View>
      </View>
    );
  }
}

NoticeTitle.propTypes = {
  title: PropTypes.string,
  rightText: PropTypes.string,
};

NoticeTitle.defaultProps = {
  title: '',
  rightText: '',
};

export default NoticeTitle;
