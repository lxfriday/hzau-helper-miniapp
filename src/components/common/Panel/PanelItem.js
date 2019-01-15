import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './PanelItem.less';

class PanelItem extends Component {
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick = () => {
    const {
      link,
    } = this.props;
    Taro.navigateTo({
      url: link,
    });
  };

  render () {
    const {
      icon,
      text,
    } = this.props;
    return (
      <View className='PanelItem_container' onClick={this.handleClick}>
        <View className='contentWrapper'>
          <Image className='img' src={icon} />
          <Text className='text'>{text}</Text>
        </View>
      </View>
    );
  }
}

export default PanelItem;
