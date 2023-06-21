<script>

  export default {
    name: 'Aside',
    data() {
      return {
        //isCollapse: false
      }
    },
    props: {
      isCollapse:Boolean
    },
    methods: {

    }
  }

</script>

<template>
  <el-menu
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 100vh"
      default-active="/Admin/adminCategory/NBA"
      :collapse="isCollapse"
      :collapse-transition="false"
  >
    <el-menu-item index="/Admin/adminUser" style="font-size: 18px">
      <i class="el-icon-user-solid"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>

    <el-menu-item index="/Admin/adminPost" style="font-size: 18px">
      <i class="el-icon-document" ></i>
      <span slot="title">文章管理</span>
    </el-menu-item>

    <el-menu-item index="/Admin/adminComment" style="font-size: 18px">
      <i class="el-icon-chat-line-square"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>

    <el-menu-item index="/Admin/adminTip" style="font-size: 18px">
      <i class="el-icon-chat-line-square"></i>
      <span slot="title">名言管理</span>
    </el-menu-item>

    <el-submenu index='/Admin/adminCategory'>
      <span slot="title" style="font-size: 18px"><i class="el-icon-loading" ></i>板块管理</span>
      <el-menu-item index='/Admin/adminCategory/NBA'>NBA</el-menu-item>
      <el-menu-item index='/Admin/adminCategory/CBA'>CBA</el-menu-item>
      <el-menu-item index='/Admin/adminCategory/teach'>篮球教学</el-menu-item>
      <el-menu-item index='/Admin/adminCategory/CUBA'>CUBA</el-menu-item>
      <el-menu-item index='/Admin/adminCategory/wilkins'>野球帝</el-menu-item>
    </el-submenu>


  </el-menu>
</template>

<style scoped>

</style>