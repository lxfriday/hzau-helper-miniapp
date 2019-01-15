/**
 * 带有加载效果的全局浮层
 */
import Taro, {Component} from '@tarojs/taro';
import PropTypes from 'prop-types';
import { connect } from '@tarojs/redux';
import {View} from '@tarojs/components';
import { AtModal, AtActivityIndicator, AtModalContent } from 'taro-ui';

import './MaskLoading.less';

@connect(() => ({}))
class MaskLoading extends Component {
  render() {
    const {
      isOpened,
    } = this.props;
    return (
      <View className='components_common_mask_loading'>
        <AtModal
          closeOnClickOverlay={false}
          isOpened={isOpened}
        >
          <AtModalContent>
            <View className='indicatorWrapper'>
              <AtActivityIndicator mode='center' size={32} />
            </View>
          </AtModalContent>
        </AtModal>
      </View>
    );
  }
}

MaskLoading.propTypes = {
  isOpened: PropTypes.bool,
};

MaskLoading.defaultProps = {
  isOpened: false,
};

export default MaskLoading;
