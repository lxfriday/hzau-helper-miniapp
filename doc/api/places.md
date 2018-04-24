# 华农特色

#### `/api/places/placeList`

华农特色的地点列表

- page `Number` 页数

返回

```javascript
  r = {
     data: {
       list: [
          {
            name: String, // 地点名称
            images: Array, // 相关的图片的数组
            type: String, // 地点的类型 `spot` `eat`
            introduction: String, // 地点的简介
            location: Array, // 地点 [纬度, 精度]
          }, // ...
       ],
     },
     success: Boolean, // 成功还是失败
     errMsg: String, // 调用失败的时候的提示消息
  }
```
