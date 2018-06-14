<template>
  <div class="container">
    <div v-if="!haveChecked" class="form">
      <div class="input-area">
        <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label">学号</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" maxlength="13" v-model="studentID" type="text" />
            </div>
          </div>
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label">密码</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" maxlength="25"  v-model="password" type="password" />
            </div>
          </div>
        </div>
      </div>
      <checkbox-group @click="handleClickRem">
        <label class="weui-agree">
          <div class="weui-agree__text">
            <checkbox class="weui-agree__checkbox" id="weuiAgree" value="agree" :checked="rememberInfoFlag" />
            <div class="weui-agree__checkbox-icon">
              <icon class="weui-agree__checkbox-icon-check" type="success_no_circle" size="9" v-if="rememberInfoFlag"></icon>
            </div>
            记住密码
          </div>
        </label>
      </checkbox-group>
      <div class="weui-btn-area bottom-submit-wrapper">
        <button class="weui-btn" type="primary" @click="submit" plain="true">{{ loading? '查询中' : '查询' }}</button>
        <div class="noti">默认密码为：888888</div>
      </div>
    </div>

    <div v-if="haveChecked" class="display-area">
      <div class="weui-cells__title">环湖跑</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">任课老师</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" maxlength="13" v-model="lakeRun.teacher" type="text" disabled />
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">当前成绩</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" maxlength="13" v-model="lakeRun.current" type="text" disabled />
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">要求成绩</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" maxlength="13" v-model="lakeRun.required" type="text" disabled />
          </div>
        </div>
      </div>

      <div class="weui-cells__title">体测成绩</div>
      <div class="page__bd" v-for="item in PETest" :key="index" v-if="item[4].length !== 1">
        <div class="weui-form-preview">
          <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <!-- 班级 -->
              <div class="weui-form-preview__label">{{ item[2] }}</div>
              <!-- 成绩 -->
              <div class="weui-form-preview__value_in-hd" style="color: #143250">{{ item[4] }}</div>
            </div>
          </div>
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <!-- 年级 -->
              <div class="weui-form-preview__label">{{ item[1] }}</div>
              <!-- 是否及格 -->
              <div class="weui-form-preview__value" :style="'color:' + (item[5] === '及格' || item[5] === '良好'|| item[5] === '优秀'? 'green' : 'orange')">{{ item[5] }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  /**
   * 体测成绩查询
   * @time 2018/04/26
   * @author lxfriday
   */
  import { checkStudentID } from '../../utils/checkUserInfo';
  import { PEGRADES, PEGRADES_RESET } from '../../store/mutation-types';
  import store from './store';

  export default {
    data() {
      return {
        studentID: '',
        password: '888888',
        rememberInfoFlag: true,
      };
    },

    computed: {
      loading() {
        return store.state.loading;
      },
      haveChecked() {
        return store.state.haveChecked;
      },
      lakeRun() {
        return store.state.grades.lakeRun;
      },
      PETest() {
        return store.state.grades.PETest;
      },
    },

    methods: {
      // 记住用户名、密码
      handleClickRem() {
        // 点击了之后切换显示的状态
        this.rememberInfoFlag = !this.rememberInfoFlag;
      },
      submit() {
        const {
          studentID,
          password,
          rememberInfoFlag,
        } = this;
        if (checkStudentID(studentID) && password.length) {
          store.dispatch({
            type: PEGRADES,
            payload: {
              studentID,
              password,
              rememberInfoFlag,
            },
          });
        }
      },

      getStoredUserInfo() {
        const that = this;
        wx.getStorage({
          key: 'pegradesUserInfo',
          success(res) {
            that.studentID = res.data.username;
            that.password = res.data.password;
          },
          fail() {
            // 之前没查询过，则在获取key的时候回获取失败
          },
        });
      },
    },

    mounted() {
      // 获取存储在本地的用户学号和密码
      this.getStoredUserInfo();
    },

    onUnload() {
      // 退出页面的时候，复原原有的值
      // this.$options.data() 重新调用data函数返回的数据值
      Object.assign(this.$data, this.$options.data());
      store.commit({
        type: PEGRADES_RESET,
      });
    },
  };
</script>

<style scoped lang="less">
  .container {

    .noti {
      color: #cccccc;
      font-size: 12px;
    }
  }
</style>
