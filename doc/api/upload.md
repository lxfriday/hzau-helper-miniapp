# 关于上传

#### `/api/upload/token`

`get`获取上传时要用到的的token

返回

```javascript
  r = {
   errno: Number,
   errmsg: String,
   data: {
     token: String,
   },
  }
```
