<template>
  <!-- <div class="rich-text-test">
      <vue-html5-editor :content="content" :height="400" @change="updateData"></vue-html5-editor>
  </div> -->
  <div class="worker">
    <div class="worker-wrap">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="editor-wrap">
            <div class="article-title">
              <el-row :gutter="20">
                <el-col :span="16"><el-input v-model="title" placeholder="文章标题"></el-input></el-col>
                <el-col :span="8"><el-button type="primary" @click="submitContent" :loading="loading">{{ loading ? '审核中...' : '快速审核' }}</el-button><el-button @click="clearContent" type="info" plain>清空文字</el-button></el-col>
              </el-row>
            </div>
            <div class="article-editor">
              <quill-editor class="editor"
                v-model="content"
                ref="myQuillEditor"
                @blur="onEditorBlur"
                @focus="onEditorFocus"
                @ready="onEditorReady">
              </quill-editor>
            </div>
            <!--<div class="article-submit"><el-button type="info" @click="clearContent">清空内容</el-button></div>-->
          </div>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>审核结果</span>
              <el-button style="float: right; padding: 3px 0" type="text">{{count}} 条结果</el-button>
            </div>
            <div v-if="count > 0" v-for="(item, index) in result" :key="index" class="text item">
              <span style="color: #ff0000;">{{item.context}}</span> -- {{item.desc}}
            </div>
            <div v-if="showNo" class="text item">{{ noData }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Worker',
  data() {
      return {
          title: '',
          content: '',
          count: 0,
          result: [],
          loading: false,
          noData: '',
          showNo: false
      };
  },
  methods: {
    onEditorBlur() {
      window.console.log('blur',this.content)
    },
    onEditorFocus(){
      window.console.log('focus',this.content)
    },
    onEditorReady(){
      window.console.log('ready',this.content)
    },
    clearContent() {
      this.content = '';
      this.title = '';
      this.result = [];
      this.count = 0;
      this.noData = '';
      this.showNo = false;
    },
    submitContent() {
      if (this.$store.state.userName) {
        if (this.title === '') {
          this.$message({
            type: 'warning',
            message: '请输入文章标题！'
          })
          return false;
        }
        if (this.content === '') {
          this.$message({
            type: 'warning',
            message: '请输入文章内容！'
          })
          return false;
        }
        let data = {
          title: this.title,
          content: this.content
        };
        this.loading = true;
        this.$axios.userCheck(data).then((res) => {
          this.loading = false;
          console.log(res);
          if (res.data.status == 200) {
            this.result = res.data.data;
            this.count = res.data.data.length;
            // this.content = this.content.replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "");
            this.content = this.content.replace(/<s(\s[^>]*)?>|<\/s>/gis, "");
            // this.content = this.content.replace(/<\/?[^>]*>/g, "");
            if (this.count > 0) {
              this.showNo = false;
              this.result.forEach(v => {
                if (v.context.indexOf('&') == -1) {
                  let reg = new RegExp(v.context, 'g');
                  this.content = this.content.replace(reg, '<s style="color: #ff0000">' + v.context + '</s>');
                } else {
                  console.log(v.context);
                  let arr = v.context.split('&');
                  let str = data.content;
                  let reg = new RegExp("(" + arr[0] + ")([\\s\\S]{0,15})(" + arr[1] + ")", "g");
                  let _res = str.match(reg);
                  _res.forEach(v => {
                    let r1 = new RegExp(v, 'g');
                    console.log(RegExp.$1, RegExp.$2, RegExp.$3)
                    this.content = this.content.replace(r1, '<s style="color: #ff0000">' + v + '</s>');
                  });
                }
              });
              
            } else {
              // this.content = this.content.replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "");
              this.noData = '未检测到敏感词汇！';
              this.showNo = true;
            }
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
        }).catch(err => {
          this.loading = false;
        });
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  }
}
</script>

<style>
.worker {
  background: #fff;
  min-height: calc(100% - 180px);
}
.worker-wrap {
  width: 1300px;
  margin: 0 auto;
  padding: 20px 0;
}
.editor-wrap {
  border: 1px solid #E0E1E5;
  min-height: 660px;
}
.article-title {
  height: 40px;
  padding: 10px 0;
  border-bottom: 1px solid #E0E1E5;
}
.article-title .el-input__inner {
  border: 0 none;
}
.article-editor {
  height: 520px;
}
.article-submit {
  text-align: left;
  height: 40px;
  padding: 20px;
  border-top: 1px solid #E0E1E5;
}
.worker-wrap .box-card {
  text-align: left;
}
.worker-wrap .el-card__header {
  padding: 20px;
}
.worker-wrap .el-card__body {
  padding: 0;
  height: 600px;
  overflow-y: auto;
}
.worker-wrap .text {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #EBEEF5;
  padding: 0 20px;
  font-size: 14px;
}
.worker-wrap .editor {
  height: 554px;
}
.worker-wrap .ql-toolbar.ql-snow {
  border-top: 0 none;
  border-left: 0 none;
  border-right: 0 none;
  border-bottom-color: #EBEEF5;
}
.worker-wrap .ql-container.ql-snow {
  border: 0 none;
}
</style>
