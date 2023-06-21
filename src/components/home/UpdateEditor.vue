<script>
//使用对话框来进一步确认消息
import {getLastPostId, refreshPostList, updatePostContent, getPostDetail} from "@/api/post";
import {addTags} from "@/api/tag";
import {getPostById, updatePost} from "@/api/postcard";

import {getAllCategory} from "@/api/category";
import store from "../../store/index";
import {mapMutations} from "vuex";
import router from "@/router";

export default {
  name: "UpdateEditor",
  data() {
    return {
      showDialog: false,
      categories: [],
      tags: [],         //动态添加标签,这里更具在后端查询到的数据来动态显示
      inputTag: "",
      inputTagVisible: false,
      postId: this.$route.query.id,
      content: "",

      post: {
        id: this.$route.query.id,
        title: "",
        categoryName: "",
        description: "",
        userName: "",
        viewCount: 0,
        likeCount: 0,
        tags: "",
        createTime:""
      }
    };
  },
  methods: {
    //使用vuex中的state来处理动态标签的获取问题
    ...mapMutations(["setTagsList", "delTagsItem", "clearTags"]),

    // 使用断言来保证内容为非空
    assertNotEmpty(target, msg) {
      if (!target) {
        this.$message({
          message: msg,
          type: "warning",
        });
        return false;
      }
      return true;
    },
    //通过el-Dialog打开文章信息填写框
    openDialog() {
      if (
          this.assertNotEmpty(this.post.title, "请填写帖子标题") &&
          this.assertNotEmpty(this.content, "请填写帖子内容")
      ) {
        this.showDialog = true;
      }
    },
    //返回上一级
    onBack() {
      this.$router.go(-1);
    },
    //获取帖子信息
    getPostInfo() {
      getPostById({postId: this.postId})
          .then((res) => {
            this.post = res.data;
          })
          .catch((err) => {
            this.$message({
              message: "获取帖子信息失败",
              type: "error",
            });
          });
      getPostDetail({postId: this.postId})
          .then((res) => {
            this.content = res.data.content;
          })
          .catch((err) => {
            this.$message({
              message: "获取帖子内容失败",
              type: "error",
            });
          });
    },
    //关闭填写框
    handleCancel() {
      //和用户确认是否关闭
      this.$confirm("确认关闭？")
          .then((_) => {
            this.showDialog = false;
          })
          .catch((_) => {});
      this.showDialog = true;
    },
    handleSubmit() {
      if (
          this.assertNotEmpty(this.post.categoryName, "请选择帖子分类") &&
          this.assertNotEmpty(this.post.description, "请填写帖子描述")
      ) {
        //this.post.category = this.categories.indexOf(this.post.category) + 1;
        updatePost(this.post)
            .then((res) => {
              if (res.code === 200) {
                updatePostContent({postId: this.postId, content: this.content})
                this.$message({
                  message: "发布成功",
                  type: "success",
                });
                addTags(store.state.tagsList)
                    .then((res) => {
                      this.$message({
                        message: "添加标签成功",
                        type: "success",
                      });
                      refreshPostList();
                      //关闭对话框
                      this.showDialog = false;
                      //清空数据
                      this.post = {
                        title: "",
                        content: "",
                        categoryName: "",
                        description: "",
                        userId: store.state.user.userId,
                      };
                      this.tags = [];
                      router.push({path: "/Admin/adminPost"})
                    })
                    .catch((err) => {
                      this.$message({
                        message: "添加标签失败",
                        type: "error",
                      });
                    });
              } else {
                this.$message({
                  message: "已经存在同名帖子了，换个标题试试吧",
                  type: "error",
                });
              }
            })
      }
    },
    //获取所有分类
    getAllCategory() {
      getAllCategory()
          .then((res) => {
            let CategoryArray = res.data;
            for (let i = 0; i < CategoryArray.length; i++) {
              this.categories.push( CategoryArray[i].name);
            }
          })
          .catch((err) => {
            this.$message({
              message: "获取分类失败",
              type: "error",
            });
          });
    },
    //获取最后一个帖子的id
    getLastPostId() {
      getLastPostId()
          .then((res) => {
            this.postId = res.data;
          })
          .catch((err) => {
            this.$message({
              message: "获取帖子id失败",
              type: "error",
            });
          });
    },
    //动态添加标签
    handleTagClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      //将标签从vuex中删除
      this.delTagsItem(tag)
    },

    showTagInput() {
      this.inputTagVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleTagInputConfirm() {
      let inputValue = this.inputTag;
      if (inputValue) {
        this.tags.push(inputValue);
        //将标签存入vuex中
        let tag = {
          name: inputValue,
          postId: this.postId + 1
        };
        let list = [tag]
        this.setTagsList(list)
      }
      this.inputTagVisible = false;
      this.inputTag = '';
    }
  },
  beforeMount() {
    this.getAllCategory();
    this.clearTags();
    this.getLastPostId();
    this.getPostInfo();
  },
}
</script>

<template>
  <div class="app-container">
    <!--标题-->
    <div class="title-box">
      <input type="text" class="title" v-model="post.title" style="font-size: 25px; width: 1200px" placeholder="请输入帖子标题..." />
      <span>
          <el-button type="text" @click="openDialog" style="font-size: 20px; margin-left: -200px; width: 100px">发布</el-button>
          <el-button type="text" @click="onBack" style="font-size: 20px">返回</el-button>
        </span>
    </div>

    <!--编辑器-->
    <mavon-editor v-model="content" class="editor" />

    <!--发布文章信息填写框-->
    <el-dialog :title="`发布帖子：${post.title}`" :visible.sync="showDialog" width="30%">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="标签：" style="width:fit-content">
          <el-tag
              :key="tag"
              v-for="tag in tags"
              closable
              :disable-transitions="false"
              @close="handleTagClose(tag)">
            {{tag}}</el-tag>
          <el-input
              v-if="inputTagVisible"
              v-model="inputTag"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleTagInputConfirm"
              @blur="handleTagInputConfirm"
              class="input-new-tag"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ 新标签</el-button>
        </el-form-item>

        <el-form-item label="分类：" style="width: 200px">
          <el-select v-model="post.categoryName" placeholder="请选择" style="width: fit-content">
            <el-option
                v-for="(categoryName,index) in categories"
                :key="index"
                :label="categoryName"
                :value="categoryName"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="帖子描述：">
          <el-input type="textarea" v-model="post.description" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="作者：">
          <span style="font-size: 20px">{{post.userName}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer">
    <el-button @click="handleCancel">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">发布</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.editor {
  height: 850px;
}

.title-box {
  display: grid;
  grid-template-columns: 22fr 2fr;
  height: 100px;
}
.title {
  background: none;
  color: #303133;
  text-indent: 0px;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  display: block;

  border: none;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0;
  line-height: 1;
  overflow: visible;
  margin-bottom: 15px;
  padding: 4px;
}
.title:focus {
  border-color: #409eff;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>