<script>
import store from "@/store/index";

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
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 100vh"
      default-active="/Home"
      :collapse="isCollapse"
      :collapse-transition="false"
  >
    <el-menu-item index="/Home" style="font-size: 18px">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-menu-item index="/One" style="font-size: 18px">
      <i class="el-icon-s-grid"></i>
      <span slot="title">导航一</span>
    </el-menu-item>

    <el-menu-item index="/Two" style="font-size: 18px">
      <i class="el-icon-s-opportunity"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
<!--    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>导航一</template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>导航二</template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-setting"></i>导航三</template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="3-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="3-4">
        <template slot="title">选项4</template>
        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>-->
  </el-menu>
</template>

<style scoped>

</style>