/**
 * 封装的请求
 * @time 2018/04/25
 * @author lxfriday
 */

export const POST = ({
  url = '',
  data = {},
  success = () => {},
  fail = () => {},
  complete = () => {},
} = {}) => wx.request({
  url,
  method: 'POST',
  header: {
    'content-type': 'application/json',
  },
  data,
  success,
  fail,
  complete,
});


export const GET = ({
  url = '',
  data = {},
  success = () => {},
  fail = () => {},
  complete = () => {},
} = {}) => wx.request({
  url,
  method: 'GET',
  data,
  success,
  fail,
  complete,
});

export default {
  POST,
  GET,
};
