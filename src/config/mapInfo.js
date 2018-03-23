/**
 * 标定地图上面的一些点
 * @time 2018/03/20
 * @author lxfriday
 */


// 个人场所
// export const personalPosition = {
//
// };

// 行政楼的位置
export const administrativeBuildingPos = [30.476505, 114.356078];

export const typeArray = ['餐厅', '超市', '银行', '车站', '学校部门', '教学楼', '显示所有地点']; // 所有类型的地点的中文名
export const typeIconArray = [
  '/static/images/map_canteen.png',
  '/static/images/map_supermarket.png',
  '/static/images/map_bank.png',
  '/static/images/map_busstation.png',
  '/static/images/map_flag.png',
  '/static/images/map_teachingbuilding.png',
  '/static/images/location.png',
]; // 类型对应的图标

const defaultPos = {
  // 餐厅
  canteenPosition: {
    icon: '/static/images/map_canteen.png', // 用来标定类别的图标
    pos: [
      {
        pos: [30.475118, 114.361469],  // latitude(唯独), longitude(精度)
        name: '梦泽园',
      },
      {
        pos: [30.475742, 114.361534],
        name: '东北菜馆',
      },
      {
        pos: [30.476611, 114.363449],
        name: '清真食堂',
      },
      {
        pos: [30.473065, 114.361973],
        name: '荟园食堂',
      },
      {
        pos: [30.471082, 114.361904],
        name: '桃园食堂',
      },
      {
        pos: [30.477351, 114.355906],
        name: '干训餐厅',
      },
      {
        pos: [30.476343, 114.349383],
        name: '西苑食堂',
      },
      {
        pos: [30.476121, 114.361501],
        name: '博园食堂',
      },
      {
        pos: [30.477171, 114.353948],
        name: '竹苑食堂',
      },
    ],
  },
  // 超市
  supermarketPosition: {
    icon: '/static/images/map_supermarket.png', // 用来标定类别的图标
    pos: [
      {
        pos: [30.472557, 114.364243],  // latitude(唯独), longitude(精度)
        name: '荟五教超',
      },
      {
        pos: [30.475747, 114.361523],
        name: '博园教超',
      },
      {
        pos: [30.470037, 114.363685],
        name: '荟十教超',
      },
      {
        pos: [30.475317, 114.350499],
        name: '梧桐街教超',
      },
    ],
  },
  // 银行
  bankPosition: {
    icon: '/static/images/map_bank.png', // 用来标定类别的图标
    pos: [
      {
        pos: [30.473310, 114.364361],  // latitude(唯独), longitude(精度)
        name: '银行',
      }, {
        pos: [30.475890, 114.353036],
        name: '银行',
      }, {
        pos: [30.474961, 114.350408],
        name: '银行',
      }, {
        pos: [30.475825, 114.349394],
        name: '银行',
      }, {
        pos: [30.476459, 114.361051],
        name: 'ATM',
      },
    ],
  },
  // 公交站、校车车站
  busStation: {
    icon: '/static/images/map_busstation.png', // 用来标定类别的图标
    pos: [
      {
        pos: [30.471604, 114.361485],  // latitude(唯独), longitude(精度)
        name: '华农校车车站',
      }, {
        pos: [30.475437, 114.339207],
        name: '西大门车站',
      }, {
        pos: [30.481059, 114.369317],
        name: '东门公交站',
      }, {
        pos: [30.480328, 114.352784],
        name: '北门公交站',
      },
    ],
  },
  // 学校的各个行政部门位置信息
  departmentPos: {
    icon: '/static/images/map_flag.png', // 用来标定类别的图标
    pos: [
      {
        pos: administrativeBuildingPos,  // latitude(唯独), longitude(精度)
        name: '行政楼',
      }, {
        pos: [30.476699, 114.355381],
        name: '计财科',
      }, {
        pos: [30.473828, 114.353723],
        name: '校医院',
      }, {
        pos: [30.473837, 114.356276],
        name: '保卫处',
      }, {
        pos: [30.473167, 114.362703],
        name: '综合楼',
      }, {
        pos: [30.471489, 114.357446],
        name: '图书馆',
      }, {
        pos: [30.476315, 114.361920],
        name: '宿管中心',
      },
    ],
  },
  // 教学楼位置信息
  teachingBuilding: {
    icon: '/static/images/map_teachingbuilding.png', // 用来标定类别的图标
    pos: [
      {
        pos: [30.474499, 114.358481],
        name: '第一教学楼',
      }, {
        pos: [30.473930, 114.358460],
        name: '第二教学楼',
      }, {
        pos: [30.472178, 114.358492],
        name: '第三教学楼',
      }, {
        pos: [30.471063, 114.360198],
        name: '第四教学楼',
      },
    ],
  },
};

/**
 * 将数据信息转换成markers的地图标识
 * type {number} 点击选中的地点的类型
 */
export default function (index = null) {
  let counter = 0;
  const markers = [];
  if (typeof index === 'number') {
    Object.keys(defaultPos).forEach((v, i) => {
      if (i === index) {
        defaultPos[v].pos.forEach((vv) => {
          markers.push({
            iconPath: defaultPos[v].icon,
            id: counter,
            latitude: vv.pos[0],
            longitude: vv.pos[1],
            width: 20,
            height: 20,
          });
          counter += 1;
        });
      }
    });
  } else {
    Object.keys(defaultPos).forEach((v) => {
      defaultPos[v].pos.forEach((vv) => {
        markers.push({
          iconPath: defaultPos[v].icon,
          id: counter,
          latitude: vv.pos[0],
          longitude: vv.pos[1],
          width: 20,
          height: 20,
        });
        counter += 1;
      });
    });
  }
  return markers;
}
