/**
 * 生成唯一的文件名
 * @time 2018/04/12
 * @author lxfriday
 */

const qiniuNamespace = 'hzau-helper/';

/**
 * 获取0到1000w之间的一个随机数字符串
 * @returns {string}
 */
function getRandomString() {
  return `${Math.floor(Math.random() * 10000000)}`;
}

export default () => `${qiniuNamespace}${Date.now()}-${getRandomString()}`;
