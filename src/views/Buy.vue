<template>
  <div class="buy">
    <div class="buy-wrap">
      <h2>爱核对</h2>
      <p class="buy-p">更快，更准，更全</p>
      <p><span class="btn-fill" @click="checkProbation">免费试用</span></p>
      <h2 class="buy-h2">马上购买</h2>
      <div class="buy-box">
        <div class="buy-item buy-item-act" v-for="(item, index) in list" :key="index">
          <div class="a">{{item.packageName}}</div>
          <div class="b">
            <h3>{{item.valuationTime}}个月</h3>
            <p>{{item.remark}}</p>
          </div>
          <div class="c">
            <p>￥{{item.priceOriginal}}.00</p>
            <p class="gray">原价 ￥{{item.priceDiscount}}.00</p>
          </div>
        </div>
        <div class="buy-pay">
          <div class="pay-btn">
            <b class="icon-pay icon-pay-wx"></b>
            微信支付
          </div>
          <div class="pay-btn">
            <b class="icon-pay icon-pay-zfb"></b>
            支付宝支付
          </div>
        </div>
        <div class="buy-op">
          <button class="btn-fill">立即购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Buy',
  data () {
    return {
      list: []
    }
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      this.$axios.packageShowall({}).then(res => {
        if (res.data.status == 200) {
          this.list = res.data.data;
        } else {
          this.$message({
            type: 'warning',
            message: res.data.msg
          })
        }
      });
    },
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
  .buy {
    background: #fff;
    min-height: calc(100% - 180px);
  }
  .buy-wrap {
    width: 1300px;
    margin: 0 auto;
  }
  .buy h2 {
    font-size: 40px;
    line-height: 80px;
    color: #000;
    font-weight: 400;
  }
  .buy-p {
    font-size: 16px;
    line-height: 32px;
  }
  .buy .buy-h2 {
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
  .buy-box {
    margin: 30px auto 0;
    padding: 0 0 40px;
    width: 800px;
    text-align: left;
  }
  .buy-item {
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    border: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
  }
  .buy-item-act {
    border-color: #BD3A00;
  }
  .buy-item .a {
    width: 20%;
    display: block;
    
  }
  .buy-item .b {
    padding: 0 20px;
    width: 60%;
    display: block;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
  }
  .b h3 {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  .b p {
    font-size: 12px;
    color: #999;
    line-height: 30px;
  }
  .buy-item .c {
    padding-left: 20px;
    width: 20%;
    display: block;
  }
  .buy-item .c .gray {
    color: #999;
    font-size: 12px;
  }
  .buy-pay {
    padding: 0 0 20px;
    height: 48px;
    border-bottom: 1px solid #eee;
  }
  .pay-btn {
    border: 1px solid #EEEEEE;
    display: inline-block;
    height: 24px;
    padding: 12px 10px;
    margin-right: 10px;
  }
  .pay-btn .icon-pay {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    font-size: 0;
    line-height: 0;
    overflow: hidden;
    margin-right: 5px;
  }
  .pay-btn .icon-pay-wx {
    background: url(../assets/icon-pay-wx.png) no-repeat;
    background-size: 100% 100%;
  }
  .pay-btn .icon-pay-zfb {
    background: url(../assets/icon-pay-zfb.png) no-repeat;
    background-size: 100% 100%;
  }
  .buy-op {
    padding: 20px 0;
  }
  .buy-op .btn-fill {
    margin-top: 0;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }
</style>
