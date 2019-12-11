<template>
  <div class="set">
    <div class="set-wrap">
      <div class="set-filter">
        <el-row>
          <el-col :span="18">
            <div class="set-query">
              <el-radio-group v-model="listQuery.type" @change="typeChange">
                <el-radio-button label="white">白名单</el-radio-button>
                <el-radio-button label="black">黑名单</el-radio-button>
              </el-radio-group>
              <el-select v-model="listQuery.tags" placeholder="请选择标签类型" style="margin-left: 20px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input
                style="width: 200px; margin-left: 20px;"
                placeholder="搜索关键词"
                v-model="listQuery.keywords"
                clearable>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="set-add">
              <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-tabs v-model="listQuery.tags" type="border-card" style="text-align:left">
        <el-tab-pane v-for="(item, index) in listData" :label="item.name" :key="index" :name="item.value">
          <el-tag style="margin: 0 10px 10px 0;" v-for="(item2, index2) in item.tags" :key="index2" :type="listQuery.keywords == item2 ? 'danger' : ''">{{item2}}</el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="添加名单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="选择类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio-button label="white">白名单</el-radio-button>
            <el-radio-button label="black">黑名单</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择标签" :label-width="formLabelWidth">
          <el-select v-model="form.tags" placeholder="请选择标签类型">
            <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加名单</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="clearTags">清除</el-button>
          </div>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTags">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Set',
  data() {
      return {
          listQuery: {
            keywords: '',
            tags: 'sex',
            type: 'white'
          },
          options: [{
            value: 'sex',
            label: '涉黄'
          }, {
            value: 'poli',
            label: '政治敏感'
          }, {
            value: 'stake',
            label: '涉暴涉恐'
          }, {
            value: 'ad',
            label: '谩骂'
          }],
          listData: [
            {
              value: 'sex',
              name: '涉黄',
              tags: ['奶子', '逼', '东京热', '奶子', '逼', '东京热', '奶子', '逼', '东京热', '奶子', '逼', '东京热', '奶子', '逼', '东京热', '奶子', '逼', '东京热', '奶子', '逼', '东京热', '奶子', '逼', '东京热']
            },
            {
              value: 'poli',
              name: '政治敏感',
              tags: ['习近平', '周恩来', '李鹏', '胡锦涛']
            },
            {
              value: 'stake',
              name: '涉暴涉恐',
              tags: ['AK47', '轰炸', '投毒', '迷药', '花名']
            },
            {
              value: 'ad',
              name: '谩骂',
              tags: ['妈的', '操你妈', '死全家']
            }
          ],
          dialogFormVisible: false,
          form: {
            type: 'white',
            tags: 'sex',
            value: []
          },
          formLabelWidth: '120px',
          dynamicTags: [],
          inputVisible: false,
          inputValue: ''
      };
  },
  created() {
    if (this.$store.state.userName == '') {
      this.$router.push({path: '/login'});
    }
    this.getList();
  },
  methods: {
    typeChange(e) {
      this.listQuery.type = e;
      this.getList();
    },
    clearTags() {
      this.dynamicTags = [];
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    saveTags() {
      if (this.dynamicTags.length == 0) {
        this.$message.error('请添加名单！');
        return;
      }
      let data = Object.assign({}, this.form);
      data.value = this.dynamicTags;
      console.log(data);
      this.dialogFormVisible = false;
    },
    getList() {
      let data = {
        type: this.listQuery.type
      };
      console.log(data);
      return;
      this.$axios.blackWhiteList(data).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.result = res.data.data;
          this.count = res.data.data.length;
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
        //
      });
    }
  }
}
</script>

<style>
.set {
  background: #fff;
  min-height: calc(100% - 180px);
  text-align: left;
}
.set-wrap {
  width: 1300px;
  margin: 0 auto;
  padding: 20px 0;
}
.set-filter {
  padding: 20px 0;
}
.set-query {
  text-align: left;
}
.set-add {
  text-align: right;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-card__body .button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.el-card__body .input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
