<script>
import {getPostDetail} from "@/api/post";
import {updatePostView} from "@/api/postcard";
import showdownHighlight from "showdown-highlight";
import {getCommentList, addComment} from "@/api/comment";
import store from "@/store/index";
import dayjs from "dayjs";

export default {
  name: "PostView",
  data() {
    return {
      post: {content: ""},
      extensions: [showdownHighlight],
      postId: this.$route.params.id,

      // 评论区参数
      content: "",
      commentList: [],
    };
  },
  methods: {
    dayjs,
    getPostView() {
      getPostDetail({postId: this.$route.params.id})
          .then(res => {
            if (res.code === 200) {
              this.post = res.data;
            } else {
              this.$notify.error({
                title: "提示",
                message: res.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$notify.error({
              title: "提示",
              message: "网络忙，文章详情获取失败"
            });
          });
    },
    //更新浏览量
    updateViewCount(){
      updatePostView({postId: this.$route.params.id})
    },
    // 获取评论列表
    getCommentList() {
      getCommentList({postId: this.$route.params.id}).then(res => {
        if (res.code === 200) {
          this.commentList = res.data;
          console.log(this.commentList)
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    // 发表评论
    submitForm() {
      //使用断言来判断内容是否为空{
        if (this.content!=="") {
          addComment({content: this.content, postId: this.$route.params.id, userName: store.state.user.userName}).then(res => {
            if (res.code === 200) {
              this.$message.success("评论成功");
              //清空输入框
              this.content = "";
              this.getCommentList();
            } else {
              this.$message.error(res.msg);
            }
          })
        } else {
          console.log('error submit!!');
          //清空输入框
          this.content = "";
          return false;
        }
    },
  },
  created() {
    this.getPostView();
    this.updateViewCount();
    this.getCommentList();
  }
};
</script>

<template>
  <el-row>
    <el-col :span="20" :offset="2">
      <el-card class="markdown-body">
        <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
        <h1>{{post.title}}</h1>
<!--        <blockquote>{{'作者：' + post.author +
                    ' |创建时间：' + post.createTime +
                    ' | 分类：' + post.categoryName }}</blockquote>-->
        <blockquote>{{'作者：' + post.userName + ' | 创建时间：' + dayjs(post.createTime).format("YYYY/MM/DD") + ' | 分类：' + post.categoryName }}</blockquote>
        <VueShowdown
            :markdown="post.content"
            flavor="vanilla"
            :options="{ emoji: true, tables: true }"
            :extensions="extensions"/>
      </el-card>
    </el-col>

    <!--评论区-->
    <el-col :span="14" :offset="5" style="opacity: 0.9">
      <el-card>
        <div slot="header" class="clearfix">
          <span>评论区</span>
        </div>
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="快来发表你的评论吧~"
            v-model="content">
        </el-input>
        <el-button type="primary" @click="submitForm">发表评论</el-button>
        <div v-for="comment in commentList" :key="comment.commentId">
          <el-card>
            <div slot="header" class="clearfix">
              <span>{{comment.userName}}</span>
              <span style="float: right">{{comment.createTime}}</span>
            </div>
            <p>{{comment.content}}</p>
          </el-card>
        </div>
      </el-card>
    <el-backtop></el-backtop>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-card {
  margin-top: 15px;
  padding: 20px;
}

</style>