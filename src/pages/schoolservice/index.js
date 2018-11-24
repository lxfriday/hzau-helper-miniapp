import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import Panel from '../../components/common/Panel/Panel';
import { add, minus, asyncAdd } from '../../actions/counter';

import img_pe from  '../../static/images/schoolservice/PE.png';
import img_jwc_rankexamination from  '../../static/images/schoolservice/jwc_rankexamination.png';
import jwc_termexamination from  '../../static/images/schoolservice/jwc_termexamination.png';
import img_jwc_termgpa from  '../../static/images/schoolservice/jwc_termgpa.png';
import img_dormitory_electricityfees from  '../../static/images/schoolservice/dormitory_electricityfees.png';
import img_library_search from  '../../static/images/schoolservice/library_search.png';

import './index.less';


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add());
  },
  dec () {
    dispatch(minus());
  },
  asyncAdd () {
    dispatch(asyncAdd());
  }
}))
class Index extends Component {

  config = {
  };

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    // 体育管理系统
    const PEProps = {
      title: '环湖跑、体测成绩',
      list: [
        {
          link: '/pages/schoolservice/pe/index',
          icon: img_pe,
          text: '环湖体测',
        },
      ]
    };
    // 教务管理系统
    const jwcProps = {
      title: '教务管理系统',
      list: [
        {
          link: '/pages/schoolservice/jwc/termgpa',
          icon: img_jwc_termgpa,
          text: '考试成绩',
        },
        {
          link: '/pages/schoolservice/jwc/rankexam',
          icon: img_jwc_rankexamination,
          text: '等级考试',
        },
        {
          link: '/pages/schoolservice/jwc/termexam',
          icon: jwc_termexamination,
          text: '学期考试信息',
        },
      ],
    };
    const libraryProps = {
      title: '图书馆',
      list: [
        {
          link: '/pages/schoolservice/library/searchbook',
          icon: img_library_search,
          text: '馆藏书搜索',
        },
      ],
    };
    // 宿舍信息
    const dormitoryProps = {
      title: '宿舍信息',
      list: [
        {
          link: '/pages/schoolservice/dormitory/electricityfees',
          icon: img_dormitory_electricityfees,
          text: '宿舍电费查询',
        },
      ],
    };

    return (
      <View className='schoolservice_container'>
        <View className='block' />
        <Panel
          title={PEProps.title}
          list={PEProps.list}
        />
        <Panel
          title={jwcProps.title}
          list={jwcProps.list}
        />
        <Panel
          title={libraryProps.title}
          list={libraryProps.list}
        />
        <Panel
          title={dormitoryProps.title}
          list={dormitoryProps.list}
        />
      </View>
    );
  }
}

export default Index;
