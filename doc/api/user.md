# 用户

#### `/api/user/signUp`

`post`用户注册

- avatarUrl `String` 头像地址

- nickname `String` 昵称

- phone `String` 手机号

- password `String` 密码

- verifyCode `String` 注册的验证码

返回

```javascript
  r = {
     data: {
       token: String,
       avatarUrl: String,
       nickname: String,
       phone: String,
     },
     errno: Number, // 成功还是失败
     errmsg: String, // 调用失败的时候的提示消息
  }
```

#### `/api/user/signIn`

`post`用户登录

- phone `String` 手机号

- password `String` 密码

返回

```javascript
  r = {
     data: {
       token: String,
       avatarUrl: String,
       nickname: String,
       phone: String,
     },
     errno: Number, // 成功还是失败
     errmsg: String, // 调用失败的时候的提示消息
  }
```

#### `/api/user/getVerifyCode`

`post`注册的时候，发送验证码

- phone `String` 手机号

返回

```javascript
  r = {
     errno: Number, // 成功还是失败
     errmsg: String, // 调用失败的时候的提示消息
  }
```
