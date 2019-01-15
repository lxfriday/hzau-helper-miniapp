import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import qs from 'query-string';

import ExamResultGrid from '../../../../components/schoolservice/jwc/rankexam/ExamResultGrid';
import MaskLoading from '../../../../components/common/MaskLoading/MaskLoading';

import './index.less';
import routes from '../../../../utils/routes';


@connect(({jwcLogin, jwcRankExam, loading}) => ({
  jwcLogin,
  jwcRankExam,
  loading,
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
    } else {
      this.getList();
    }
  }

  // 获取数据列表
  getList = () => {
    this.props.dispatch({
      type: 'jwcRankExam/getRankExamListEffect',
    });
  };

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    const {
      jwcRankExam: {
        list,
      },
      loading,
    } = this.props;

    const listNode = list.map((v, i) => (
      <ExamResultGrid
        key={i}
        examName={v.examName}
        yearTerm={v.yearTerm}
        date={v.date}
        examId={v.examId}
        result={v.result}
        engListeningResult={v.engListeningResult}
        engReadingResult={v.engReadingResult}
        engWritingingResult={v.engWritingingResult}
      />
    ));

    return (
      <View className='schoolservice_jwc_rankexam'>
        {listNode}
        <MaskLoading isOpened={loading.effects['jwcRankExam/getRankExamListEffect']} />
      </View>
    );
  }
}

export default Index;
