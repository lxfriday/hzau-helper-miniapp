/**
 * 版本信息
 * @time 2018/03/29
 * @author lxfriday
 */
export default {
  version: 'V3.0.1',
  releaseNote: [
    {
      version: 'V3.0.1',
      note: [
        '[update] 暂时关闭敬请期待',
        '[update] 教务管理系统登录、关于页面添加广告位',
        '[update] 地图定位改为直接定位到行政楼',
        '[update] 修改校内服务提示语',
      ],
    },
    {
      version: 'V3.0.0',
      note: [
        '[update]:将地图和特色地点功能整合作为二级页面',
        '[new]:新增敬请期待tab，随后进行功能新增',
      ],
    },
    {
      version: 'V2.0.2',
      note: [
        '[update]:添加输入用户名、密码之后的记忆功能(体测、教务管理系统)',
        '[update]:\'体育查分\' => \'体测成绩\' 命名语义化优化',
        '[new]:添加华中农业大学校庆宣传图',
      ],
    },
    {
      version: 'V2.0.0',
      note: [
        '[update]:取消所有UGC内容部分，只提供查询信息服务',
      ],
    },
    {
      version: 'V1.2.3',
      note: [
        '[update]:修复安卓手机无法显示教务管理系统验证码的问题', // base64编码实际格式为：data:image/png;base64,
      ],
    },
    {
      version: 'V1.2.1',
      note: [
        '[update]:修改成绩查询卡片样式',
      ],
    },
    {
      version: 'V1.2.0',
      note: [
        '[new]:校园服务-成绩查询、等级考试成绩查询、考试信息查询；宿舍电费查询',
        '[update]:消除开发者信息',
      ],
    },
    {
      version: 'V1.1.4',
      note: ['[update]:用户注册的昵称类型限制修复'],
    },
    {
      version: 'V1.1.3',
      note: ['[update]:在用户登录、注册、退出登录成功之后都会relaunch到about页面，保证数据的同步性'],
    },
    {
      version: 'V1.1.2',
      note: ['[update]:修复注册成功后页面无响应，数据不同步显示'],
    },
    {
      version: 'V1.1.1',
      note: ['[update]:添加了学生体育课程成绩查询'],
    },
  ],
};
