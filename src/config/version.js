/**
 * 版本信息
 * @time 2018/03/29
 * @author lxfriday
 */
export default {
  version: 'V2.0.0',
  releaseNote: [
    {
      version: 'V2.0.0',
      note: [
        'update:取消所有UGC内容部分，只提供查询信息服务',
      ],
    },
    {
      version: 'V1.2.3',
      note: [
        'update:修复安卓手机无法显示教务管理系统验证码的问题', // base64编码实际格式为：data:image/png;base64,
      ],
    },
    {
      version: 'V1.2.1',
      note: [
        'update:修改成绩查询卡片样式',
      ],
    },
    {
      version: 'V1.2.0',
      note: [
        'new: 校园服务-成绩查询、等级考试成绩查询、考试信息查询；宿舍电费查询',
        'update:消除开发者信息',
      ],
    },
    {
      version: 'V1.1.4',
      note: ['用户注册的昵称类型限制修复'],
    },
    {
      version: 'V1.1.3',
      note: ['在用户登录、注册、退出登录成功之后都会relaunch到about页面，保证数据的同步性'],
    },
    {
      version: 'V1.1.2',
      note: ['修复注册成功后页面无响应，数据不同步显示'],
    },
    {
      version: 'V1.1.1',
      note: ['添加了学生体育课程成绩查询'],
    },
  ],
};
