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

