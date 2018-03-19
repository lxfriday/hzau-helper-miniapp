import Vue from 'vue';
import App from './App';

import '../static/weui/weui.css';

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/map/map',
      'pages/searchinfo/searchinfo',
      'pages/publicarea/publicarea',
      '^pages/about/about',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#006d33',
      navigationBarTitleText: '华中农大助手',
      navigationBarTextStyle: 'white',
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#006d33',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/map/map',
          text: '地图',
          iconPath: 'static/images/tab/map.png',
          selectedIconPath: 'static/images/tab/map_selected.png',
        },
        {
          pagePath: 'pages/searchinfo/searchinfo',
          text: '信息查询',
          iconPath: 'static/images/tab/searchinfo.png',
          selectedIconPath: 'static/images/tab/searchinfo_selected.png',
        },
        {
          pagePath: 'pages/publicarea/publicarea',
          text: '信息发布',
          iconPath: 'static/images/tab/publicarea.png',
          selectedIconPath: 'static/images/tab/publicarea_selected.png',
        },
        {
          pagePath: 'pages/about/about',
          text: '关于',
          iconPath: 'static/images/tab/about.png',
          selectedIconPath: 'static/images/tab/about_selected.png',
        },
      ],
    },
  },
};
