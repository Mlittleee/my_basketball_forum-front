<script>
import {getPostDetail} from "@/api/post";
import showdownHighlight from "showdown-highlight";

export default {
  name: "PostView",
  data() {
    return {
      post: {content: ""},
      extensions: [showdownHighlight]
    };
  },
  methods: {
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
    }
  },
  created() {
    this.getPostView();
  }
};
</script>

<template>
  <el-row>
    <el-col :span="20" :offset="2">
      <el-card class="markdown-body">
        <h1>{{post.title}}</h1>
<!--        <blockquote>{{'作者：' + post.author +
                    ' |创建时间：' + post.createTime +
                    ' | 分类：' + post.categoryName }}</blockquote>-->
        <blockquote>{{'作者：' + post.userName + ' | 创建时间：' + post.createTime + ' | 分类：' + post.categoryName }}</blockquote>
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