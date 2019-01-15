/**
 * 考试成绩列表
 * @time
 * @author lxfriday
 */
import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import qs from 'query-string';

import GradeGrid from '../../../../components/schoolservice/jwc/termgpa/GradeGrid';
import MaskLoading from '../../../../components/common/MaskLoading/MaskLoading';

import routes from '../../../../utils/routes';
import './index.less';

@connect(({loading, jwcLogin,jwcTermGPA}) => ({
  loading,
  jwcLogin,
  jwcTermGPA,
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
    } else {
      this.getList();
    }
  }

  // 获取数据列表
  getList = () => {
    this.props.dispatch({
      type: 'jwcTermGPA/getTermGPAListEffect',
    });
  };

  render() {
    const {
      jwcTermGPA: {
        list,
      },
      loading,
    } = this.props;

    const listNode = list.map((v, i) => (
      <GradeGrid
        key={i}
        yearTerm={v.yearTerm}
        college={v.college}
        courseName={v.courseName}
        courseType={v.courseType}
        courseGrade={v.courseGrade}
        gpa={v.gpa}
        credit={v.credit}
      />
    ));

    return (
      <View className='schoolservice_jwc_termgpa'>
        {listNode}
        <MaskLoading isOpened={loading.effects['jwcTermGPA/getTermGPAListEffect']} />
      </View>
    );
  }
}

export default Index;
