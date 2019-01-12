import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import {connect} from '@tarojs/redux';

import {add, minus, asyncAdd} from '../../../../actions/counter';

import './index.less';


@connect(({counter}) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add());
  },
  dec() {
    dispatch(minus());
  },
  asyncAdd() {
    dispatch(asyncAdd());
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '体育成绩'
  };

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='index'>
        <View><Text>pe</Text></View>
        <View><Text>pe</Text></View>
        <View><Text>pe</Text></View>
        <View><Text>pe</Text></View>
        <View><Text>pe</Text></View>
      </View>
    );
  }
}

export default Index;
