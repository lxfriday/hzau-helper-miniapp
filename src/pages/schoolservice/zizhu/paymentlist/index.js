import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import qs from 'query-string';
import {AtTimeline} from 'taro-ui';

import NoticeTitle from '../../../../components/common/NoticeTitle/NoticeTitle';
import MaskLoading from '../../../../components/common/MaskLoading/MaskLoading';

import './index.less';
import routes from "../../../../utils/routes";

@connect(({zizhuLogin, loading, zizhuPaymentList}) => ({
  zizhuLogin,
  loading,
  zizhuPaymentList,
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '缴费清单'
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
    this.props.dispatch({
      type: 'zizhuPaymentList/getZizhuPaymentListEffect',
    });
  };

  render() {
    const {
      zizhuPaymentList: {
        record,
      },
      loading,
    } = this.props;

    const recordNode = record.map((v, i) => (
      <View key={i}>
        {/* 时间 */}
        <NoticeTitle title={v[6]} />
        <View style={{ paddingLeft: '10rpx' }}>
          <AtTimeline
            items={[
              { title: v[1] },
              { title: v[2], color: 'yellow' },
              { title: v[3] },
              { title: v[4] },
              { title: v[5] },
            ]}
          />
        </View>
      </View>
    ));

    const isLoading = !!loading.effects['zizhuPaymentList/getZizhuPaymentListEffect'];

    return (
      <View className='schoolservice_zizhu_paymentList'>
        {recordNode}
        <MaskLoading isOpened={isLoading} />
      </View>
    );
  }
}

export default Index;
