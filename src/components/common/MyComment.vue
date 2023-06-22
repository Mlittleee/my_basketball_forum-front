<!--
<script>


export default {
  name: "MyComment",
  data() {
    return {
      content: "",
      commentList: [],
      rules: {
        content: [
          {required: true, message: '请输入评论内容', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    // 获取评论列表
    getCommentList() {
      getCommentList().then(res => {
        if (res.code === 200) {
          this.commentList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    // 发表评论
    addComment(content) {
      addComment({content: content, postId: this.$router.}).then(res => {
        if (res.code === 200) {
          this.$message.success("评论成功");
          this.$refs[commentForm].resetFields();
          this.getCommentList();
        } else {
          this.$message.error(res.msg);
        }
      })
    },
  },
  beforeMount() {
    this.getCommentList();
  }
}
</script>

<template>
  &lt;!&ndash;单级评论&ndash;&gt;
  &lt;!&ndash; 使用element-ui来实现评论区功能 &ndash;&gt;
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>评论区</span>
          </div>
          <el-form :model="commentForm" :rules="rules" ref="commentForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="评论内容" prop="content">
              <el-input type="textarea" v-model="commentForm.content" placeholder="请输入评论内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('commentForm')">发表评论</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .demo-ruleForm {
    margin: 0 auto;
    width: 300px;
  }

  .demo-ruleForm .el-form-item {
    margin-bottom: 0px;
  }

  .demo-ruleForm .el-form-item__label {
    width: 80px;
  }

  .demo-ruleForm .el-form-item__content {
    margin-left: 80px;
  }

  .clearfix:before,

  .clearfix:after {
    content: "";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }

  .el-card__body {
    padding: 10px;
  }

  .el-card__body .el-form-item {
    margin-bottom: 0px;
  }

  .el-card__body .el-form-item__label {
    width: 80px;
  }

  .el-card__body .el-form-item__content {
    margin-left: 80px;
  }

  .el-card__body .el-form-item__content .el-input {
    width: 100%;
  }

  .el-card__body .el-form-item__content .el-input__inner {
    height: 100px;
  }

.el-card__body .el-form-item__content .el-input__inner textarea {
    resize: none;
  }

  .el-card__body .el-form-item__content .el-button {
    float: right;
  }

  .el-card__body .el-form-item__content .el-button {
    margin-left: 10px;
  }

  .el-card__body .el-form-item__content .el-button:first-child {
    margin-left: 0px;
  }

  .el-card__body .el-form-item__content .el-button:last-child {
    margin-right: 0px;
  }

  .el-card__body .el-form-item__content .el-button&#45;&#45;primary {
    background-color: #409EFF;
    border-color: #409EFF;
  }

  .el-card__body .el-form-item__content .el-button&#45;&#45;primary:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
  }

  .el-card__body .el-form-item__content .el-button&#45;&#45;primary:focus {
    background-color: #66b1ff;
    border-color: #66b1ff;
  }

  .el-card__body .el-form-item__content .el-button&#45;&#45;primary:active {
    background-color: #66b1ff;
    border-color: #66b1ff;
  }

  .el-card__body .el-form-item__content .el-button&#45;&#45;primary.active {
    background-color: #66b1ff;
    border-color: #66b1ff;
  }

  .el-card__body .el-form-item__content .el-button&#45;&#45;primary .el-button__icon {
    color: #fff;
  }

</style>-->
