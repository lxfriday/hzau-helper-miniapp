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
