import { POST, GET } from '../utils/request';

// pro
const serverDomain = 'https://hzauhelper.lxfriday.xyz/api';
// dev
// const serverDomain = 'http://192.168.31.202:8360/api'; // 后端服务器的地址

export async function PEGradeService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/PEGrade`, // 体育管理系统的成绩查询
    data,
  });
}

export async function jwcVerifyCodeService(data) {
  return await GET({
    url: `${serverDomain}/schoolservice/jwcVerifyCode`,
    data,
  });
}

// 登录教务管理系统
export async function jwcLoginService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/jwcSignIn`,
    data,
  });
}

// 教务管理系统-考试成绩
export async function jwcTermGPAService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/jwcTermGPA`,
    data,
  });
}

// 教务管理系统-等级考试
export async function jwcRankExamService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/jwcRankExamination`,
    data,
  });
}

// 教务管理系统-考试时间地点
export async function jwcExamTimeService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/jwcTermExamination`,
    data,
  });
}

// 荟、博的所有宿舍建筑信息
export async function dormitoryElectricChargeAllBuildingInfoService(data) {
  return await GET({
    url: `${serverDomain}/schoolservice/electricChargeAllBuildingInfo`,
    data,
  });
}

// 获取宿舍某一层的所有房间信息
export async function dormitoryElectricChargeBuildingFloorRoomService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/electricChargeBuildingFloorRoom`,
    data,
  });
}

// 宿舍某个房间的电量查询
export async function dormitoryElectricChargeRoomChargeService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/electricChargeRoomCharge`,
    data,
  });
}

// 获取获取登录现代教育技术中心的验证码等相关的头信息
export async function zizhuSignInCodeService(data) {
  return await GET({
    url: `${serverDomain}/schoolservice/zizhuSignInCode`,
    data,
  });
}

// 登录现代教育技术中心
export async function zizhuSignInService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/zizhuSignIn`,
    data,
  });
}

// 首页 zizhu.hzau.edu.cn/home 的信息提取 用户信息，在线信息，产品信息
export async function zizhuNormalInfoService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/zizhuNormalInfo`,
    data,
  });
}

// 缴费清单
export async function zizhuPaymentListService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/zizhuPaymentList`,
    data,
  });
}


// 馆藏系统特色 pathtoken /F/ 后面的一串字符串
export async function libraryPathTokenService(data) {
  return await GET({
    url: `${serverDomain}/schoolservice/libraryPathToken`,
    data,
  });
}

// 缴费清单
export async function librarySearchBookService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/librarySearchBook`,
    data,
  });
}

// 馆藏书某页书的查询
export async function libraryPageRecordService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/libraryPageRecord`,
    data,
  });
}

// 馆藏系统搜索推荐
export async function librarySearchSuggestService(data) {
  return await POST({
    url: `${serverDomain}/schoolservice/librarySearchSuggest`,
    data,
  });
}
