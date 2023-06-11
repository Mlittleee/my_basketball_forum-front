<script>
  import Aside from "@/components/Aside.vue";
  import Header from "@/components/Header.vue";
  import Main from "@/components/Main.vue";

  export default {
    name: 'Index',
    components: {Main, Aside,Header},

  };
</script>

<template>
  <!--边框-->
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 100%">
      <Aside></Aside>
    </el-aside>

    <!--首部区域-->
    <el-container style="height: 100%;">
      <el-header style="text-align: right; font-size: 20px; height: 80px">
        <Header></Header>
      </el-header>

      <!--主界面-->
      <el-main style="height: 100%;">
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    line-height: 60px;
    padding: 5px;
  }
  .el-aside {
    color: #333;
  }
</style>