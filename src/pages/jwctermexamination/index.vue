<template>
  <div class="container">
    <div class="weui-cells__title yearterm">{{ yearTerm }}</div>
    <div class="page__bd" v-for="(item, ind) in examInfo" :key="ind">
      <div class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <!-- 课程名 -->
            <div class="weui-form-preview__label">{{ item.courseName }}</div>
            <!-- 考试地点 -->
            <div class="weui-form-preview__value_in-hd" style="color: #000000">{{ item.location }}</div>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <!-- 考试时间 -->
            <div class="weui-form-preview__label">{{ item.date }}</div>
            <!-- 考生姓名 -->
            <div class="weui-form-preview__value">{{ item.studentName }}</div>
          </div>
        </div>
      </div>
    </div>

    <loading-modal v-if="loading"></loading-modal>
  </div>
</template>

<script>
  /**
   * 学期考试地点时间信息查询
   * @time 2018/05/13
   * @author lxfriday
   */
  import LoadingModal from '../../components/common/LoadingModal';
  import jwcSignInStore from '../jwcsignin/store';
  import jwcTermExaminationStore from './store';
  import {
    JWC_TERM_EXAMINATION,
  } from '../../store/mutation-types';

  export default {
    data() {
      return {
      };
    },

    computed: {
      yearTerm() {
        return jwcTermExaminationStore.state.yearTerm;
      },
      examInfo() {
        return jwcTermExaminationStore.state.examInfo;
      },
      loading() {
        return jwcTermExaminationStore.state.loading;
      },
      examInfoLoaded() {
        return jwcTermExaminationStore.state.loaded;
      },
    },

    components: {
      LoadingModal,
    },

    mounted() {
      // 如果没哟度鞥路，则先跳转到登录页面，登录之后会自动跳转回到当前页面
      if (!jwcSignInStore.state.signInSuccess) {
        wx.redirectTo({
          url: '/pages/jwcsignin/jwcsignin?from=/pages/jwctermexamination/jwctermexamination',
        });
      } else {
        jwcTermExaminationStore.dispatch({
          type: JWC_TERM_EXAMINATION,
          payload: {
            studentId: jwcSignInStore.state.studentInfo.studentId,
            cookie: jwcSignInStore.state.studentInfo.cookie,
          },
        });
      }
    },
  };
</script>

<style scoped lang="less">
  .container {
    .yearterm {
      color: #333333;
      font-size: 18px;
    }
  }
</style>
