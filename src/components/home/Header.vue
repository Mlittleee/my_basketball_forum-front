<script>
import {mapMutations} from "vuex";
import store from "../../store/index";

export default {
  name: "Header",
  data() {
    return {
      activeIndex: '1',
      isAdmin: store.state.user.roleId
    }
  },
  methods: {
    ...mapMutations(["logout"]),
    toUser() {
      this.$message({message: "进入个人中心", type: "success",});
      this.$router.push("/user");
    },
    logOut() {
      this.logout();
      this.$router.push("/Login");
    },
    enterAdmin() {
      if (this.isAdmin === 0) {
        this.$message({message: "进入管理员后台", type: "success",});
        this.$router.push("/Admin");
      }
      else {
        this.$message({message: "您不是管理员，无法进入管理员后台", type: "error",});
      }
    },
    handleSelect(key) {
      switch (key) {
        case '1':
          this.$router.push("/Home/Carousel"); // 跳转到首页
          break;
        case '2':
          this.$router.push("/Home/NBA"); // 跳转到 NBA 页面
          break;
        case '3':
          this.$router.push("/Home/CBA"); // 跳转到 CBA 页面
          break;
        case '4':
          this.$router.push("/Home/CUBA"); // 跳转到首页
          break;
        case '5':
          this.$router.push("/Home/Wilkins"); // 跳转到 NBA 页面
          break;
        case '6':
          this.$router.push("/Community"); // 跳转到 NBA 页面
          break;
      }
    }
  }
}
</script>

<template>
  <div id="b">
    <el-menu  default-active="1" class="el-menu-demo" mode="horizontal" style="background-color: darkred;weight: bolder; color:#ffffff" @select="handleSelect">
      <el-menu-item index="1" style="margin-left: 60px;color: #DAA520">首页</el-menu-item>
      <el-menu-item index="2" style="margin-left: 170px">NBA</el-menu-item>
      <el-menu-item index="3" style="margin-left: 170px">CBA</el-menu-item>
      <el-menu-item index="4" style="margin-left: 170px">CUBA</el-menu-item>
      <el-menu-item index="5" style="margin-left: 170px">野球帝</el-menu-item>
      <el-menu-item index="6" style="margin-left: 170px">社区</el-menu-item>
        <div style="text-align: end">
          <el-dropdown style="text-align: end; margin-top: 15px">
            <span style="font-size: 15px; color: black">用户中心</span><i class="fa fa-user" style="margin-left: 10px;font-size: 23px;color: black" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
              <el-dropdown-item @click.native="enterAdmin">进入管理员后台</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<style scoped>

</style>