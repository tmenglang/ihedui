<template>
    <footer>
        <div class="footer-wrap">
            <p class="custom">深圳三文云科技有限公司</p>
            <p class="icons"><b class="icon-weixin"></b><b class="icon-qq"></b><b class="icon-txwb"></b><b class="icon-weibo"></b></p>
            <p class="copyright">{{copyright}}  <a href="http://beian.miit.gov.cn/" target="_blank">粤ICP备19129277号-1</a></p>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'app-footer',
    data() {
        return {
            copyright: 'Copyright © 2019 Ihedui All Rights Reserved.'
        }
    }
}
</script>
<style scoped>
    footer {
        background: #000032;
        padding: 10px;
        height: 60px;
        color: #ccc;
        font-size: 14px;
    }
    .footer-wrap {
        width: 1300px;
        margin: 0 auto;
    }
    .custom {
        float: left;
        line-height: 60px;
    }
    .copyright {
        margin-left: 30px;
        float: left;
        line-height: 60px;
        margin-right: 40px;
    }
    .copyright a {
        color: #ccc;
    }
    .copyright a:hover {
        color: #fff;
    }
    .icons {
        float: right;
        height: 24px;
        margin: 18px 0;
    }
    .icons b {
        display: inline-block;
        line-height: 0;
        width: 24px;
        height: 24px;
        overflow: hidden;
        margin: 0 10px;
    }
    .icon-weixin {
        background: url(../assets/icon-weixin.png) no-repeat;
        background-size: 100%;
    }
    .icon-qq {
        background: url(../assets/icon-qq.png) no-repeat;
        background-size: 100%;
    }
    .icon-txwb {
        background: url(../assets/icon-txwb.png) no-repeat;
        background-size: 100%;
    }
    .icon-weibo {
        background: url(../assets/icon-weibo.png) no-repeat;
        background-size: 100%;
    }
</style>