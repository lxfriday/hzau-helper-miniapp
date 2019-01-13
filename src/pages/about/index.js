import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import {connect} from '@tarojs/redux';

import './index.less';

@connect(() => ({}))
class Index extends Component {

  config = {
    navigationBarTitleText: '关于助手'
  };

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='about_index'>
        <View><Text>关于华中农业大学助手</Text></View>
      </View>
    );
  }
}

export default Index;
