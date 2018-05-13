<template>
  <div class="container">
    termgpa
  </div>
</template>

<script>
  /**
   * 所有学期成绩查询
   * @time 2018/05/13
   * @author lxfriday
   */
  import jwcSignInStore from '../jwcsignin/store';

  export default {
    data() {
      return {
      };
    },

    components: {
    },

    computed: {

    },

    mounted() {
      if (!jwcSignInStore.state.signInSuccess) {
        wx.redirectTo({
          url: '/pages/jwcsignin/jwcsignin?from=/pages/jwctermpga/jwctermpga',
        });
      }
    },
  };
</script>

<style scoped lang="less">
</style>
