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
import AUTHOR_INFO from '../../config/authorInfo';

export default {
  data() {
    return {
      authorInfo: {
        avatarUrl: AUTHOR_INFO.avatarUrl,
        nickName: AUTHOR_INFO.nickName,
        classInfo: AUTHOR_INFO.classInfo,
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
