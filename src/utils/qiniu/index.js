import qiniuUploader from './qiniuUploader';

const uptoken = 'zlvMwqEQx1Yir9urPO0cwCAUt-7PMXUJWZnRY35S:u2-VTVdOE81yRgAS-o3Sk-maTN0=:eyJyZXR1cm5Cb2R5Ijoie1wia2V5XCI6XCIkKGtleSlcIixcImhhc2hcIjpcIiQoZXRhZylcIixcImZzaXplXCI6JChmc2l6ZSksXCJidWNrZXRcIjpcIiQoYnVja2V0KVwiLFwibmFtZVwiOlwiJCh4Om5hbWUpXCJ9Iiwic2NvcGUiOiJzdG9yYWdlIiwiZGVhZGxpbmUiOjE1MjM1MjQ1ODN9';

function initQiniu(token) {
  const options = {
    region: 'ECN', // 华北区
    uptoken: token,
    domain: 'qiniu1.lxfriday.xyz',
    shouldUseQiniuFileName: false,
  };
  qiniuUploader.init(options);
}

initQiniu(uptoken);

export default function (filePath) {
  qiniuUploader.upload(filePath, (res) => {
    // 成功之后的回调
    console.log(res);
  }, (error) => {
    console.error(`error => ${JSON.stringify(error)}`);
  }, null // 可以使用上述参数，或者使用 null 作为参数占位符
    //  {
    //     region: 'NCN', // 华北区
    //     uptokenURL: 'https://[yourserver.com]/api/uptoken',
    //     domain: 'http://[yourBucketId].bkt.clouddn.com',
    //     shouldUseQiniuFileName: false
    //     key: 'testKeyNameLSAKDKASJDHKAS'
    //     uptokenURL: 'myServer.com/api/uptoken'
    // }
    , (progress) => {
      console.log('上传进度', progress.progress);
      console.log('已经上传的数据长度', progress.totalBytesSent);
      console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend);
    },
  );
}
