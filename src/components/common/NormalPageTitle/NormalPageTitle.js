import Taro, {Component} from '@tarojs/taro';
import PropTypes from 'prop-types';
import {View, Text} from '@tarojs/components';

import './NormalPageTitle.less';
import theme from '../../../utils/theme';

class NormalPageTitle extends Component {
  render() {
    const {
      title,
      subTitle,
      show,
    } = this.props;

    return (
      <View className='components_common_normalpagetitle' style={show ? {}: { display: 'none' }}>
        <View className='wrapper'>
          <View>
            <Text className='title'>{title}</Text>
          </View>
          <View>
            <Text className='subTitle'>{subTitle}</Text>
          </View>
          <View className='bottomLine' style={{ backgroundColor: theme.color }} />
        </View>
      </View>
    );
  }
}

NormalPageTitle.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  show: PropTypes.bool,
};

NormalPageTitle.defaultProps = {
  title: '',
  subTitle: '',
  show: true,
};

export default NormalPageTitle;
