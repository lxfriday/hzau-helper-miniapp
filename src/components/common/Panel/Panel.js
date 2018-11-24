import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import PropTypes from 'prop-types';

import PanelItem from './PanelItem';
import './Panel.less';

class Panel extends Component {
  render () {
    const {
      title,
      list,
    } = this.props;
    return (
      <View className='Panel_container'>
        <View className='header'>
          <Text className='title'>{title}</Text>
        </View>
        <View className='body'>
          {list.map((v, i) => (
            <PanelItem key={i} link={v.link} icon={v.icon} text={v.text} />
          ))}
        </View>
      </View>
    );
  }
}

Panel.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string, // 链接
    icon: PropTypes.string, // 图片
    text: PropTypes.string, // 底部提示文字
  })).isRequired,
  title: PropTypes.string.isRequired,
};

Panel.defaultProps = {
};

export default Panel;
