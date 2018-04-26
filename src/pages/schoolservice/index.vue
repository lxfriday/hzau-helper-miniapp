<template>
  <div class="container">
    <div class="page__hd">
      <div class="page__title">学生服务</div>
    </div>
    <div class="page__bd">
      <div class="weui-grids">
        <block v-for="item in studentService" :key="index">
          <a :href="item.href" class="weui-grid" hover-class="weui-grid_active">
            <img class="weui-grid__icon" :src="item.src" />
            <div class="weui-grid__label">{{item.name}}</div>
          </a>
        </block>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 校内服务
   * @time 2018/04/07
   * @author lxfriday
   */
  export default {
    data() {
      return {
        studentService: [
          { src: '/static/images/schoolservice/PE.png', name: '体育查分', href: '/pages/pegrades/pegrades' },
          { src: '/static/images/schoolservice/more.png', name: '敬请期待', href: '#' },
        ],
      };
    },

    methods: {
    },

    created() {
    },
  };
</script>

<style scoped lang="less">
</style>
