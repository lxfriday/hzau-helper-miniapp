import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';


import About from './pages/about';
import './app.less';

import dva from './dva';
import models from './models';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  // e, dispatch
  onError() {
    Taro.showToast({
      title: '内部错误',
      icon: 'none',
    });
  },
});

const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages: [
      'pages/schoolservice/zizhu/normalinfo/index', // 现代教育技术中心-网费信息
      'pages/schoolservice/zizhu/login/index', // 现代教育技术中心-登录
      'pages/schoolservice/index', // 校内服务默认页面
      'pages/schoolservice/jwc/login/index', // 教务管理系统-登录

      'pages/schoolservice/zizhu/paymentlist/index', // 现代教育技术中心-历史订单
      'pages/schoolservice/dormitory/electricity/index', // 宿舍电量
      'pages/schoolservice/jwc/examtime/index', // 教务管理系统-考试时间
      'pages/schoolservice/jwc/rankexam/index', // 教务管理系统-等级考试
      'pages/schoolservice/jwc/termgpa/index', // 教务管理系统-考试成绩

      'pages/schoolservice/pe/result/index', // 体育管理系统-成绩
      'pages/schoolservice/pe/login/index', // 体育管理系统-登录

      'pages/schoolservice/library/search/index', // 图书馆-搜索页面
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: '华中农业大学助手',
      navigationBarTextStyle: 'black',
    },
    // tabBar: {
    //   color: '#999999',
    //   selectedColor: '#000000',
    //   backgroundColor: '#ffffff',
    //   borderStyle: 'white',
    //   list: [
    //     {
    //       pagePath: 'pages/schoolservice/index',
    //       text: '校内服务', // 接入学生相关的服务
    //       iconPath: 'static/images/tab/school.png',
    //       selectedIconPath: 'static/images/tab/school_selected.png',
    //     },
    //     // {
    //     //   pagePath: 'pages/daylife/daylife',
    //     //   text: '敬请期待',
    //     //   iconPath: 'static/images/tab/daylife.png',
    //     //   selectedIconPath: 'static/images/tab/daylife_selected.png',
    //     // },
    //     // {
    //     //   pagePath: 'pages/about/index',
    //     //   text: '关于',
    //     //   iconPath: 'static/images/tab/about.png',
    //     //   selectedIconPath: 'static/images/tab/about_selected.png',
    //     // },
    //   ],
    // },
  };

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <About />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
