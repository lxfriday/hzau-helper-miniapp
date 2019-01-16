import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import qs from 'query-string';
import { AtList, AtListItem } from 'taro-ui';

import NoticeTitle from '../../../../components/common/NoticeTitle/NoticeTitle';
import MaskLoading from '../../../../components/common/MaskLoading/MaskLoading';

import './index.less';
import routes from "../../../../utils/routes";

@connect(({zizhuLogin, loading, zizhuNormalInfo}) => ({
  zizhuLogin,
  loading,
  zizhuNormalInfo,
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
          from: routes.zizhu.normalinfo,
        }),
      });
    } else {
      this.getData();
    }
  }

  // 获取数据
  getData = () => {
    this.props.dispatch({
      type: 'zizhuNormalInfo/getZizhuNormalInfoEffect',
    });
  };

  render() {
    const {
      zizhuNormalInfo: {
        onlineInfo,
        productInfo,
      },
      loading,
    } = this.props;
    const productInfoNode = productInfo.map((v, i) => (
      <AtListItem
        key={i}
        title={v[0]}
        extraText={v[1]}
      />
    ));

    const subOnelineInfo = [];
    for(let i =0; i < onlineInfo.length - 1; i++) {
      subOnelineInfo.push(onlineInfo[i]);
    }

    const onlineInfoInfoNode = subOnelineInfo.map((v, i) => (
      <AtListItem
        key={i}
        title={v[0]}
        extraText={v[1]}
      />
    ));

    const isLoading = !!loading.effects['zizhuNormalInfo/getZizhuNormalInfoEffect'];

    return (
      <View className='schoolservice_zizhu_normalinfo'>
        {!isLoading && (
          <View className='gridWrapper'>
            <NoticeTitle title='产品信息' />
            <AtList>
              {productInfoNode}
            </AtList>
          </View>
        )}
        {!isLoading && (
          <View className='gridWrapper' style={{ marginTop: '30rpx' }}>
            <NoticeTitle title='在线信息' />
            <AtList>
              {onlineInfoInfoNode}
            </AtList>
          </View>
        )}
        <MaskLoading isOpened={isLoading} />
      </View>
    );
  }
}

export default Index;
