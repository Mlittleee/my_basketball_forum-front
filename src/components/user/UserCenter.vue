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

        <el-aside width="300px" class="custom-aside">
          <div class="user-profile">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size='80px'></el-avatar>
            <!--用户信息展示-->


          </div>
        </el-aside>

        <el-main class="custom-main">
          <el-input placeholder="请输入搜索内容" class="search-input"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <br>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name:"UserCenter",
  data() {
    return {

    }
  },
  methods: {
    onBack() {
      this.$router.push("/Home");
    }
  }
}

</script>


<style scoped>

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

.content-container {
  flex: 1;
  margin: 0 140px;
}

.el-aside {
  background-color: #F7F7F7;
  color: #333;
  text-align: center;
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