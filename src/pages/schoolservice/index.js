import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import Panel from '../../components/common/Panel/Panel';
import NormalPageTitle from '../../components/common/NormalPageTitle/NormalPageTitle';
import routes from '../../utils/routes';
import version from '../../configs/version';
import developer from '../../configs/developer';

import img_pe from  '../../static/images/schoolservice/PE.png';
import img_jwc_rankexamination from  '../../static/images/schoolservice/jwc_rankexamination.png';
import img_jwc_termexamination from  '../../static/images/schoolservice/jwc_termexamination.png';
import img_jwc_termgpa from  '../../static/images/schoolservice/jwc_termgpa.png';
import img_dormitory_electricityfees from  '../../static/images/schoolservice/dormitory_electricityfees.png';
import img_library_search from  '../../static/images/schoolservice/library_search.png';
import img_zizhu_normalInfo from  '../../static/images/schoolservice/zizhu_normalInfo.png';
import img_zizhu_paymentlist from  '../../static/images/schoolservice/zizhu_paymentlist.png';

import './index.less';


@connect(() => ({}))
class Index extends Component {

  render () {
    // 体育管理系统
    const PEProps = {
      title: '环湖跑、体测成绩',
      list: [
        {
          link: routes.pe.login,
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
          link: routes.jwc.termgpa,
          icon: img_jwc_termgpa,
          text: '考试成绩',
        },
        {
          link: routes.jwc.rankexam,
          icon: img_jwc_rankexamination,
          text: '等级考试',
        },
        {
          link: routes.jwc.examtime,
          icon: img_jwc_termexamination,
          text: '学期考试信息',
        },
      ],
    };
    const libraryProps = {
      title: '图书馆',
      list: [
        {
          link: routes.library.index,
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
          link: routes.dormitory.electricity,
          icon: img_dormitory_electricityfees,
          text: '宿舍电费查询',
        },
      ],
    };

    const zizhuProps = {
      title: '现代教育技术中心',
      list: [
        {
          link: routes.zizhu.normalinfo,
          icon: img_zizhu_normalInfo,
          text: '网费查询',
        },
        {
          link: routes.zizhu.paymentlist,
          icon: img_zizhu_paymentlist,
          text: '网费订单',
        },
      ],
    };

    return (
      <View className='schoolservice_container'>
        <View className='block' />
        {/* 环湖跑、体测成绩 */}
        <Panel
          title={PEProps.title}
          list={PEProps.list}
        />
        {/* 教务管理系统 */}
        <Panel
          title={jwcProps.title}
          list={jwcProps.list}
        />
        {/* 图书馆  */}
        <Panel
          title={libraryProps.title}
          list={libraryProps.list}
        />
        {/* 现代教育技术中心  */}
        <Panel
          title={zizhuProps.title}
          list={zizhuProps.list}
        />
        {/* 宿舍 */}
        <Panel
          title={dormitoryProps.title}
          list={dormitoryProps.list}
        />
        <NormalPageTitle title={version} subTitle={'email: ' + developer.email} />
      </View>
    );
  }
}

export default Index;
