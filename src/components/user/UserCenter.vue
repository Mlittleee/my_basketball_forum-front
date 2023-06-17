<template>
  <div>
    <el-container class="container">
      <el-header style="height: 100px">
        <p class="title" >个人中心</p>
          <el-button type="danger"
                     size="mini"
                     class="logout-btn"
                     @click="onBack">
            返回主页</el-button>
      </el-header>

      <el-container class="content-container">
        <vue-particles
            class="userCenter-bg"
            color="#Ffffff"
            :particleOpacity="1.7"
            :particlesNumber="300"
            shape-type="circle"
            :particleSize="4"
            linesColor="#Ffffff"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="4"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        ></vue-particles>

        <el-aside width="400px">
          <div class="user-profile">
            <el-avatar size="large" src="https://avatars0.githubusercontent.com/u/20942571?s=460&v=4"></el-avatar>
            <div class="userInfo">
              <span>用户名：{{this.$store.state.user.username}}</span>
            </div>
          </div>
        </el-aside>

        <el-main>
          <p>这里是主页面</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
//import store from "../../store/index.js";

<script>
export default {
  name:"UserCenter",
  data() {
    return {

    }
  },
  methods: {
    onBack() {
      this.$router.push("/Home/Carousel");
    }
  }
}

</script>


<style scoped>
.userCenter-bg{
  width: 190px;
  height: 100%;
  background: firebrick;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.title {
  font-family: Helvetica Neue;
  font-size: 50px;
  font-weight: bolder;
  color: white;
  margin: auto 0;
}
.el-header {
  background-color: darkred;
  color: #333;
  line-height: 60px;
  padding: 0;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.userInfo {
  margin-top: 10px;
}

.el-main {
  background-color: #F2F2F2;
  color: #333;
  text-align: center;
  line-height: 160px;
  flex: 1;
  margin: 0 20px;
}

.search-input {
  margin-bottom: 20px;
  width: 250px;
  margin-left:-100px;
}
</style>