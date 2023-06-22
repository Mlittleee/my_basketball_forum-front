<script>
import {getDescription, updateDescription, getHeat, getPercent} from "@/api/category";
import {refreshPostList} from "@/api/post";

export default {
  name: "wilkins",
  data() {
    return {
      currentDate: new Date(),
      description: "",
      categoryName: "野球帝",
      DialogVisible:false,
      userPercent: 0,
      postPercent: 0,
      //热度数
      hotNum: 0,
      rules: {
        content: [
          {required: true, message: '请输入简介内容', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    getDescription(categoryName) {
      getDescription({categoryName: categoryName}).then(res => {
        if (res.code === 200) {
          this.description = res.data;
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    // 更新分类简介
    updateDescription(categoryName, description) {
      updateDescription({categoryName: categoryName, description: description}).then(res => {
        if (res.code === 200) {
          this.DialogVisible = false;
          this.$message.success("成功更新简介");
        } else {
          this.DialogVisible = false;
          this.$message.error(res.msg);
        }
      })
    },
    //获取热度数
    getHeat(categoryName) {
      getHeat({categoryName: categoryName}).then(res => {
        if (res.code === 200) {
          this.hotNum = res.data;
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    //获取占比
    getPercent(categoryName) {
      getPercent({categoryName: categoryName}).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.userPercent = res.data[0];
          this.postPercent = res.data[1];
        } else {
          this.$message.error(res.msg);
        }
      })
    },
  },
  mounted() {
    this.getDescription(this.categoryName);
    this.getHeat(this.categoryName);
    this.getPercent(this.categoryName);
  }
};
</script>

<template>
  <div>
    <el-row style="background-color: white; height: 820px">
      <el-col :span="10" style="height: 100%" >
        <el-card :body-style="{ padding: '0px' }">
          <!--取出assets目录下的图片-->
          <img src="../../../assets/imags/wilkins.png" class="image">
          <div style="padding: 10px;">
            <span style="font-size: 30px">野球帝</span>
            <div>{{description}}</div>
            <div class="bottomA clearfixA">
              <time class="timeA">{{ currentDate }}</time>
              <el-button type="text" class="buttonA">修改简介</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <!--根据后端传回的数据来可视化的数据-->
      <el-col :span="10" style="margin-left: 30px; width: 680px">
        <el-tag style="font-size: 25px">板块所属的帖子数占比</el-tag>
        <el-progress type="circle" :percentage=userPercent></el-progress>
        <el-tag style="font-size: 25px;margin-top: 60px" type="danger">板块发帖的的用户占比</el-tag>
        <el-progress type="circle" :percentage=postPercent color="red"></el-progress>
      </el-col>

      <el-row>
        <!--使用v-for来循环生成五个火苗图案-->
        <el-col :span="1" v-for="index in hotNum" :key="index" style="margin-top: 200px;margin-left: 10px">
          <img src="../../../assets/imags/fire.png" class="image" alt="">
        </el-col>
      </el-row>
    </el-row>

    <!--编辑板块简介弹出框-->
    <el-dialog
        title="编辑板块简介"
        :visible.sync="DialogVisible"
        width="30%"
        center>
      <el-form ref="form" label-width="80px" :rules="rules">
        <el-form-item label="简介" prop="description">
          <el-col :span="15">
            <el-input v-model="description"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDescription(categoryName,description)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.timeA {
  font-size: 13px;
  color: #999;
}

.bottomA {
  margin-top: 13px;
  line-height: 12px;
}

.buttonA {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfixA:before,
.clearfixA:after {
  display: table;
  content: "";
}
.clearfixA:after {
  clear: both
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

</style>