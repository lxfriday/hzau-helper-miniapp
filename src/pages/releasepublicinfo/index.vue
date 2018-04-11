<template>
  <div class="container">
    <picker @change="bindTypePickerChange" :value="type.id" :range="types">
      <div class="top-noti-wrapper">
        <div class="notitext" >
          {{ type.text }}
        </div>
      </div>
    </picker>
    <div class="input-wrapper">
      <div class="weui-cells weui-cells_after-title weui-cells_noborder">
        <div class="weui-cell ">
          <div class="weui-cell__bd">
            <textarea class="" placeholder="想说什么呢..." style="height: 12em" v-model.trim="inputContent" :maxlength="maxLength" />
            <div class="weui-textarea-counter">{{ content.length }}/{{ maxLength }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="weui_cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <div class="weui-uploader__title">图片上传</div>
            </div>
            <div class="weui-uploader__bd">
              <div class="weui-uploader__files" id="uploaderFiles">
                <block v-for="(item, index) in images" :key="index">
                  <div class="weui-uploader__file img-wrapper" :id="item">
                    <div class="delete-wrapper" @click="deleteSelectedImage(index)">
                      <img src="/static/images/delete_32x32.png">
                    </div>
                    <img class="weui-uploader__img" :src="item" mode="aspectFill" @click="previewImage" />
                  </div>
                </block>
              </div>
              <div class="weui-uploader__input-box">
                <div class="weui-uploader__input" @click="chooseImage"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <button class="weui-btn" type="primary" @click="submit" plain="true">发布</button>
    </div>
  </div>
</template>

<script>
  /**
   * 在公共区域发布信息的页面
   * @time 2018/04/09
   * @author lxfriday
   */
  import NotiText from '../../components/common/NotiText';

  function getType(id = 0) {
    const types = [{
      id: 'ground',
      text: '广场',
    }, {
      id: 'lostandfound',
      text: '失物招领',
    }, {
      id: 'eatandhavefun',
      text: '吃喝玩乐',
    }];
    return types[id];
  }

  export default {
    data() {
      return {
        maxLength: 500, // 输入的内容的最大长度为500
        content: '',
        images: [],
        types: ['广场', '失物招领', '吃喝玩乐'],
        type: getType(),
      };
    },

    components: {
      NotiText,
    },

    computed: {
      inputContent: {
        get() {
          return this.content;
        },
        set(text) {
          this.content = text;
        },
      },
    },

    methods: {
      bindTypePickerChange(e) {
        this.type = getType(+e.mp.detail.value);
      },
      // 删除选中的图片
      deleteSelectedImage(index) {
        this.images = this.images.filter((v, i) => i !== index);
      },
      // 点击发布
      submit() {
        // const that = this;
        wx.showToast({
          title: JSON.stringify({
            images: this.images,
          }),
        });
      },
      // 预览图片
      previewImage(e) {
        wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.images, // 需要预览的图片http链接列表
        });
      },
      // 选择图片
      chooseImage() {
        const that = this;
        wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success(res) {
            console.log(`成功上传${res.tempFilePaths}`);
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.images = that.images.concat(res.tempFilePaths);
          },
          fail() {
            // 取消图片选择也会导致fail回调被触发
          },
        });
      },
    },
    onUnload() {
      // 退出页面的时候，复原原有的值
      // this.$options.data() 重新调用data函数返回的数据值
      Object.assign(this.$data, this.$options.data());
    },
  };
</script>

<style scoped lang="less">
  .weui-cells_noborder:before {
    border-top: 0;
  }
  .container {
    .top-noti-wrapper {
      margin: 12px 12px 0;

      .notitext {
        font-weight: bold;
        font-size: 16px;
        border-left: 5px solid #5D4037;
        padding-left: 5px;
      }
    }

    .img-wrapper {
      position: relative;

      .delete-wrapper {
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,.3);

        img {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
</style>
