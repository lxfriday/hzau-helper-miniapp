/**
 * 路由
 * @time 2019/01/12
 * @author lxfriday
 */
export default {
  pe: {
    login: '/pages/schoolservice/pe/login/index',
    result: '/pages/schoolservice/pe/result/index',
  },

  jwc: {
    login: '/pages/schoolservice/jwc/login/index', // 登录教务管理系统
    termgpa: '/pages/schoolservice/jwc/termgpa/index', // 考试成绩
    rankexam: '/pages/schoolservice/jwc/rankexam/index', // 等级考试成绩
    examtime: '/pages/schoolservice/jwc/examtime/index', // 考试时间查询
  },

  library: {
    index: '/pages/schoolservice/library/search/index', // 图书馆-馆藏书搜索
  },

  dormitory: {
    electricity: '/pages/schoolservice/dormitory/electricity/index', // 电费查询
  },

  zizhu: {
    login: '/pages/schoolservice/zizhu/login/index', // 现代教育技术中心登录页面
    normalinfo: '/pages/schoolservice/zizhu/normalinfo/index', // 网费查询
    paymentlist: '/pages/schoolservice/zizhu/paymentlist/index', // 网费查询
  },
};
