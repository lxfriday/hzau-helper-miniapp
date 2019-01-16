import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import {connect} from '@tarojs/redux';

import './index.less';

@connect(() => ({
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '馆藏书搜索'
  };

  render() {
    return (
      <View className='schoolservice_library_search'>
        <Text>敬请期待</Text>
      </View>
    );
  }
}

export default Index;
