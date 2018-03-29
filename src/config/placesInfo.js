/**
 * 华农特色的数据信息
 * @time 2018/03/28
 * @author lxfriday
 */
const placeTypeArr = {
  spot: '/static/images/placetype/place_attractions.png', // spot
  eat: '/static/images/placetype/place_restaurant.png', // eat
};

// 获取地点详情的标定的markers的配置
export function getPlaceDetailMarker(pos) {
  return [{
    iconPath: '/static/images/location.png',
    id: 0,
    latitude: pos[0],
    longitude: pos[1],
    width: 30,
    height: 30,
  }];
}

/**
 * 依据传入的类型，返回类型队形的图片
 * @param type 类型
 * @returns {string}
 */
export function getPlaceTypeIcon(type = 'spot') {
  return placeTypeArr[type];
}

export default [
  {
    name: '桃花源',
    images: [
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%A1%83%E8%8A%B1%E6%BA%9015222337995abb71c77a3fb.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%A1%83%E8%8A%B1%E6%BA%9015222338575abb72011adb1.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%A1%83%E8%8A%B1%E6%BA%9015222339155abb723b85abf.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%A1%83%E8%8A%B1%E6%BA%9015222339995abb728f8d4ae.png',
    ], // 相关的图片的数组
    type: 'spot', // 地点的类型
    introduction: '华中农业大学桃花岛位于校内东头，南湖边上，规划有序，春天桃花盛开的时候，满岛都是桃花飘香，一片红的海洋，是一个非常适合春游的好去处。杨柳青青莺欲啼，置身于桃林之中，于南湖中的垂柳，红绿交相呼应，别是一番美。南湖旁边的“果树观赏园”，华农人习惯称为“桃花岛”。亦有别称为“花果山”或“桃花源”。君不见有车自远方来，携妻带子，人面桃花相映红。一张野炊桌布，一片绚烂的花海，即可享受一天的好心情。更有甚者带了专业班子来此拍摄艺术照或婚纱照，借一份自然之秀，化为七分笑靥之纯。\n' +
    '桃花岛的桃花美须是密植成林，使它繁茂整齐一片，蔚为壮观，使人恍若置身于一大面锦秀画屏之中。最重要的是，这里赏花不收费哦！', // 地点的简介
    location: [30.472154, 114.366560],
  }, {
    name: '狮子山绿道',
    images: [
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E7%8B%AE%E5%AD%90%E5%B1%B1%E7%BB%BF%E9%81%9315222333045abb6fd8afa10.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E7%8B%AE%E5%AD%90%E5%B1%B1%E7%BB%BF%E9%81%9315222334055abb703de5073.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E7%8B%AE%E5%AD%90%E5%B1%B1%E7%BB%BF%E9%81%9315222334575abb7071d9952.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E7%8B%AE%E5%AD%90%E5%B1%B1%E7%BB%BF%E9%81%9315222335095abb70a5d996a.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E7%8B%AE%E5%AD%90%E5%B1%B1%E7%BB%BF%E9%81%9315222335485abb70ccf079d.png',
    ], // 相关的图片的数组
    type: 'spot', // 地点的类型
    introduction: '狮子山绿道位于华中农业大学内，由洪山区与华中农业大学共建、共管、共享，该项目计划投资1000万，建设期政府投入70%、学校投入30%，后期管理主要由校方负责。绿道规划长度10.37公里，沿东西向越过狮子山脊背，主体由校园入山步道、环形登山步道、中段涵洞三部分组成。这段绿道是基于原有山林消防的6至8米宽的土路上建设的，园林部门对土路原有路基硬化加沥青，两侧原有绿化基本保持原貌。', // 地点的简介
    location: [30.477467, 114.361534],
  }, {
    name: '樱花大道',
    images: [
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%A8%B1%E8%8A%B1%E5%A4%A7%E9%81%9315222345035abb7487d1f5a.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%A8%B1%E8%8A%B1%E5%A4%A7%E9%81%9320180328185437.png',
    ], // 相关的图片的数组
    type: 'spot', // 地点的类型
    introduction: '南荟路总长近五百米，沿路六米宽绿化带，经风景园林系专家论证规划后，决定强化樱花的观赏性，还将种植香樟、杜英等乔木与樱花相互映衬，打造真正的“樱花大道”。', // 地点的简介
    location: [30.473685, 114.365332],
  }, {
    name: '油菜花田',
    images: [
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%B2%B9%E8%8F%9C%E8%8A%B1%E7%94%B0pic3.jpg',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%B2%B9%E8%8F%9C%E8%8A%B1%E7%94%B0timg.jpg',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E6%B2%B9%E8%8F%9C%E8%8A%B1%E7%94%B0timg%20%281%29.jpg',
    ], // 相关的图片的数组
    type: 'spot', // 地点的类型
    introduction: '金灿灿的油菜花已开得漫天遍野，纵情肆意。油菜花田连绵起伏，蔚为壮观。小路上、花丛间，游人如织、摩肩接踵。', // 地点的简介
    location: [30.467383, 114.359812],
  }, {
    name: '南湖沿岸',
    images: [
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E5%8D%97%E6%B9%96%E6%B2%BF%E5%B2%B815222226545abb463e897af.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E5%8D%97%E6%B9%96%E6%B2%BF%E5%B2%B815222226925abb466481d77.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E5%8D%97%E6%B9%96%E6%B2%BF%E5%B2%B815222227315abb468b0f67f.png',
    ], // 相关的图片的数组
    type: 'spot', // 地点的类型
    introduction: '华农三宝，早操、听力、环湖跑。千千万万华农学子在这条沿湖大道上书写着自己的青春。', // 地点的简介
    location: [30.472649, 114.368100],
  }, {
    name: '狮子山广场',
    images: [
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E7%8B%AE%E5%AD%90%E5%B1%B1%E5%B9%BF%E5%9C%BA15222228955abb472f6b054.png',
    ], // 相关的图片的数组
    type: 'spot', // 地点的类型
    introduction: '华中农业大学狮子山广场号称全国高校中最大的校园广场。狮子山广场坐落在华中农业大学狮子山下，整个狮子山广场的建设分为了一期和二期两个工程。狮子山广场的方案规划总面积为32090平方米，绿地面积为12712平方米，常绿树覆盖面积10328平方米，达到广场面积的32%，整个广场绿化覆盖面积20979平方米，覆盖率达75%，整个广场的规划充分考虑了学校百年历史传承，并具有时代感。', // 地点的简介
    location: [30.475761, 114.357955],
  }, {
    name: '喷水池',
    images: [
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E5%96%B7%E6%B0%B4%E6%B1%A015222228185abb46e2dd6d8.png',
    ], // 相关的图片的数组
    type: 'spot', // 地点的类型
    introduction: '喷水池位于美丽的狮子山广场上。华中农业大学狮子山广场号称全国高校中最大的校园广场。狮子山广场坐落在华中农业大学狮子山下，整个狮子山广场的建设分为了一期和二期两个工程。狮子山广场的方案规划总面积为32090平方米，绿地面积为12712平方米，常绿树覆盖面积10328平方米，达到广场面积的32%，整个广场绿化覆盖面积20979平方米，覆盖率达75%，整个广场的规划充分考虑了学校百年历史传承，并具有时代感。', // 地点的简介
    location: [30.473773, 114.357966],
  }, {
    name: '亚跨',
    images: [
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E4%BA%9A%E8%B7%A815222342775abb73a5133ef.png',
    ], // 相关的图片的数组
    type: 'spot', // 地点的类型
    introduction: '亚跨是指“亚洲第一跨式建筑”，现在名为未来之窗。寓意望向未来的窗户，希望广大华农学子从此处看到未来，大家也可以登上台阶试试，看是否看到你们的未来了。', // 地点的简介
    location: [30.471100, 114.357939],
  }, {
    name: '张之洞像',
    images: [
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E5%BC%A0%E4%B9%8B%E6%B4%9E%E5%83%8F15222345835abb74d77e086.png',
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E5%BC%A0%E4%B9%8B%E6%B4%9E%E5%83%8F15222347565abb75843962a.png',
    ], // 相关的图片的数组
    type: 'spot', // 地点的类型
    introduction: '张之洞（1837～1909），字孝达,号香涛、香岩,又号壹公、无竞居士,晚年自号抱冰。汉族，直隶南皮(今河北南皮)人，清朝洋务派代表人物之一，其提出的“中学为体，西学为用”，其创办的湖北农务学堂为华中农业大学前身。以实践创新能力培养为核心，培养适应国家和社会发展需要的、具有优良的思想道德素质、高度的社会责任感和团队合作精神、具有较深厚的科学和人文素养、基础扎实、自主学习能力和实践创新能力强、个性与人格健全发展，能引领现代农业和社会建设发展、具有领袖潜质的精英人才。', // 地点的简介
    location: [30.476121, 114.359661],
  }, {
    name: '华农主楼',
    images: [
      'http://qiniu1.lxfriday.xyz/hzau-helper/%E5%8D%8E%E5%86%9C%E4%B8%BB%E6%A5%BC15222224705abb4586bb123.png',
    ], // 相关的图片的数组
    type: 'spot', // 地点的类型
    introduction: '湖广总督张之洞于1898年（光绪二十四年）上书光绪皇帝，正式奏请兴办湖北省农务学堂。同年10月正式开学。华中农业大学科技园是科技部、教育部首批认定的22个国家大学科技园之一的武汉东湖高新区国家大学科技园的重要组成部分。2000年8月，湖北省政府和武汉市政府决定共同建设武汉南湖农业高新技术产业园，将华中农业大学科技园纳入南湖农业园整体规划。2003年8月，华中农业大学科技园通过了由教育部、科技部组织的验收。', // 地点的简介
    location: [30.477088, 114.358004],
  },
];
