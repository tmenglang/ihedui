<template>
  <div class="about">
    <div class="about-wrap">
      <el-divider content-position="center">关于我们</el-divider>
      <p class="intro-p">团队成员曾经在国内一线顶尖互联网公司任资深算法研发职位，拥有丰富的一线技术研发实战经验；<br>
使用业界前沿的深度学习技术对政治敏感、色情类、暴恐广告类信息进行精准识别，智能快速判断文章或用户评论是否符合网络发文规范；<br>
大幅提升了审核效率和准确率，极大节省内容审核的人力成本，为您的产品体验保驾护航。</p>
      <p><span class="btn-fill" @click="checkProbation">免费试用</span></p>
      <el-divider content-position="center">应用场景</el-divider>
      <div class="intro-box intro-sence">
        <p>新闻文章：外网新闻的审核和敏感信息监测，助力发布无忧<br>
        用户评论/留言：网上新闻和社区用户评论或留言的审核<br>
        直播弹幕：直播弹幕的敏感信息审核屏蔽，助力直播无忧<br>
        通讯工具：IM即时通信工具的敏感信息监测，有效进行拦截和防止扩散</直播弹幕：直播弹幕的敏感信息审核屏蔽，助力直播无忧</p>
      </div>
      <el-divider content-position="center">特色优势</el-divider>
      <div class="intro-box">
        <div class="intro-item intro-item-b">
          <i class="icon iconfont icon-kongtiao"></i>
          <div class="intro-info">
            <h3>经过多产品验证</h3>
            <p>识别模型已经在线上稳定运行多年，不同产品上进行了严格验证，效果业界领先</p>
          </div>
        </div>
        <div class="intro-item intro-item-b">
          <i class="icon iconfont icon-zhinenglouyu"></i>
          <div class="intro-info">
            <h3>高效稳定</h3>
            <p>20篇/秒的高效率审核算法支持，相比人工审核效率提升100倍以上，关键时刻让你快人一步</p>
          </div>
        </div>
        <div class="intro-item intro-item-b">
          <i class="icon iconfont icon-workflow"></i>
          <div class="intro-info">
            <h3>个性化定制词典</h3>
            <p>支持色情、涉政、暴恐、脏话类词汇自助化定义，真正做到所想即所得</p>
          </div>
        </div>
        <div class="intro-item intro-item-b">
          <i class="icon iconfont icon-business-settings"></i>
          <div class="intro-info">
            <h3>简单易用</h3>
            <p>不仅有简单易用的可视化web界面可以一键审核，也有编程级接口调用支持批量化审核，小白和高级程序员的需求都能得到满足</p>
          </div>
        </div>
        <div class="intro-item intro-item-b">
          <i class="icon iconfont icon-cloud-partner"></i>
          <div class="intro-info">
            <h3>及时售后服务</h3>
            <p>团队专注于文本审核，决策和产品改进流程更快，客户问题会第一时间响应和解决</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'hello'
    }
  },
  methods: {
    checkProbation() {
      if (this.$store.state.userName) {
        if (this.$store.state.currentPackageId) {
          this.$router.push({ path: "/worker" });
        } else {
          this.$axios.userProbation({}).then(res => {
            if (res.data.status == 200) {
              this.$store.dispatch('UserProbation', res.data.data);
              this.$router.push({ path: "/worker" });
            } else {
              this.$message({
                type: 'warning',
                message: res.data.msg
              })
              if (res.data.status == 401) {
                setTimeout(() => {
                  this.$store.dispatch('UserLogout');
                  this.$router.push({ path: "/login" });
                }, 200);
              }
            }
          });
        }
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .about {
    padding-top: 10px;
    background: #fff;
    min-height: calc(100% - 180px);
  }
  .about-wrap {
    width: 1300px;
    margin: 0 auto;
  }
  .about h2 {
    font-size: 40px;
    line-height: 100px;
    color: #000;
    font-weight: 400;
  }
  .intro-p {
    text-align: left;
    font-size: 16px;
    line-height: 36px;
    margin-bottom: 20px;
  }
  
.btn-fill {
  display: inline-block;
  cursor: pointer;
  height: 40px;
  background: #007cfe;
  border: 2px solid #007cfe;
  padding: 0 40px;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
  text-decoration: none;
  vertical-align: bottom;
  border-radius: 4px;
}
.btn-fill:hover {
    border-color: #1e9ce5;
    background: #1e9ce5;
    color: #fff;
    text-decoration: none;
}
  .intro-box {
    margin: 60px 0 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .intro-item {
    display: block;
    width: 50%;
    text-align: left;
    margin-bottom: 40px;
  }
  .intro-item-b {
    width: 33.3%;
  }
  .intro-item i {
    font-size: 40px;
    float: left;
    margin: 5px 20px 50px 0;
    color: #10ABFF;
  }
  .icon-about {
    width: 40px;
    height: 40px;
    float: left;
    font-size: 0;
    overflow: hidden;
    line-height: 0;
    margin: 5px 20px 80px 0;
  }
  .intro-info h3 {
    font-size: 20px;
    line-height: 40px;
    font-weight: 400;
  }
  .intro-info p {
    font-size: 14px;
    color: #666666;
    line-height: 24px;
    margin-right: 60px;
  }
  .about-h3 {
    font-size: 32px;
    text-align: center;
    line-height: 80px;
    margin: 30px 0;
  }
  .intro-sence {
    line-height: 40px;
    padding: 8px 16px;
    background-color: #eeeeee;
    border-radius: 4px;
    border-left: 5px solid #409EFF;
    margin: 20px 0 60px;
    text-align: left;
    font-size: 16px;
  }
  .el-divider {
    margin: 40px 0;
  }
  .el-divider .el-divider__text {
    font-size: 24px;
  }
</style>
