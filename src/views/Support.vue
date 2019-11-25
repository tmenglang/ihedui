<template>
  <div class="support">
    <div class="support-wrap">
      <h2>爱核对</h2>
      <p class="support-p">更快，更准，更全</p>
      <p><span class="btn-fill" @click="checkProbation">免费试用</span></p>
      <h2 class="support-h2">接入流程</h2>
      <div class="support-box">
        <div class="support-item support-arr">
          <b class="icon-support icon-support01"></b>
          <div class="support-info">
            <h3>一键申请</h3>
            <p>注册会员，快速创建产品，点击立即注册</p>
          </div>
        </div>
        <div class="support-item support-arr">
          <b class="icon-support icon-support02"></b>
          <div class="support-info">
            <h3>获得凭证</h3>
            <p>完成创建产品，选择合适的套餐，开通后获取凭证</p>
          </div>
        </div>
        <div class="support-item">
          <b class="icon-support icon-support03"></b>
          <div class="support-info">
            <h3>调用接口</h3>
            <p>极速接入，调用接口，立即体验智能反垃圾云服务</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Support',
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
  .support {
    background: #fff;
    min-height: calc(100% - 180px);
  }
  .support-wrap {
    width: 1300px;
    margin: 0 auto;
  }
  .support h2 {
    font-size: 40px;
    line-height: 80px;
    color: #000;
    font-weight: 400;
  }
  .support-p {
    font-size: 16px;
    line-height: 32px;
  }
  .support .support-h2 {
    line-height: 60px;
    margin-top: 40px;
  }
  .btn-fill {
    margin-top: 10px;
    display: inline-block;
    height: 40px;
    background: #BD3A00;
    border: 2px solid #BD3A00;
    padding: 0 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }
  .btn-fill:hover {
    background: #fff;
    color: #BD3A00;
    text-decoration: none;
  }
  .support-box {
    margin: 30px auto 0;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    text-align: left;
  }
  .support-item {
    width: 100%;
    display: block;
    margin-bottom: 30px;
    padding-bottom: 20px;
    position: relative;
  }
  .support-arr::before {
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    background: url(../assets/icon-arr-down.png) no-repeat;
    background-size: 100%;
    content: ' ';
    bottom: 0;
    left: 45%;
  }
  .icon-support {
    width: 70px;
    height: 70px;
    float: left;
    font-size: 0;
    overflow: hidden;
    line-height: 0;
    margin: 0 50px 40px 100px;
  }
  .icon-support01 {
    background: url(../assets/icon-support01.png) no-repeat;
    background-size: 100%;
  }
  .icon-support02 {
    background: url(../assets/icon-support02.png) no-repeat;
    background-size: 100%;
  }
  .icon-support03 {
    background: url(../assets/icon-support03.png) no-repeat;
    background-size: 100%;
  }
  .support-info h3 {
    font-size: 30px;
    line-height: 50px;
    font-weight: 400;
  }
  .support-info p {
    font-size: 14px;
    color: #666666;
    line-height: 24px;
    margin-right: 60px;
  }
</style>
