<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-alert
      v-show="errorShow"
      style="margin-bottom: 10px;" 
      :title="errorMsg"
      @close="closeError"
      type="error"
      effect="dark">
    </el-alert>
    <el-form-item prop="username" label-width="0">
      <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="email" label-width="0">
      <el-input type="email" v-model="ruleForm.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="mobile" label-width="0">
      <el-input v-model="ruleForm.mobile" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item prop="password" label-width="0">
      <el-input type="password" v-model="ruleForm.password" placeholder="密码" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass" label-width="0">
      <el-input type="password" v-model="ruleForm.checkPass" placeholder="确认密码" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label-width="0">
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    var validatePhone = (rule, value, callback) => {
      var regx = /^1[345789]\d{9}$/;
      if (!regx.test(value)) {
        callback(new Error("手机号码格式不正确!"));
      } else {
        callback();
      }
    };

    return {
      errorMsg: '',
      errorShow: false,
      ruleForm: {
        username: "",
        email: "",
        mobile: "",
        password: "",
        checkPass: "",
        gender: '1'
      },
      rules: {
        username: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            require: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        mobile: [
          { require: true, message: "手机号码不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.userRegister(this.ruleForm).then((res) => {
            if (res.data.status == 200) {
              this.$store.dispatch('UserLogin', res.data.data);
              this.$router.push({path: '/'});
            } else {
              this.errorMsg = res.data.msg;
              this.errorShow = true;
              this.ruleForm = {
                username: "",
                email: "",
                mobile: "",
                password: "",
                checkPass: "",
                gender: '1'
              };
              setTimeout(() => {
                this.errorMsg = '';
                this.errorShow = false;
              }, 5000)
            }
          }).catch((e) => {
              this.errorMsg = e;
              this.errorShow = true;
          })
        } else {
          return false;
        }
      });
    },
    closeError() {
      this.errorMsg = '';
      this.errorShow = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
</style>