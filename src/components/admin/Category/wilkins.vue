<script>

export default {
  name: "wilkins",
  data() {
    return {
      currentDate: new Date()
    };
  }
}
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
            <div>这里用来放置简介</div>
            <div class="bottomA clearfixA">
              <time class="timeA">{{ currentDate }}</time>
              <el-button type="text" class="buttonA">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <!--根据后端传回的数据来动态生成指定数量的卡片-->
      <el-col :span="10" style="margin-left: 30px; width: 680px">
        <el-card :body-style="{ padding: '0px' }">
          <!--取出assets目录下的图片-->
          <div slot="header" class="clearfix">
            <span>从后端获得</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div>
            {{ "简介" }}
          </div>
        </el-card>
      </el-col>

    </el-row>
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