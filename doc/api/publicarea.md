# 用户

#### `/api/publicarea/submit`

发表广场的动态

- token `String` 令牌

- type `String` 类型 `ground` `lostandfound` `eatandhavefun`

- images `Array` 选中的图片数组

- content `String` 动态的文字内容(长度最大为500)


返回

```javascript
  r = {
     success: Boolean, // 成功还是失败
     errMsg: String, // 调用失败的时候的提示消息
  }
```

#### `/api/publicarea/index`

广场主页面列表

- page `Number` 页数

返回

```javascript
  r = {
     data: {
       list: [
         {
             avatarUrl: String, // 用户头像
             nickname: String, // 用户昵称
             releasedTime: String, // 发布的时间，已经经过转换，可直接用于显示
             content: String, // 动态的内容
             images: Array, // 图片地址数组
         }, // ...
       ],
     },
     success: Boolean, // 成功还是失败
     errMsg: String, // 调用失败的时候的提示消息
  }
```

#### `/api/publicarea/lostAndFound`

广场的失物招领

- page `Number` 页数

返回

```javascript
  r = {
     data: {
       list: [
         {
             avatarUrl: String, // 用户头像
             nickname: String, // 用户昵称
             releasedTime: String, // 发布的时间，已经经过转换，可直接用于显示
             content: String, // 动态的内容
             images: Array, // 图片地址数组
         }, // ...
       ],
     },
     success: Boolean, // 成功还是失败
     errMsg: String, // 调用失败的时候的提示消息
  }
```

#### `/api/publicarea/eatAndHaveFun`

广场的吃喝玩乐

- page `Number` 页数

返回

```javascript
  r = {
     data: {
       list: [
         {
             avatarUrl: String, // 用户头像
             nickname: String, // 用户昵称
             releasedTime: String, // 发布的时间，已经经过转换，可直接用于显示
             content: String, // 动态的内容
             images: Array, // 图片地址数组
         }, // ...
       ],
     },
     success: Boolean, // 成功还是失败
     errMsg: String, // 调用失败的时候的提示消息
  }
```

#### `/api/publicarea/viewcount`

`post` 页面查看次数统计

- id `String` 记录的id

返回

```javascript
  r = {
     data: {},
     success: Boolean, // 成功还是失败
     errMsg: String, // 调用失败的时候的提示消息
  }
```
