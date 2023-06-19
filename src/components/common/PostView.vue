<script>
import {getPostDetail} from "@/api/post";
import {updatePostView} from "@/api/postcard";
import showdownHighlight from "showdown-highlight";
import dayjs from "dayjs";

export default {
  name: "PostView",
  data() {
    return {
      post: {content: ""},
      extensions: [showdownHighlight],
      postId: this.$route.params.id
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
    }
  },
  created() {
    this.getPostView();
    this.updateViewCount();
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
    <el-backtop></el-backtop>
  </el-row>
</template>

<style scoped>
.el-card {
  margin-top: 15px;
  padding: 20px;
}
</style>