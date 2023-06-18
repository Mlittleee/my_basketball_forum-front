<script>
import {getTagsByPostId} from "@/api/tag";
import {getPostCard} from "@/api/post";
import dayjs from "dayjs";

export default {
  name: "PostCard",
  data() {
    return {
      post: {
        id: 0,
        title: "",
        description: "",
        viewCount: 0,
        likeCount: 0,
        categoryName: "",
        userName: "",
        createTime: "",
      },
      tagList: []
    };
  },
  methods: {
    dayjs

  },
  beforeMount() {
    //获取标签列表
    getTagsByPostId(1).then(res => {
      this.tagList = res.data;
      console.log(this.tagList)
    })
    //获取一条帖子卡片的信息
    getPostCard().then(res => {
      console.log(res.data)
      this.post = res.data;
    })
  },
}
</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="14" :offset="2">
        <el-card >
          <div slot="header">
            <router-link class="main-text" :to="'/post/' + post.id" v-html="post.title"></router-link>
            <div class="article-info">

              <!--使用v-for循环展示tagList中所有标签-->
              <el-tag class="elTag" v-for="(tag,index) in tagList" :key="index" v-text="tag.name"
                      style="color: white" size="mini"></el-tag>
              浏览量：{{post.viewCount}}
              点赞量：{{post.likeCount}}
              <!--后续可以考虑做router-linker-->
              分类： {{post.categoryName}}

            </div>
          </div>
          <div class="tabloid">{{post.description}}</div>
          <i class="el-icon-user-solid article-icon">{{post.userName}}</i>
          <i class="el-icon-date article-icon">{{dayjs(post.createTime).format("YYYY/MM/DD")}}</i>
        </el-card>
      </el-col>
<!--      <el-col :span="6">
        <el-card>个人信息</el-card>
      </el-col>-->
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
  margin-top: 10px;
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
}
.tabloid {
  color: #606266;
  font-size: 14px;
  margin-bottom: 10px;
}

</style>