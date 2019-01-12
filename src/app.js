import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';

import About from './pages/about';

import configStore from './store';

import './app.less';

const store = configStore();

class App extends Component {
  config = {
    pages: [
      'pages/schoolservice/index', // 校内服务默认页面
      'pages/schoolservice/pe/login/index',
      'pages/schoolservice/pe/result/index',
      'pages/schoolservice/jwc/login/index',
      'pages/schoolservice/jwc/termgpa/index',
      'pages/schoolservice/jwc/rankexam/index',
      'pages/schoolservice/jwc/examtime/index',
      'pages/schoolservice/library/search/index',
      'pages/schoolservice/dormitory/electricity/index',

      'pages/about/index',
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
