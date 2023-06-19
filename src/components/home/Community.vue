<script>
import Header from "@/components/home/Header.vue";
import {listUser, findUserByName} from "@/api/user";

export default {
  name: "Community",
  components: {Header},
  data() {
    return {
      //isFollow: true,//是否关注
      searchUser: "",//搜索框输入
      userData: [],//数据.....可先把下面的json数据放在这里看效果
    };
  },
  methods: {
    //搜索框搜索
    selectUser(searchUser){
      findUserByName({UserName: searchUser})
          .then(res => {
            if (res.code === 200) {
              this.userData = res.data;
            } else {
              this.$notify.error({
                title: "提示",
                message: res.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$notify.error({
              title: "提示",
              message: "网络忙，用户列表获取失败"
            });
          });
    },
    //页面数据加载
    listUser() {
      listUser()
          .then(res => {
            if (res.code === 200) {
              this.userData = res.data;
            } else {
              this.$notify.error({
                title: "提示",
                message: res.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$notify.error({
              title: "提示",
              message: "网络忙，用户列表获取失败"
            });
          });
    },
    //重置搜索框
    reset() {
      this.searchUser = "";
      this.listUser();
    },
    //follow(id) {},//关注触发事件
    /*personal(id) {
      this.$router.push({ path: `/newsuser/personal/${id}` });//进入他人页面
    },*/
  },
  mounted() {
    this.listUser();
  },
}
</script>

<template>
  <div>
    <!--头部-->
    <Header></Header>

      <div class="allUser">
        <div class="head">
          <h3>活跃用户列表</h3>
          <div>
            <el-button
                type="info"
                size="mini"
                round
                style="margin-left: -600px"
                @click="reset()"
            >重置</el-button>
          </div>
          <!--搜索框-->
          <div class="headSearch">
            <el-input placeholder="请输入想要搜索的活跃用户" v-model="searchUser">
              <div  slot="suffix"
                  style="cursor: pointer"
                  class="el-input__icon el-icon-search"
                  @click="selectUser(searchUser)">
              </div>
            </el-input>
          </div>

        </div>
        <div class="user-card">
          <div class="user-card-in animate__animated animate__zoomInUp" v-for="user in userData" key="user.userId">
            <div class="user-card-one">
              <!--头像-->
              <div class="avatar">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </div>

              <div
                  style="display: block; width: 150px; cursor: pointer">
<!--                  @click="personal(item.id)"-->

                <div class="user-card-title">
                  <span class="user-card-name">{{ user.userName}}</span>
                </div>
                <div class="user-card-v" >
<!--                  <img src="@/assets/img/V.png" class="user-card-v-img" />-->
                  <el-tag class="user-card-v-font" type="mini" style="background-color: dodgerblue">活跃用户</el-tag>
                </div>
                <div class="user-card-sign">
                  <span class="user-card-signFont">{{ user.sign }}</span>
                </div>
              </div>
              <div class="user-card-button">
                <el-button
                  type="primary"
                  size="medium"
                  round
                  >关注
                </el-button>
<!--                    v-if="$store.state.account !== item.account"
                    @click="follow(item.id)"-->
<!--                    v-text="isFollowd.indexOf(item.id) > -1 ? '已关注' : '关注'"-->
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
.allUser {
  position: relative;
  margin-top: 20px;
  width: 80%;
  min-height: calc(100vh - 70px);
  display: inline-block;
  background-color: white;
  padding: 20px;
}
.head {
  width: 100%;
  height: 35px;
  border-bottom: 3px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
}
.avatar{
  margin-top: 10px;
  margin-left: 20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #f0f0f0;
}
h3 {
  margin-left: 20px;
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
}
.headSearch {
  margin-top: -10px;
  margin-right: 170px;
}
.user-card {
  display: flex;
  width: 100%;
  /* height: calc(100vh - 105px); */
  flex-wrap: wrap;
}
.user-card :hover {
  border-width: 1px;
  border-color: deepskyblue;
}
.user-card-in {
  margin: 30px 20px auto 20px;
  height: 110px;
  width: 45%;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  -webkit-transition: 0.2s border-color;
  -o-transition: 0.2s border-color;
  transition: 0.2s border-color;
  /* display: flex; */
}
.user-card-one {
  display: flex;
}
.user-card-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
  margin: 20px;
  width: 80px;
  height: 80px;
  cursor: pointer;
}
.user-card-title {
  margin-left: 5px;
  margin-top: 25px;
  font-size: 10px;
  line-height: 14px;
  cursor: pointer;
}
.user-card-title :hover {
  color: deepskyblue;
}
.user-card-name {
  color: #666;
  max-width: 180px;
  font-size: 18px;
}
.user-card-v {
  margin-top: 10px;
  margin-bottom: -15px;
}
.user-card-v-font {
  font-size: 12px;
  color: white;
}
.user-card-sign {
  margin-left: 5px;
  margin-top: 20px;
  cursor: pointer;
}
.user-card-sign :hover {
  color: deepskyblue;
}
.user-card-signFont {
  line-height: 14px;
  color: #999;
  margin-top: 5px;
}
.user-card-button {
  margin-top: 35px;
  margin-left: 100px;
}
</style>