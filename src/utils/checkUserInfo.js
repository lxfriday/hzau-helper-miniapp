/**
 * 正则教研用户输入的内容
 * @time 2018/04/12
 * @author lxfriday
 */

/**
 * 检测手机号的格式
 * @param phone {string}
 * @returns {boolean}
 */
export function checkPhone(phone) {
  if (!/^1[0-9]{10}$/.test(phone)) {
    wx.showToast({
      title: '手机号格式不正确',
      icon: 'none',
    });
    return false;
  }
  return true;
}

/**
 * 教研密码的格式
 * @param pass {string}
 * @returns {boolean}
 */
export function checkPassword(pass) {
  if (!/^\w{9,18}$/.test(pass)) {
    wx.showToast({
      title: '密码长度为9到18位',
      icon: 'none',
    });
    return false;
  }
  return true;
}
