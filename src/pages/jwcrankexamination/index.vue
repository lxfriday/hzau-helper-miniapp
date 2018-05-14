<template>
  <div class="container">
    <div class="card_wrapper" v-for="(item, ind) in rankExamResultInfo" :key="ind">
      <!-- yearterm 和 考号 -->
      <div class="yearterm_examid">
        <div class="yearterm">
          {{ item.yearTerm }}
        </div>
        <div class="examid">
          {{ item.examId }}
        </div>
      </div>

      <div class="exam_name">
        {{ item.examName }}
      </div>

      <div class="exam_time">
        考试时间：{{ item.date }}
      </div>

      <div class="exam_result">
        考试成绩：<span>{{ item.result }}</span>
      </div>

      <!-- 映月湖等级考试的详细数据：听力、阅读、写作 -->
      <div class="eng_exam_detail" v-if="item.engListeningResult && item.engReadingResult && item.engWritingingResult">
        <div class="eng_exam_detail_item">
          听力：<span>{{ item.engListeningResult }}</span>
        </div>
        <div class="eng_exam_detail_item">
          阅读：<span>{{ item.engReadingResult }}</span>
        </div>
        <div class="eng_exam_detail_item">
          写作：<span>{{ item.engWritingingResult }}</span>
        </div>
      </div>
    </div>
    <loading-modal v-if="loading" />
  </div>
</template>

<script>
  /**
   * 学生的等级考试成绩查询
   * @time 2018/05/14
   * @author lxfriday
   */
  import LoadingModal from '../../components/common/LoadingModal';
  import jwcSignInStore from '../jwcsignin/store';
  import jwcRankExaminationStore from './store';
  import {
    JWC_RANK_EXAMINATION,
  } from '../../store/mutation-types';

  export default {
    data() {
      return {
      };
    },

    components: {
      LoadingModal,
    },

    computed: {
      loading() {
        return jwcRankExaminationStore.state.loading;
      },
      rankExamResultInfo() {
        return jwcRankExaminationStore.state.rankExamResultInfo;
      },
      rankExamResultInfoLoaded() {
        return jwcRankExaminationStore.state.loaded;
      },
    },

    mounted() {
      if (!jwcSignInStore.state.signInSuccess) {
        wx.redirectTo({
          url: '/pages/jwcsignin/jwcsignin?from=/pages/jwcrankexamination/jwcrankexamination',
        });
      } else {
        jwcRankExaminationStore.dispatch({
          type: JWC_RANK_EXAMINATION,
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
    .card_wrapper {
      margin-bottom: 15px;
      box-shadow: 0 0 1px #aaaaaa;
      padding: 3px 0;
      .yearterm_examid {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        font-size: 16px;
        .yearterm {
          color: #888888;
        }
        .examid {
          color: #143250;
        }
      }

      .exam_name {
        padding: 3px 12px;
        font-size: 18px;
        color: #000000;
      }
      .exam_time {
        padding: 1px 12px;
        font-size: 16px;
        color: #888888;
      }
      .exam_result {
        padding: 1px 12px;
        font-size: 16px;
        color: #888888;

        span {
          color: #03A9F4;
          font-size: 20px;
        }
      }
      .eng_exam_detail {
        .eng_exam_detail_item {
          font-size: 16px;
          color: #888888;
          padding: 1px 12px;
          span {
            color: #000000;
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
