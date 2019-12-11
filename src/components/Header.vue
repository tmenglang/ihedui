<template>
    <header>
        <div class="keywords">核对,爱核对,文本审核,监管审核,文章审核,评论审核,敏感词审核,智能审核,色情识别,政治敏感识别,自媒体文章审核,文本审查,监管审查,文章审查,评论审查,敏感词审查,智能审查</div>
        <h1><router-link to="/home">Ihedui</router-link></h1>
        <ul class="nav">
            <li><router-link to="/home">官网首页</router-link></li>
            <li><router-link to="/worker">在线审核</router-link></li>
            <li><router-link to="/about">关于我们</router-link></li>
            <!-- <li><router-link to="/support">接入流程</router-link></li> -->
            <!-- <li><router-link to="/buy">立即购买</router-link></li> -->
        </ul>
        <ul class="log">
            <li v-if="$store.state.userName">
                <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <b class="icon iconfont icon-kehu"></b>{{$store.state.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">修改密码</el-dropdown-item>
                    <el-dropdown-item command="c">审核设置</el-dropdown-item>
                    <el-dropdown-item command="b">注销</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li v-else><router-link to="/login"><b class="icon-login"></b>登录/注册</router-link></li>
            <!-- <li><router-link to="/login">注册</router-link></li> -->
        </ul>
        <el-drawer
            title="修改密码"
            :visible.sync="dialog"
            direction="rtl"
            custom-class="demo-drawer"
            ref="drawer"
            >
            <div class="demo-drawer__content">
                <el-form :model="form" :rules="rules" ref="ruleForm">
                    <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldpassword">
                        <el-input type="password" v-model="form.oldpassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth" prop="newpassword">
                        <el-input type="password" v-model="form.newpassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :label-width="formLabelWidth" prop="newpassword2">
                        <el-input type="password" v-model="form.newpassword2" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button type="danger" @click="handleClose" :loading="loading" plain>{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                    <el-button type="info" @click="dialog = false" plain>取 消</el-button>
                </div>
            </div>
        </el-drawer>
    </header>
</template>
<script>
export default {
    name: 'app-header',
    loading: false,
    props: {
        title: {
            type: String
        }
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value !== this.form.newpassword) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            dialog: false,
            loading: false,
            form: {
                oldpassword: '',
                newpassword: '',
                newpassword2: ''
            },
            formLabelWidth: '120px',
            rules: {
                oldpassword: [{ required: true, message: '请输入您的原密码', trigger: "blur" }],
                newpassword: [
                    { required: true, message: "新密码不能为空", trigger: "blur" },
                    { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                ],
                newpassword2: [
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
        }
    },
    methods: {
        loginOut: function() {
            //
        },
        handleCommand(command) {
            // this.$router.push({path: '/passwd'});
            switch (command) {
                case 'a':
                    this.dialog = true;
                    break;
                case 'c':
                    this.$router.push({path: '/set'});
                    break;
                default:
                    this.$store.dispatch('UserLogout');
                    this.$router.push({path: '/login'});
            }
            // if (command == 'b') {
            //     this.$store.dispatch('UserLogout');
            //     this.$router.push({path: '/login'});
            // } else {
            //     this.dialog = true;
            // }         
        },
        handleClose(done) {
            // setTimeout(() => {
            //     this.loading = false;
            //     done();
            // }, 2000);
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.$confirm('确定要提交新密码吗？')
                    .then(_ => {
                        this.loading = true;
                        let data = {
                            mobile: localStorage.getItem('mobile'),
                            resettype: 'password',
                            username: localStorage.getItem('userName'),
                            oldpassword: this.form.oldpassword,
                            newpassword: this.form.newpassword,
                            accountmodify: localStorage.getItem('userName'),
                            vcode: '',
                            userId: localStorage.getItem('userId'),
                            token: localStorage.getItem('iToken')
                        };
                        this.$axios.resetPassword(data).then((res) => {
                            if (res.data.status == 200) {
                                this.loading = false;
                                this.dialog = false;
                                this.$message({
                                    type: 'success',
                                    message: '密码修改成功'
                                });            
                            } else {
                                this.loading = false;
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                });
                                this.from = {
                                    oldpassword: "",
                                    newpassword: "",
                                    newpassword2: ""
                                };
                            }
                        }).catch((e) => {
                            this.$message({
                                type: 'warning',
                                message: '失败'
                            });
                        })
                    })
                    .catch(_ => {});
                } else {
                    return false;
                }
            });
        }
    },
    // beforeCreate: function() {
    //     //alert('组件实例化之前，初始化event，配置');
    // },
    // created: function() {
    //     //alert('组件实例化完毕，但是页面任然没有显示');
    // },
    // beforeMount: function() {
    //     //alert('组件挂载前，页面任未显示，但虚拟Dom已经配置');
    // },
    // mounted: function() {
    //     //alert('组件挂载后，此方法执行后，页面显示');
    // },
    // beforeUpdate: function() {
    //     //alert('组件更新前，页面没有变化，但是虚拟dom已经准备好了');
    // },
    // updated: function() {
    //     //alert('组件更新，次方法执行后，页面发生变化');
    // },
    // beforeDestroy: function() {
    //     //alert('组件销毁前');
    // },
    // destoryed: function() {
    //     //alert('组件销毁');
    // }
}
</script>
<style scoped>
    .keywords {
        display: none;
    }
    header {
        background: #000032;
        padding: 10px 0;
        height: 80px;
        width: 1300px;
        margin: 0 auto;
    }
    h1 {
        color: #fff;
        float: left;
        margin: 10px 0 0 0;
        width: 120px;
        height: 60px;
        text-align: center;
    }
    h1 a {
        font-size: 0;
        text-decoration: none;
        width: 120px;
        height: 45px;
        margin-top: 7px;
        display: inline-block;
        overflow: hidden;
        background: url(../assets/logo.png) no-repeat;
        background-size: 100% 100%;
    }
    h1 a:hover {
        color: #fff;
        text-decoration: none;
    }
    .nav {
        margin-left: 200px;
        float: left;
    }
    .nav li {
        float: left;
        height: 80px;
        line-height: 80px;
    }
    .nav a {
        color: #ccc;
        text-decoration: none;
        padding: 0 40px;
        font-size: 18px;
    }
    .nav a:hover {
        color: #fff;
        text-decoration: none;
    }
    .nav .router-link-active {
        color: #fff;
    }
    .log {
        float: right;
        height: 80px;
    }
    .log li {
        float: left;
        padding: 0 10px;
    }
    .log a {
        color: #ccc;
        text-decoration: none;
        line-height: 80px;
        display: block;
    }
    .log a:hover {
        color: #fff;
        text-decoration: none;
    }
    .log .router-link-active {
        color: #fff;
    }
    .icon {
        font-size: 20px;
        margin-right: 5px;
    }
    .el-dropdown {
        margin: 25px 0 0 0;
        color: #ccc;
    }
    .el-dropdown:hover {
        color: #fff;
        cursor: pointer;
    }
    .demo-drawer__footer {
        padding-left: 120px;
    }
</style>