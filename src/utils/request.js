/**
 * 封装的请求
 * @time 2018/04/25
 * @author lxfriday
 */
import Taro from '@tarojs/taro';

export const POST = ({
   url = '',
   data = {},
 } = {}) => Taro.request({
  url,
  method: 'POST',
  header: {
    'content-type': 'application/json',
  },
  data,
})
  .then(res => {
    return res.data;
  })
  .catch(() => Taro.showToast({ title: '请求数据失败', icon: 'none' }));


export const GET = ({
  url = '',
  data = {},
} = {}) => Taro.request({
  url,
  method: 'GET',
  data,
})
  .then(res => {
    return res.data;
  })
  .catch(() => Taro.showToast({ title: '请求数据失败', icon: 'none' }));

export default {
  POST,
  GET,
};
