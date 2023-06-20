<script>
import CardBar from "@/components/home/CardBar.vue";
import {getDescription, PostListByCategory} from "@/api/category";
import {updatePostLike} from "@/api/postcard";
import dayjs from "dayjs";

export default {
  name: "cubaCategory",
  components: {CardBar},
  data() {
    return {
      categoryName: "CUBA",
      postList: [],
      tagList: [],
      //标签列表
      pageSize: 10,
      pageNum: 1,
      total: 0,
      description:''
    };
  },
  methods: {
    dayjs,
    loadPostList() {
      PostListByCategory({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        param: {
          categoryName: this.categoryName
          //sex: this.sex
        }
      }).then(res => {
        this.postList = res.data;
        console.log(this.postList)
        this.total = res.total;

        //遍历postList
        for (let i = 0; i < this.postList.length; i++) {
          //获取标签列表
          let myTags = this.postList[i].tags.slice(0, -1).split("/");
          console.log(myTags)
          this.tagList[this.postList[i].id] = myTags;
          console.log(this.tagList)
        }
      })
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageNum = 1;
      this.pageSize = val;
      this.loadPostList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.pageNum = val;
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
      fetchDescription(){
          getDescription({categoryName: 'CUBA'}).then(res=>{
              console.log(res)
              this.description= res.data
          })
      }
  },
  beforeMount() {
    this.loadPostList();
  },
    created() {
        this.fetchDescription()
    }
}
</script>

<template>
  <div>
    <div>
      <!--这里可以用来展示板块的描述-->
    </div>

    <div class="columns" style="margin-left: -140px">
      <div class="column is-three-quarters">
        <!--这里用来展示分页数据-->
        <div>
          <el-row :gutter="20" >
            <el-col :span="21" :offset="2" >
              <el-card v-for="post in postList" :key="post.id">
                <div slot="header">
                  <router-link class="main-text" :to="'/post/' + post.id" v-html="post.title"></router-link>
                  <div class="article-info">

                    <!--使用v-for循环展示tagList中所有标签-->
                    <el-tag class="elTag" v-for="(tag,index) in tagList[post.id]" :key="index" v-text="tag"
                            style="color: white" size="mini"></el-tag>

                    浏览量：{{post.viewCount}}
                    <el-button @click="updatePostLike(post.id)"></el-button> 点赞量：{{post.likeCount}}
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

          <!--      <el-col :span="6">
                  <el-card>个人信息</el-card>
                </el-col>-->
          <!--分页-->
          <el-pagination class="page"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pageNum"
                         :page-sizes="[2,5,10]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="column">
        <CardBar></CardBar>
          <el-card class="box-card" shadow="never" id="txt">
              <div slot="header">
                  <span>🏀 {{categoryName}}板块简介</span>
              </div>
              <div>
                  <div class="has-text-left block">
                      {{description}}
                  </div>
              </div>
          </el-card>
      </div>
    </div>
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
#txt{
    text-align:left;
}

</style>