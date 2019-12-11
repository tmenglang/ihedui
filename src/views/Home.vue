<template>
  <div id="home">
    <div class="top-wrap">
      <h2>一款快速审核文章的工具，去除敏感词，还你健康好文！</h2>
      <p>使用业界前沿的深度学习技术对政治敏感、色情类、暴恐广告类信息进行精准识别，智能快速判断文章或用户评论是否符合网络发文规范；大幅提升了审核效率和准确率，极大节省内容审核的人力成本，为您的产品体验保驾护航。提供强大文章审核接口，一秒钟快审6篇文章，一天可调用接口10000000次</p>
      <div class="op">
          <span class="btn-fill" @click="checkProbation">在线审核</span>
          <!-- <router-link class="btn-fill" to="/buy">立即购买</router-link> -->
          <span class="price">原价：<s class="red">3999/年</s> 现在<span class="red">免费试用</span></span>
      </div>
    </div>
    <div class="home">
      <div class="home-wrap">
        <el-divider content-position="center">功能介绍</el-divider>
        <div class="intro-box">
          <div class="intro-item">
            <i class="icon iconfont icon-hongwaijiance"></i>
            <div class="intro-info">
              <h3>色情文字智能检测</h3>
              <p>基于语义分析和文文本聚类技术，精准定位色情词汇</p>
            </div>
          </div>
          <div class="intro-item">
            <i class="icon iconfont icon-fengji"></i>
            <div class="intro-info">
              <h3>政治敏感词检测</h3>
              <p>实时跟踪和更新违禁词库，快速高效识别敏感文本</p>
            </div>
          </div>
          <div class="intro-item">
            <i class="icon iconfont icon-kongqijiance"></i>
            <div class="intro-info">
              <h3>暴恐敏感词检测</h3>
              <p>基于深度学习模型，能够准确识别枪支、宗教、毒品等类型的事件和文本</p>
            </div>
          </div>
          <div class="intro-item">
            <i class="icon iconfont icon-governance-platform"></i>
            <div class="intro-info">
              <h3>辱骂&amp;脏话词检测</h3>
              <p>通过海量的样本建立和训练辱骂和脏话类模型，同时自持自定义词库</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: '',
      users: [
      ]
    }
  },
  methods: {
    updateTitle(title) {
      this.title = title;
    }
  },
  created() {
    
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

<style scoped>
#home {
  border-top: 1px solid #262D43;
  min-height: calc(100% - 220px);
}
.top-wrap {
  width: 1300px;
  margin: 0 auto;
  text-align: left;
  background-image: url(../assets/bg.png);
  background-size: 361px 278px;
  background-repeat: no-repeat;
  background-position: 100% 100%;
}
.home {
  background: #fff;
  padding: 40px 0;
}
.home-wrap {
  background: #fff;
  width: 1300px;
  margin: 30px auto;
}
h2 {
  color: #fff;
  font-size: 30px;
  line-height: 48px;
  text-align: left;
  font-weight: 400;
  margin: 30px 0 20px;
}
h3 {
    font-size: 24px;
    line-height: 50px;
    color: #999;
    font-weight: 400;
}
p {
    font-size: 16px;
    color: #fff;
    line-height: 32px;
    width: 820px;
}
.op {
    text-align: left;
    margin-top: 30px;
    padding-bottom: 40px;
}
.op a {
    margin: 0 30px;
    display: inline-block;
    text-decoration: none;
}
.op .price {
  display: inline-block;
  vertical-align: bottom;
  font-size: 20px;
  line-height: 30px;
  color: #ddd;
  margin-left: 20px;
}
.op .price .red {
  color: #63cdff;
}
.btn-empty {
    display: inline-block;
    height: 40px;
    border: 2px solid #BD3A00;
    padding: 0 40px;
    line-height: 40px;
    font-size: 16px;
    color: #BD3A00;
    text-decoration: none;
    cursor: pointer;
}
.btn-empty:hover {
    border-color: #fff;
    color: #fff;
    text-decoration: none;
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
    margin: 5px 20px 40px 0;
    color: #10ABFF;
  }
  .intro-info h3 {
    font-size: 18px;
    line-height: 50px;
    font-weight: 400;
    color: #333;
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
  .el-divider {
    margin: 40px 0;
  }
  .el-divider .el-divider__text {
    font-size: 24px;
  }
</style>
