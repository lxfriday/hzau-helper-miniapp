/**
 * api接口地址
 * @time 2018/04/12
 * @author lxfriday
 */
export const qiniuDomain = 'qiniu1.lxfriday.xyz';

// production
const serverDomain = 'https://hzauhelper.lxfriday.xyz/api'; // 后端服务器的地址
// development
// const serverDomain = 'http://192.168.31.202:8360/api'; // 后端服务器的地址

export default {
  upload: {
    getToken: `${serverDomain}/upload/token`, // 获取上传用的token
  },
  user: {
    signUp: `${serverDomain}/user/signUp`, // 注册
    signIn: `${serverDomain}/user/signIn`, // 登录
    getVerifyCode: `${serverDomain}/user/getVerifyCode`, // 注册的时候，发送验证码
  },
  publicarea: {
    submit: `${serverDomain}/publicarea/submit`, // 发表广场的动态，
    index: `${serverDomain}/publicarea/index`, // 广场的首页列表
    lostAndFound: `${serverDomain}/publicarea/lostAndFound`, // 广场的失物招领
    eatAndHaveFun: `${serverDomain}/publicarea/eatAndHaveFun`, // 广场的吃喝玩乐
  },
  places: {
    placeList: `${serverDomain}/places/placeList`, // 华农特色的地点列表
  },
  schoolService: {
    PEGrade: `${serverDomain}/schoolservice/PEGrade`, // 体育管理系统的成绩查询
    // 宿舍电费
    electricCharge: {
      allBuildingInfo: `${serverDomain}/schoolservice/electricChargeAllBuildingInfo`, //  荟、博的所有宿舍建筑信息
      buildingFloorRoom: `${serverDomain}/schoolservice/electricChargeBuildingFloorRoom`, //  获取宿舍某一层的所有房间信息
      roomCharge: `${serverDomain}/schoolservice/electricChargeRoomCharge`, //  宿舍某个房间的电量查询
    },
    // 教务管理系统
    jwc: {
      verifyCode: `${serverDomain}/schoolservice/jwcVerifyCode`, // 教务管理系统登录时候的验证码和cookie对
      signIn: `${serverDomain}/schoolservice/jwcSignIn`, //  登录教务管理系统
      termGPA: `${serverDomain}/schoolservice/jwcTermGPA`, // 获取教务管理系统的所有学期成绩
      rankExamination: `${serverDomain}/schoolservice/jwcRankExamination`, //  学生等级考试成绩查询
      termExamination: `${serverDomain}/schoolservice/jwcTermExamination`, //  获取教务管理系统的本学期考试时间教室信息
    },

  },
  settings: {
    advice: `${serverDomain}/settings/advice`, // 意见建议的反馈
  },
};
