# 校内服务

#### `/api/schoolservice/PEGrade`

`POST`获取上传时要用到的的token

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

#### `/api/schoolservice/electricChargeAllBuildingInfo`

`GET`荟、博的所有宿舍建筑信息

返回

```javascript
  r = {
     errno: Number,
     errmsg: String,
     data: [
        {
            buildingId: Number, // 楼层id 143 
            buildingName: String, // 楼层名 荟01栋
            buildingMaxFloor: Number, // 建筑最高层 6
            buildingMinFloor: Number // 建筑最底层 1
         }, // ...
     ],
  }
```


#### `/api/schoolservice/electricChargeBuildingFloorRoom`

`POST`获取宿舍某一层的所有房间信息

- buildingId `Number` 宿舍楼栋的id
- floor `Number` 楼层

返回

```javascript
  r = {
     errno: Number,
     errmsg: String,
     data: [
       {
          roomId: Number, // 房间的id 22206
          roomAlias: String, // 房间的名称 荟8-2713
       }, // ...
     ],
  }
```


#### `/api/schoolservice/electricChargeRoomCharge`

`POST`宿舍某个房间的电量查询

- roomId `Number` 宿舍的id

返回

```javascript
  r = {
     errno: Number,
     errmsg: String,
     data: {
        lastTime: String, // 最后一次抄表时间
        total: Number, // 总电量
        available: Number, // 可用电量
        overdraft: Number, // 透支电量
        name: String, // 名称：电量
     },
  }
```


#### `/api/schoolservice/jwcVerifyCode`

`GET`获取登录时候的验证码、cookie、viewstate

返回

```javascript
  r = {
     errno: Number,
     errmsg: String,
     data: {
        cookie: String,
        img: String, // base64编码的图片
        viewstate, // 状态
     },
  }
```


#### `/api/schoolservice/jwcSignIn`

`POST`登录教务管理系统

- studentId `String` 学号
- password `String` 密码
- verifyCode `String` 验证码
- cookie `String` cookie
- viewstate `String` 状态

返回

```javascript
  r = {
     errno: Number,
     errmsg: String,
     data: {
        loginSuccess: Boolean, // 登录是否成功，登录成功之后，cookie便可以 通过识别
        studentId: String, // 用户学号
        cookie: String, // 用户cookie
     },
  }
```


#### `/api/schoolservice/jwcTermExamination`

`POST`获取教务管理系统的本学期考试时间教室信息

- studentId `String` 学号
- cookie `String` cookie

返回

```javascript
  r = {
     errno: Number,
     errmsg: String,
     data: {
       yearTerm: String, // 学年学期 2016-2017-2
       examInfo: [
         {
           courseName: String,  // 课程名称 液压传动
           studentName: String,  // 学生姓名 刘星
           date: String,  // 考试时间 2018年05月17日(08:00-10:00)
           location: String,  // 考试地点 二教101
         }, // ...
       ],
     },
  }
```
