<template>
  <div class="container">
    <div class="page__hd">
      <div class="page__title">体育信息</div>
    </div>
    <div class="page__bd">
      <div class="weui-grids">
        <block v-for="(item, ind) in peService" :key="ind">
          <a :href="item.href" class="weui-grid" hover-class="weui-grid_active">
            <img class="weui-grid__icon" :src="item.src" />
            <div class="weui-grid__label">{{item.name}}</div>
          </a>
        </block>
      </div>
    </div>

    <div class="page__hd divider">
      <div class="page__title">教务信息</div>
    </div>
    <div class="page__bd">
      <div class="weui-grids">
        <block v-for="(item, ind) in jwcService" :key="ind">
          <a :href="item.href" class="weui-grid" hover-class="weui-grid_active">
            <img class="weui-grid__icon" :src="item.src" />
            <div class="weui-grid__label">{{item.name}}</div>
          </a>
        </block>
      </div>
    </div>

    <div class="page__hd divider">
      <div class="page__title">宿舍信息</div>
    </div>
    <div class="page__bd">
      <div class="weui-grids">
        <block v-for="(item, ind) in roomService" :key="ind">
          <a :href="item.href" class="weui-grid" hover-class="weui-grid_active">
            <img class="weui-grid__icon" :src="item.src" />
            <div class="weui-grid__label">{{item.name}}</div>
          </a>
        </block>
      </div>
    </div>
    <div class="weui-footer weui-footer_fixed-bottom">
      <div class="weui-footer__text">温馨提示</div>
      <div class="weui-footer__text">考试成绩暂时不可用，等程序猿锅锅考完试，再进行功能修复</div>
      <div class="weui-footer__text">在选课等特殊时间，学校的管理系统会比较不稳定，尝试重新进入页面或许会有奇效哦</div>
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
        peService: [
          { src: '/static/images/schoolservice/PE.png', name: '体测成绩', href: '/pages/pegrades/pegrades' },
        ],
        jwcService: [
          { src: '/static/images/schoolservice/jwc_termgpa.png', name: '考试成绩', href: '/pages/jwctermgpa/jwctermgpa' },
          { src: '/static/images/schoolservice/jwc_rankexamination.png', name: '等级考试', href: '/pages/jwcrankexamination/jwcrankexamination' },
          { src: '/static/images/schoolservice/jwc_termexamination.png', name: '学期考试信息', href: '/pages/jwctermexamination/jwctermexamination' },
        ],
        roomService: [
          { src: '/static/images/schoolservice/electriccharge.png', name: '宿舍电费查询', href: '/pages/electriccharge/electriccharge' },
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
  .divider{
    margin-top: 16px;
  }
</style>
