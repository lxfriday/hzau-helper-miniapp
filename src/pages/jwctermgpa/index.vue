<template>
  <div class="container">
    <div class="card_wrapper" v-for="(item, ind) in examResultInfo" :key="ind">
      <div class="yearterm_college">
        <div class="yearterm">
          {{ item.yearTerm }}
        </div>
        <div class="college">
          {{ item.college }}
        </div>
      </div>
      <div class="course_name_type">
        <div class="coursename">
          {{ item.courseName }}
        </div>
        <div class="coursetype">
          {{ item.courseType }}
        </div>
      </div>
      <div class="courseinfo_wrapper">
        <div class="coursegrade">
          <span>成绩：</span>
          <span class="info">{{ item.courseGrade }}</span>
        </div>
        <div class="gpa">
          <span>绩点：</span>
          <span class="info">{{ item.gpa }}</span>
        </div>
        <div class="credit">
          <span>学分：</span>
          <span class="info">{{ item.credit }}</span>
        </div>
      </div>
    </div>
    <loading-modal v-if="loading" />
  </div>
</template>

<script>
  /**
   * 所有学期成绩查询
   * @time 2018/05/14
   * @author lxfriday
   */
  import LoadingModal from '../../components/common/LoadingModal';
  import jwcSignInStore from '../jwcsignin/store';
  import jwcTermGPAStore from './store';
  import {
    JWC_TERM_GPA,
  } from '../../store/mutation-types';

  export default {

    components: {
      LoadingModal,
    },

    computed: {
      loading() {
        return jwcTermGPAStore.state.loading;
      },
      examResultInfo() {
        return jwcTermGPAStore.state.examResultInfo;
      },
      examResultInfoLoaded() {
        return jwcTermGPAStore.state.loaded;
      },
    },

    mounted() {
      if (!jwcSignInStore.state.signInSuccess) {
        wx.redirectTo({
          url: '/pages/jwcsignin/jwcsignin?from=/pages/jwctermgpa/jwctermgpa',
        });
      } else {
        jwcTermGPAStore.dispatch({
          type: JWC_TERM_GPA,
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
    padding-bottom: 30px;
    .card_wrapper {
      border-top: 1px solid #cccccc;
      padding: 3px 0;
      .yearterm_college {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        font-size: 16px;
        .yearterm {
          color: #888888;
        }
        .college {
          font-size: 12px;
          color: #143250;
        }
      }
      .course_name_type {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 3px 12px;

        .coursename {
          font-size: 20px;
          color: #000000;
        }
        .coursetype {
          margin-left: 30px;
          font-size: 12px;
          color: #4DB6AC;
        }
      }
      .courseinfo_wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 3px 12px;
        font-size: 14px;
        color: #aaaaaa;

        .info {
          font-size: 16px;
          color: #666666;
        }
        .coursegrade {
        }
        .gpa {
          margin-left: 12px;
        }
        .credit {
          margin-left: 12px;
        }
      }
    }
  }
</style>
