/**
 * 模拟数据的工具提盒
 * @time 2018/04/07
 * @author lxfriday
 */

import Mock from 'mockjs';
import moment from 'moment';

// 存有网络图片地址的数组
const imageArr = [
  'http://qiniu1.lxfriday.xyz/weiwanimage-avatar/1ba0da38-90e4-450c-8b9c-805d918a3c73-82908.jpg',
  'http://qiniu1.lxfriday.xyz/weiwanimage-avatar/1ff7ff6c-8e51-4186-9ebc-71672c5af339-6818.jpg',
  'http://qiniu1.lxfriday.xyz/weiwanimage-avatar/20429862-2ba8-4bef-b9dc-8244390fd3bd-67929.jpg',
  'http://qiniu1.lxfriday.xyz/weiwanimage-avatar/2c67f835-a7ad-4054-a679-9cee588df8a8-39799.jpg',
  'http://qiniu1.lxfriday.xyz/weiwanimage-avatar/3f9e09a0-0429-44ac-a35e-8de46ff5f9fe-58007.jpg',
  'http://qiniu1.lxfriday.xyz/weiwanimage-avatar/42c9cd4d-53e1-4a55-93ca-86c27201ce6d-7413.jpg',
  'http://qiniu1.lxfriday.xyz/weiwanimage-avatar/44f4fc44-4fcd-426a-94c0-f0ada6c3a64e-62840.jpg',
  'http://qiniu1.lxfriday.xyz/weiwanimage-avatar/800c0e35-f5a7-4a18-9633-6acd1c1cb626-20974.jpg',
  'http://qiniu1.lxfriday.xyz/weiwanimage-avatar/9f0192c0-157b-4d43-9579-70019db06001-22572.jpg',
  'http://qiniu1.lxfriday.xyz/yurenimage/admin/0130e583-d469-47aa-a152-24d8050b3c111490779954232.jpeg',
  'http://qiniu1.lxfriday.xyz/yurenimage/admin/01a76a5d-e00d-43b7-a177-f2cdf0336d841490784904011.jpeg',
  'http://qiniu1.lxfriday.xyz/yurenimage/admin/028726e0-9a49-4cec-a8aa-229924f91a641491248359068.jpeg',
  'http://qiniu1.lxfriday.xyz/yurenimage/admin/03cc28e2-0a2d-4bbd-a061-1a8c9b28e6a01491246466016.jpeg',
  'http://qiniu1.lxfriday.xyz/yurenimage/admin/044f2357-65f2-43bf-b091-73bcd53adffb1491244099141.jpeg',
  'http://qiniu1.lxfriday.xyz/yurenimage/admin/045cead4-1166-4d70-946a-6a305506270b1490757161525.jpeg',
  'http://qiniu1.lxfriday.xyz/yurenimage/admin/051f3ccd-2a6f-4837-8e3f-c94a2d58bdf21491245297038.jpeg',
  'http://qiniu1.lxfriday.xyz/yurenimage/admin/086cc7d3-c699-477e-8b3d-951a45af23c41490779665913.jpeg',
  'http://qiniu1.lxfriday.xyz/yurenimage/admin/08b2ff53-2305-470d-b8ba-d42c8ee2c7121490784814894.jpeg',
];


export default function mock(str) {
  return Mock.mock(str);
}

/**
 * 获取制定长度的中文字符串
 * @param min
 * @param max
 */
export function getCSentence(min = 1, max = 500) {
  return mock(`@csentence(${min}, ${max})`);
}

/**
 * 获取一个中文名
 */
export function getCName() {
  return mock('@cname()');
}

/**
 * 获取时间
 * @param i {number}
 */
export function getTime(i = 0) {
  return moment(Date.now() - (i * 100000)).format('YYYY/MM/DD HH:mm');
}

/**
 * 随机获取1张图片
 */
export function getOneImage() {
  return imageArr[Math.floor(Math.random() * (imageArr.length))];
}

/**
 * 获取一个图片数组
 * @param length {number || null} 数组内容的长度，null表示长度随机
 */
export function getImages(length = null) {
  const dataLength = length || mock('@integer(2, 6)');
  const data = [];
  for (let i = 0; i < dataLength; i++) {
    data.push(getOneImage());
  }
  return data;
}
