import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';

import NoticeTitle from '../../../../components/common/NoticeTitle/NoticeTitle';

import './index.less';

@connect(({pe, loading}) => ({
  pe,
  loading,
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '体育成绩'
  };

  render() {
    const {
      lakeRun,
      PETest,
    } = this.props.pe;

    const petestArr = PETest.map((v, i) => (
      <AtListItem key={i} title={v[1]} note={v[0]} extraText={v[4]} />
    ));

    return (
      <View className='pe_result'>
        <View>
          <NoticeTitle title='环湖跑' />
          <AtList>
            <AtListItem title='任课老师' extraText={lakeRun.teacher} />
            <AtListItem title='当前成绩' extraText={lakeRun.current} />
            <AtListItem title='要求成绩' extraText={lakeRun.required} />
          </AtList>
        </View>

        <View style={{ marginTop: '20px' }}>
          <NoticeTitle title='体测成绩' />
          <AtList>
            {petestArr}
          </AtList>
        </View>
      </View>
    );
  }
}

export default Index;
