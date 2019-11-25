<template>
  <div class="login-wrap">
    <div class="login-pr">
      <div class="login">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="登录" name="first">
            <el-alert
              v-show="errorShow"
              style="margin-bottom: 10px;" 
              :title="errorMsg"
              @close="closeError"
              type="error"
              effect="dark">
            </el-alert>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item prop="account" label-width="0">
                <el-input v-model="ruleForm.account" placeholder="用户名/手机号/邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="password" label-width="0">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  placeholder="密码"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="0">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="second">
            <register @registerFn="loginFn"></register>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import register from "@/views/Register";

export default {
  data() {
    return {
      activeName: "first",
      ruleForm: {
        account: "",
        password: ""
      },
      errorMsg: '',
      errorShow: false,
      rules: {
        account: [
          { required: true, message: "请输入您的帐号", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: '请输入您的密码', trigger: "blur" }]
      }
    };
  },

  created() {
  },

  methods: {
    //选项卡切换

    handleClick(tab, event) {
      window.console.log(tab, event);
    },

    closeError() {
      this.errorMsg = '';
      this.errorShow = false;
    },

    //重置表单

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    loginFn: function(actionName) {
      this.activeName = actionName;
    },

    //提交表单

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .userLogin(this.ruleForm)
            .then((res) => {
                if (res.data.status == 200) {
                  this.$store.dispatch('UserLogin', res.data.data);
                  this.$router.push({ path: "/" });
                } else {
                  this.errorShow = true;
                  this.errorMsg = res.data.msg
                }
            })
            .catch(e => {
              // this.$message({
              //   type: "warning",
              //   message: "失败"
              // });
              this.errorShow = true;
              this.errorMsg = e
            });
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    }
  },

  components: {
    register
  }
};
</script>

<style>
.login-wrap {
  background: url(../assets/login-bg.png) no-repeat;
  background-position: 50%;
  background-size: 100%;
  height: calc(100% - 180px);
}
.login-pr {
  width: 1300px;
  margin: 0 auto;
  padding: 40px 0;
}
.login {
  width: 400px;
  float: right;
  background: #fff;
  border-radius: 8px;
}
.login-wrap .el-tabs__nav {
  width: 100%;
}
.login-wrap .el-tabs__item {
  text-align: center;
  width: 50%;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}
.login-wrap .el-tabs__active-bar {
  width: 50%;
}
.login-wrap .el-tab-pane {
  padding: 10px 20px;
}
.login-wrap .el-input__inner {
  height: 50px;
  line-height: 50px;
}
.login-wrap .el-form-item__label {
  line-height: 50px;
}
.login-wrap .el-button {
  width: 48%;
}
</style>