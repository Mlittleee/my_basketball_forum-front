<script>
import {mapMutations} from "vuex";
import Footer from "@/components/home/Footer.vue";

  export default {
    name: 'home',
    components: {Footer},
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        activeNames: ['1']
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
        this.$router.push("/Admin");
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleChange(val) {
        console.log(val);
      }
    }
  }

</script>

<template>
  <div style="background-color: black">
    <div style="text-align: end">
      <el-dropdown style="text-align: end">
        <span style="font-size: 18px">用户中心</span><i class="fa fa-user" style="margin-left: 10px;font-size: 23px;color: #2c3e50" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
          <el-dropdown-item @click.native="enterAdmin">进入管理员后台</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="background-color: darkred;color: #eeeeee">
      <el-menu-item index="1" style="margin-left: 80px">首页</el-menu-item>
      <el-menu-item index="2" style="margin-left: 180px">NBA</el-menu-item>
      <el-menu-item index="3" style="margin-left: 180px">CBA</el-menu-item>
      <el-menu-item index="4" style="margin-left: 180px">CUBA</el-menu-item>
      <el-menu-item index="5" style="margin-left: 180px">野球帝</el-menu-item>
      <el-menu-item index="6" style="margin-left: 180px">社区</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <div style="background-color: #eeeeee">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div>


    </div>

    <div>
      <Footer/>
    </div>
  </div>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}



</style>