/**
 * api接口地址
 * @time 2018/04/12
 * @author lxfriday
 */
export const qiniuDomain = 'qiniu1.lxfriday.xyz';

const serverDomain = 'https://hzauhelper.lxfriday.xyz/api'; // 后端服务器的地址

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
  },
  settings: {
    advice: `${serverDomain}/settings/advice`, // 意见建议的反馈
  },
};
