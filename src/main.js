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
      // tab
      'pages/map/map',
      'pages/places/places',
      '^pages/publicarea/publicarea',
      'pages/about/about',

      // other pages
      'pages/author/author',
      'pages/placedetail/placedetail',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#006d33',
      navigationBarTitleText: '华中农业大学助手',
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
          text: '华农地图',
          iconPath: 'static/images/tab/map.png',
          selectedIconPath: 'static/images/tab/map_selected.png',
        },
        {
          pagePath: 'pages/places/places',
          text: '华农特色',
          iconPath: 'static/images/tab/places.png',
          selectedIconPath: 'static/images/tab/places_selected.png',
        },
        {
          pagePath: 'pages/publicarea/publicarea',
          text: '广场', // 公共区域
          iconPath: 'static/images/tab/publicarea.png',
          selectedIconPath: 'static/images/tab/publicarea_selected.png',
        },
        {
          pagePath: 'pages/schoolservice/schoolservice',
          text: '校内服务', // 接入学生相关的服务
          iconPath: 'static/images/tab/school.png',
          selectedIconPath: 'static/images/tab/school_selected.png',
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
