<template>
  <div>
    <el-card >
      <el-descriptions class="margin-top" title="简介" :column="1" border style="margin-top: -60px;height: 700px" direction="vertical" size="medium">
        <template slot="extra">
          <el-button type="primary" size="small">编辑资料</el-button>
        </template>

<!--        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            头像
          </template>
          <img class="img" src="../../assets/imags/userWilkins.png" alt="" />
        </el-descriptions-item>-->

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            用户名
          </template>
          {{ userName }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-odometer"></i>
            用户角色
          </template>
          {{ role }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-male"></i>
            <i class="el-icon-female"></i>
            性别
          </template>
          <el-tag size="small">{{ gender }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-message"></i>
            邮箱Email
          </template>
          {{ email }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            状态
          </template>
          {{ status }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-magic-stick"></i>
            个性签名
          </template>
          {{ sign }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import { findUserById } from "@/api/user.js";
import store from "@/store/index";

export default {
  name: "Info",
  data() {
    return {
      email: "",
      role: "",
      userName: "",
      gender: "",
      sign: "",
      status: "",
    };
  },
  methods: {
    loadUser() {
      console.log(store.state.user.userId)
      findUserById({id: store.state.user.userId})
          .then((res) => {
            this.email = res.data.email;
            this.userName = res.data.userName;
            this.gender = res.data.gender === 1 ? "男" : "女";
            this.sign = res.data.sign;
            this.status = res.data.status === 1 ? "正常" : "禁止";
            this.role = res.data.role === 0 ? "管理员" : "普通用户";
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>

<style scoped>
.img {
  width: 80px;
  height: 80px;
}
</style>