<template>
  <div style="height: 10000px">
    <el-container class="container">
      <el-header style="height: 40px; background-color: darkred">
        <p class="title">个人中心</p>
      </el-header>

      <el-button type="danger"
                 size="mini"
                 style="background-color: darkred; color: white; position: absolute; right: 20px; top: 10px;"
                 class="logout-btn"
                 @click="onBack">返回主页</el-button>

      <el-container class="content-container">
        <!--侧边动态粒子特效-->
        <vue-particles
            class="userCenter-bg"
            color="#Ffffff"
            :particleOpacity="1.7"
            :particlesNumber="300"
            shape-type="circle"
            :particleSize="4"
            linesColor="#Ff0000"
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


        <el-main>
          <div>
            <div class="PersonTop">
              <!--用户的头像-->
              <div class="PersonTop_img" >
               <img src="../../assets/imags/userWilkins.png">
              </div>

              <div class="PersonTop_text">
                <!--用户的基本信息-->
                <div class="user_text" style="margin-left: -200px">
                  <div class="user_name">
                    <span style="margin-left: 100px">
                      用户名： {{ user.userName }}
                      <el-tag v-if="this.user.roleId === 0" style="margin-left: 50px"> 管理员</el-tag>
                      <el-tag v-else style="margin-left: 50px">普通用户</el-tag>
                    </span>
                  </div>
                  <div>
                    <el-tag v-if="this.user.gender === 1" style="margin-left: -65px"><i class="fa fa-male" aria-hidden="true" /></el-tag>
                    <el-tag v-else style="margin-left: -65px"><i class="fa fa-female" aria-hidden="true" /></el-tag>
                  </div>
                  <div>
                    <span style="margin-left: 80px"> 个性签名： {{ user.sign }}</span>
                  </div>
                  <!--用户的发帖数和获赞数-->
                  <div class="user_num">
                    <div class="user_num_item">
                      <span>发帖数</span><span> {{ postNum }}</span>
                    </div>

                    <div class="user_num_item" style="width: 150px">
                      <span style="width: 50px">获赞数</span><span> {{ likeNum }}</span>
                    </div>
                  </div>
                </div>
            </div>


            <div class="person_body">
              <div class="person_body_left">
                <el-card class="box-card" :body-style="{ padding: '0px' }">

                  <div slot="header" class="clearfix">
                    <span class="person_body_list" style="border-bottom: none">个人中心服务</span>
                  </div>

                  <el-menu active-text-color="#00c3ff" class="el-menu-vertical-demo" :router="true">
                    <el-menu-item index="/user/userDetail">
                      <i class="el-icon-user"></i>
                      <span slot="title">个人简介</span>
                    </el-menu-item>

                    <el-menu-item>
                      <i class="el-icon-edit-outline"></i>
                        <el-button type="text" @click="toEditor" style="margin-left: -20px">发帖</el-button>
                    </el-menu-item>

                    <el-menu-item index="/user/likedPost">
                      <i class="el-icon-document"></i>
                      <span slot="title">你喜欢的都在这</span>
                    </el-menu-item>

                    <el-menu-item index="/user/myPosts">
                      <i class="el-icon-document"></i>
                      <span slot="title">我的帖子</span>
                    </el-menu-item>
                  </el-menu>
                </el-card>
              </div>

              <div class="person_body_right">
                <router-view></router-view>
              </div>
            </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from "@/store/index";
import tag from "buefy/dist/cjs/tag";
import {getPostCount, getLikeCount} from "@/api/user";

export default {
  name:"UserCenter",
  computed: {
    tag() {
      return tag
    }
  },
  data() {
    return {
      user: store.state.user,
      postNum: 0,
      likeNum: 0,
    }
  },
  methods: {
    onBack() {
      this.$router.push("/Home/Carousel");
    },
    toEditor() {
      this.$router.push("/editor");
    },
    //取得用户的发帖数
    getPostCount() {
      getPostCount({id: this.user.userId}).then(res => {
        this.postNum = res.data;
      })
    },
    //取得用户的获赞数
    getLikeCount() {
      getLikeCount({id: this.user.userId}).then(res => {
        this.likeNum = res.data;
      })
    }
  },
  beforeMount() {
    this.getPostCount();
    this.getLikeCount();
  }
}
</script>


<style scoped>
.userCenter-bg{
  width: 190px;
  height: 100%;
  background-color: darkred;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: darkred ;
}

.title {
  font-family: Helvetica Neue;
  font-size: 30px;
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

.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: fixed;
  left: 0;
  z-index: 0;
  top: 0;
}
.PersonTop {
  width: 1060px;
  height: 160px;
  padding-top: 10px;
  background-color: white;
  margin-top: -10px;
  position: absolute;
  left: 50%;
  transform: translateX(-42%);
  display: flex;
  border-radius: 5px;
}

.PersonTop_img {
  width: 120px;
  height: 120px;
  background-color: #8c939d;
  margin-right: 24px;
  margin-left: 20px;
  overflow: hidden;
  border-radius: 20px;
}

.PersonTop_img img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.PersonTop_text {
  height: 120px;
  width: 880px;
  display: flex;
}

.user_text {
  width: 60%;
  height: 100%;
  line-height: 30px;
}

.user_name {
  font-weight: bold;
}

.user_num {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: -20px;
  margin-left: 190px;
}

.user_num > div {
  text-align: center;
  border-right: 1px dotted #999;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  line-height: 20px;
}

.num_text {
  color: #999;
}

.num_number {
  font-size: 20px;
  color: #333;
}
.el-menu-item>span {
  font-size: 16px;
  color: #999;
}

/*下面部分样式*/
.person_body {
  width: 1060px;
  height: 600px;
  margin-top: 160px;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.person_body_left {
  width: 27%;
  height: 600px;
  border-radius: 5px;
  margin-right: 3%;
  text-align: center;
}

.person_body_list {
  width: 100%;
  height: 50px;
  margin-top: 25px;
  font-size: 22px;
  border-bottom: 1px solid #f0f0f0;
  background-image: -webkit-linear-gradient(
      left,
      rgb(42, 134, 141),
      #e9e625dc 20%,
      #3498db 40%,
      #e74c3c 60%,
      #09ff009a 80%,
      rgba(82, 196, 204, 0.281) 100%
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
}

.el-menu-item {
  margin-top: 22px;
}

.person_body_right {
  width: 70%;
  /* height: 500px; */
  border-radius: 5px;
  background-color: white;
}

.box-card {
  height: 600px;
}

/*ui样式*/
.el-button {
  width: 84px;
}

</style>