# 校内服务

#### `/api/schoolservice/PEGrade`

`post`获取上传时要用到的的token

- cardID `String` 学号

- password `String` 密码

返回

```javascript
  r = {
   errno: Number,
   errmsg: String,
   data: {
     lakeRun: {
       teacher: String, // 老师
       current: String, // 现在的环湖跑圈数
       required: String, // 要求的环湖跑圈数
     },
     PETest: [
        [
          "2014-2015",
          "一年级",
          "刘星",
          "机制1405",
          "65.4",
          "及格",
          "查看",
        ], // ...
     ],
   },
  }
```
