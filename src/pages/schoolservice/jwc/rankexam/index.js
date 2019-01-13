import Taro, {Component} from '@tarojs/taro';
import {View, Button, Text} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import qs from 'query-string';

import './index.less';
import routes from '../../../../utils/routes';


@connect(({jwcLogin}) => ({
  jwcLogin,
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '等级考试'
  };

  componentDidMount() {
    const {
      jwcLogin: {
        haveSignIn,
      },
    } = this.props;
    if (!haveSignIn) {
      Taro.redirectTo({
        url: routes.jwc.login + '?' + qs.stringify({
          from: routes.jwc.rankexam,
        }),
      });
    }
  }


  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    );
  }
}

export default Index;
