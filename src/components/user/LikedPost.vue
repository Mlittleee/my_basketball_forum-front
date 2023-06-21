<script>
import { refreshPostList} from "@/api/post";
import {getLikePost} from "@/api/like";
import {updatePostLike} from "@/api/postcard";
import dayjs from "dayjs";
import store from "@/store/index";
import {addLike} from "@/api/like";

export default {
  name: "PostListPage",
  data() {
    return {
      postTitle: "",
      postList: [],
      tagList: [],
      //标签列表
    };
  },
  methods: {
    dayjs,
    refreshPost() {
      refreshPostList()
    },
    loadPostList() {
      getLikePost({
          userId: store.state.user.userId,
      }).then(res => {
        if (res.code === 200) {
          this.postList = res.data;
          //遍历postList
          for (let i = 0; i < this.postList.length; i++) {
            //获取标签列表
            let myTags = this.postList[i].tags.slice(0, -1).split("/");
            this.tagList[this.postList[i].id] = myTags;
          }
        }else {
          this.$message({
            message: "你还没有点赞过任何帖子哦",
            type: "error",
          });
        }
      })
    },
    //重置
    requestParam() {
      this.postTitle = ""
      this.loadPostList();
    },
    //点赞
    updatePostLike(id) {
      updatePostLike({postId: id})
          .then((res) => {
            if (res.code === 200) {
              this.$message({
                message: "点赞成功",
                type: "success",
              });
              addLike({userId:store.state.user.userId, postId: id})
              this.loadPostList();
            } else {
              this.$message({
                message: "点赞失败",
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$message({
              message: "点赞失败",
              type: "error",
            });
          });
    },
  },
  beforeMount() {
    //获取一条帖子卡片的信息
    this.refreshPost();
    this.loadPostList();
  },
}

</script>

<template>
  <div>
    <div id="b">
    </div>
    <el-row :gutter="20" >
      <el-col :span="21" :offset="2" >
        <el-card v-for="post in postList" :key="post.id" style="height: 200px;opacity: 0.8">
          <div slot="header" style="margin-top: -70px">
            <router-link class="main-text" :to="'/post/' + post.id" v-html="post.title"></router-link>
            <div class="article-info">

              <!--使用v-for循环展示tagList中所有标签-->
              <el-tag class="elTag" v-for="(tag,index) in tagList[post.id]" :key="index" v-text="tag"
                      style="color: white" size="mini"></el-tag>

              浏览量：{{post.viewCount}}
              <el-button @click="updatePostLike(post.id)"
                         style="border:none;"
                         class="fa fa-thumbs-up" aria-hidden="true"></el-button>
              <i style="margin-left: -10px">点赞量：{{post.likeCount}}</i>
              <!--后续可以考虑做router-linker-->
              分类： {{post.categoryName}}

            </div>
          </div>
          <div class="tabloid">{{post.description}}</div>
          <i class="el-icon-user-solid article-icon">{{post.userName}}</i>
          <i class="el-icon-date article-icon">{{dayjs(post.createTime).format("YYYY/MM/DD")}}</i>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<style scoped>

.item-box {
  position: relative;
  width: 100%;
  height: 100%;
}

.desc-box {
  position: absolute;
  bottom: 0;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 40px;
  margin-left: -250px;
  margin-top: -20px;
  text-align: center;
}
.el-card {
  margin-top: 20px;
}

.elTag:nth-child(odd) {
  background-color: #167df0;
}

.elTag:nth-child(even) {
  background-color: lightseagreen;
}

.article-info {
  margin-top: -110px;
  color: #909399;
  font-size: 13px;
}
.article-icon,
.article-icon .tag {
  color: #909399;
  font-size: 13px;
  margin-right: 10px;
  text-decoration: none;
}
.article-icon .tag:hover {
  color: #409eff;
  cursor: pointer;
  margin-top: -100px;
}
.tabloid {
  color: #606266;
  font-size: 14px;
  margin-top: -150px;
}

#b{
  opacity: 1;
}

</style>