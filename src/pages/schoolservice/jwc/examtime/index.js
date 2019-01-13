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
    navigationBarTitleText: '学期考试信息'
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
          from: routes.jwc.examtime,
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
        <View><Text>Hello, World</Text></View>
      </View>
    );
  }
}

export default Index;
