/**
 * 定义mutation-type
 * @time 2018/04/24
 * @author lxfriday
 */
// eslint-disable-next-line
export const PUBLICAREA_LOADING_TRUE = 'PUBLICAREA_LOADING_TRUE';
export const PUBLICAREA_LOADING_FALSE = 'PUBLICAREA_LOADING_FALSE';
export const PUBLICAREA_LIST = 'PUBLICAREA_LIST';


// 用户注册登录
export const USER_SIGNIN_LOADING_TRUE = 'USER_SIGNIN_LOADING_TRUE'; // 登录的时候加载中
export const USER_SIGNIN_LOADING_FALSE = 'USER_SIGNIN_LOADING_FALSE'; // 登录的时候没有加载
export const USER_SIGNUP_LOADING_TRUE = 'USER_SIGNUP_LOADING_TRUE'; // 注册的时候加载中
export const USER_SIGNUP_LOADING_FALSE = 'USER_SIGNUP_LOADING_FALSE'; // 注册的时候没有加载
export const USER_SIGNIN = 'USER_SIGNIN'; // 用户登录
export const USER_SIGNUP = 'USER_SIGNUP'; // 用户注册
export const USER_SIGNOUT = 'USER_SIGNOUT'; // 用户退出登录
// 获取用户登录之后存储在本地的信息
export const USER_SIGNIN_FROM_LOCAL = 'USER_SIGNIN_FROM_LOCAL';
export const USER_SIGNUP_SEND_VERIFYCODE = 'USER_SIGNUP_SEND_VERIFYCODE'; // 注册的时候发送验证码
