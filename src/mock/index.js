/**
 * 模拟数据的工具提盒
 * @time 2018/04/07
 * @author lxfriday
 */

import Mock from 'mockjs';
import moment from 'moment';

export default function mock(str) {
  return Mock.mock(str);
}

/**
 * 获取制定长度的中文字符串
 * @param min
 * @param max
 */
export function getCWord(min, max) {
  return mock(`@cword(${min}, ${max})`);
}

/**
 * 获取时间
 * @param i {number}
 */
export function getTime(i) {
  return moment(Date.now() - (i * 10000)).format('YYYY/MM/DD HH:mm');
}

/**
 * 获取图片
 * @param length {number} 返回的图片数组的长度
 */
// export function getImages(length = 0) {
// }
