<template>
  <div class="body">
    <div class="data" style="margin-left: 78%; margin-top: 10%">
      <div class="text">
        <h1>曼巴社区</h1>
      </div>
      <div class="form-data">
        <el-form ref="loginform" :model="form" :rules="rules">
          <el-form-item prop="userName" style="font-size: large;margin-top: 60px">
            <el-input v-model="form.userName" clearable placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password" style="margin-top: 50px">
            <el-input v-model="form.password" clearable placeholder="请输入密码" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
        <el-button type="primary"
                   class="button"
                   style="margin-top: 40px; font-size: large"
                   @click="submit('loginform')">加入社区</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { mapState, mapActions } from "vuex";


export default {
  name: "login",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      checked: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 20, message: "1-20个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "3-20个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["constructUser"]),
    async submit(form) {
      if(!form) return;
      this.$refs.loginform.validate((valid) => {
        if (valid) {
          //console.log(JSON.stringify(this.form))
            login(this.form).then((res) => {
            console.log(res)
            //注意此处不再需要取res.data.data
            if (res.code === 200) {
              //登录成功则将user信息存入vuex(包括token)
              this.constructUser(res.data);
              //console.log(this.$store.state.user.token)
              this.$message({message: "登录成功", type: "success",});
              //进入首页
              this.$router.push("/Home/Carousel");

            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: url("../../assets/imags/login.jpg");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.text {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.data {
  width: 400px;
  height: 300px;
  transform: translate(-50%);
  margin-left: 50%;
}

.butt {
  margin-top: 10px;
  text-align: center;
}

/*ui*/
/* /deep/ .el-form-item__label {
  front-weight: bolder;
  front-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */
</style>
