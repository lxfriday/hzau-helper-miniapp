import Taro, {Component} from '@tarojs/taro';
import {View, Button, Text} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import qs from 'query-string';

import './index.less';
import routes from "../../../../utils/routes";

@connect(({zizhuLogin, loading}) => ({
  zizhuLogin,
  loading,
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '网费查询'
  };

  componentDidMount() {
    const {
      zizhuLogin: {
        haveSignIn,
      },
    } = this.props;
    if (!haveSignIn) {
      Taro.redirectTo({
        url: routes.zizhu.login + '?' + qs.stringify({
          from: routes.zizhu.paymentlist,
        }),
      });
    } else {
      this.getData();
    }
  }

  // 获取数据
  getData = () => {

  };

  render() {
    return (
      <View className='schoolservice_zizhu_paymentlist'>

      </View>
    );
  }
}

export default Index;
