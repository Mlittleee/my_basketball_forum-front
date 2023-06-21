<template>
  <div>
    <el-card >
      <el-descriptions class="margin-top" title="简介" :column="1" border style="margin-top: -60px;height: 700px" direction="vertical" size="medium">
        <template slot="extra">
          <el-button type="primary" size="small" @click="onEdit()">编辑资料</el-button>
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

    <!--编辑用户信息弹出框-->
    <el-dialog
        title="提示"
        :visible.sync="DialogVisible"
        width="30%"
        center>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-col :span="11">
            <el-input v-model="form.userName"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="个性签名" prop="sign">
          <el-col :span="15">
            <el-input v-model="form.sign"></el-input>
          </el-col>
        </el-form-item>-->

        <el-form-item label="性别" prop="gender">
          <el-col :span="15">
            <el-input v-model="form.gender"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-col :span="15">
            <el-input v-model="form.email"></el-input>
          </el-col>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="DialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {findUserById, updateUser} from "@/api/user.js";
import store from "@/store/index";

export default {
  name: "UserDetail",
  data() {
    return {
      email: "",
      role: "",
      userName: "",
      gender: "",
      sign: "",
      status: "",
      DialogVisible: false,

      form: {
        userName: "",
        gender: 1,
        email: "",
        sign: "",
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
    }
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
    save() {
      //增加表单检查，如果不通过，不提交
      this.$refs.form.validate((valid) => {
        if (valid) {
          //用id是否已经存在来判断是新增还是修改
          this.doEdit();
        }else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onEdit(){
      this.DialogVisible=false
    },
    doEdit() {
      updateUser(this.form).then(res => {
        if (res.code === 200) {
          this.$message.success("修改用户成功！");
          this.DialogVisible = false
          this.loadUser()
        } else {
          this.DialogVisible = false
          this.$message.error(res.msg);
        }
      })
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