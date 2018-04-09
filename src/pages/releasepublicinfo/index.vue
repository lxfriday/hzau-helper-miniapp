<template>
  <div class="container">
    <div class="input-wrapper">
      <div class="weui-cells weui-cells_after-title noborder">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="" placeholder="新鲜事..." style="height: 12em" v-model.trim="inputContent" :maxlength="maxLength" />
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
                <block v-for="item in images" :key="index">
                  <div class="weui-uploader__file" @click="previewImage" :id="item">
                    <img class="weui-uploader__img" :src="item" mode="aspectFill" />
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
  export default {
    data() {
      return {
        maxLength: 500, // 输入的内容的最大长度为500
        content: '',
        images: [],
      };
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
            wx.showToast({
              title: '图片选择失败',
              icon: 'none',
            });
          },
        });
      },
    },

    created() {
    },
  };
</script>

<style scoped lang="less">
  .noborder {
    border: 0;
  }
</style>
mpvuetemplate
