import Taro, {Component} from '@tarojs/taro';
import {View, Button, Text} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import qs from 'query-string';

import routes from '../../../../utils/routes';
import './index.less';

@connect(({loading, jwcLogin,}) => ({
  loading,
  jwcLogin,
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '考试成绩'
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
          from: routes.jwc.termgpa,
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
