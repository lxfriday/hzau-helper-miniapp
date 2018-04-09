/**
 * 广场主页面的列表
 * @time 2018/04/07
 * @author lxfriday
 */
import {
  getCName,
  getCSentence,
  getTime,
  getImages,
  getOneImage,
} from '../index';

export default function getListData(length = 10) {
  // const contentLengthFlag = 10; // 超过70的字符的时候收起多余的字

  const data = [];
  for (let i = 0; i < length; i++) {
    const content = getCSentence(30, 200);
    data.push({
      avatarUrl: getOneImage(),
      nickname: getCName(),
      releasedTime: getTime(i),
      // rawContent: content, // 实际的内容长度
      // displayContent: content.substr(0, contentLengthFlag), // 用来显示的内容的长度
      content,
      images: getImages(),
    });
  }
  return data;
}
