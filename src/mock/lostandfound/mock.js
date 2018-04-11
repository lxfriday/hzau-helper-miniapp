/**
 * 失物招领列表的数据
 * @time 2018/04/11
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
  const data = [];
  for (let i = 0; i < length; i++) {
    const content = getCSentence(30, 200);
    data.push({
      avatarUrl: getOneImage(),
      nickname: getCName(),
      releasedTime: getTime(i),
      content,
      images: getImages(),
    });
  }
  return data;
}
