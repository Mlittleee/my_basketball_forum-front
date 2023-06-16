<script>
  import Aside from "@/components/admin/Aside.vue";
  import Header from "@/components/admin/Header.vue";
  import Main from "@/components/admin/MainUser.vue";

  export default {
    name: 'Admin',
    components: {Main, Aside,Header},
    data() {
      return {
        isCollapse: false,
        aside_width: "200px"
      }
    },
    methods: {
      doCollapse() {
        this.isCollapse = !this.isCollapse
        if(!this.isCollapse){//展开
          this.aside_width = "200px";
        }else{
          this.aside_width = "64px";
        }
      }
    }
  };
</script>

<template>
  <!--右侧边框-->
  <el-container style="height: 100%; border: 1px solid #eee;margin-top: -1px;margin-left: -1px">
    <el-aside :width="aside_width" style="background-color: rgb(238, 241, 246); height: 100% ;">
      <Aside :isCollapse="isCollapse"></Aside>
    </el-aside>

    <!--首部区域-->
    <el-container style="height: 100%;margin-top: -1px">
      <el-header style="text-align: right; font-size: 14px; height: 80px;border-bottom: gray 4px solid">
        <Header @doCollapse="doCollapse"></Header>
      </el-header>

      <!--主界面-->
      <el-main style="height: 100%;">
        <router-view></router-view>
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