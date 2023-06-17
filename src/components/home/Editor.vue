<script>
//使用对话框来进一步确认消息
import {addPost} from "@/api/post";
import {addTags} from "@/api/tag";
import {getAllCategory} from "@/api/category";
import store from "../../store/index";
import {mapMutations} from "vuex";


export default {
  name: "Editor",
  data() {
    return {
      showDialog: false,
      //
      categories: [],
      //动态添加标签,这里更具在后端查询到的数据来动态显示
      tags: [],
      //上面的标签是动态添加的，下面的标签是用户输入的，用来返回给前端用的
      inputTag: "",
      inputTagVisible: false,

      post: {
        title: "",
        content: "",
        category: "",
        description: "",
        author: store.state.user.userName,
      }
    };
  },
  methods: {
    //使用vuex中的state来处理动态标签的获取问题
    ...mapMutations(["setTagsList", "delTagsItem", "setPostId", "clearTags"]),

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
          this.assertNotEmpty(this.post.content, "请填写帖子内容")
      ) {
        this.showDialog = true;
      }
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
          this.assertNotEmpty(this.post.category, "请选择帖子分类") &&
          this.assertNotEmpty(this.post.description, "请填写帖子描述")
      ) {
        //先添加帖子
        addPost(this.post)
            .then((res) => {
              this.$message({
                message: "发布成功",
                type: "success",
              });
               //将返回的postId存入vuex中
               this.setPostId(res.data)
              addTags(store.state.tagsList)
                  .then((res) => {
                    this.$message({
                      message: "添加标签成功",
                      type: "success",
                    });
                  })
                  .catch((err) => {
                    this.$message({
                      message: "添加标签失败",
                      type: "error",
                    });
                  });
            })
            .catch((err) => {
              this.$message({
                message: "发布失败",
                type: "error",
              });
            });
        //关闭对话框
        this.showDialog = false;
        //清空数据
        this.post = {
          title: "",
          content: "",
          category: "",
          description: "",
        };
        this.tags = [];
      }
      //清空vuex中的数据
      this.clearTags()
    },
    //获取所有分类
    getAllCategory() {
      getAllCategory()
          .then((res) => {
            console.log(res.data)
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
          postId: store.state.postId,
        };
        let list = [tag]
        this.setTagsList(list)
      }
      this.inputTagVisible = false;
      this.inputTag = '';
    }
  },
  mounted() {
    this.getAllCategory();
    this.clearTags()
  },
}
</script>

<template>
  <div class="app-container">
    <!--标题-->
    <div class="title-box">
      <input type="text" class="title" v-model="post.title" style="font-size: 25px" placeholder="请输入帖子标题..." />
      <el-button type="text" @click="openDialog" style="font-size: 20px">发布</el-button>
    </div>

    <!--编辑器-->
    <mavon-editor v-model="post.content" class="editor" />

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
          <el-select v-model="post.category" placeholder="请选择" style="width: fit-content">
            <el-option
                v-for="(category,index) in categories"
                :key="index"
                :label="category"
                :value="category"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="帖子描述：">
          <el-input type="textarea" v-model="post.description" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="作者：">
          <span style="font-size: 20px">{{post.author}}</span>
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