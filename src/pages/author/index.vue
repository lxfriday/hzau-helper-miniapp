<template>
  <div class="container">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="authorInfo.avatarUrl" :src="authorInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="authorInfo.nickName"></card>
        <card :text="authorInfo.classInfo"></card>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 关于
 */
import card from '@/components/card';

export default {
  data() {
    return {
      authorInfo: {
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/3X0WGwRv8SBVfhTy4R3D2J8JExWBKJ5M7FYICWPjfRXgw5wDLe9eqoVvpaQkOVveILuDviaKYQtMXL8khG95CAQ/0',
        nickName: '刘星',
        classInfo: '机械设计制造及其自动化15级学生',
      },
    };
  },

  components: {
    card,
  },

  methods: {
  },

  created() {
  },
};
</script>

<style scoped>
 .container {
   padding: 200rpx 0;
 }

.userinfo {
  display: flex;
  width: 100%;
  height: 350rpx;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 180rpx;
  height: 180rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aaa;
}
</style>
