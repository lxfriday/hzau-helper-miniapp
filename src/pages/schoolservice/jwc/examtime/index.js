import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import qs from 'query-string';

import NormalPageTitle from '../../../../components/common/NormalPageTitle/NormalPageTitle';
import ExamTimeGrid from '../../../../components/schoolservice/jwc/examtime/ExamTimeGrid';
import MaskLoading from '../../../../components/common/MaskLoading/MaskLoading';


import './index.less';
import routes from '../../../../utils/routes';

@connect(({jwcLogin, loading, jwcExamTime}) => ({
  jwcLogin,
  jwcExamTime,
  loading,
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
    } else {
      this.getList();
    }
  }

  // 获取数据列表
  getList = () => {
    this.props.dispatch({
      type: 'jwcExamTime/getExamTimeListEffect',
    });
  };

  render() {
    const {
      jwcExamTime: {
        list,
        yearTerm,
      },
      loading,
    } = this.props;

    const listNode = list.map((v, i) => (
      <ExamTimeGrid
        key={i}
        courseName={v.courseName}
        location={v.location}
        date={v.date}
      />
    ));

    return (
      <View className='schoolservice_jwc_examtime'>
        <NormalPageTitle title={yearTerm} show={!loading.effects['jwcExamTime/getExamTimeListEffect']} />
        <View style={{ marginTop: '10px' }} />
        {listNode}
        <MaskLoading isOpened={loading.effects['jwcExamTime/getExamTimeListEffect']} />
      </View>
    );
  }
}

export default Index;
