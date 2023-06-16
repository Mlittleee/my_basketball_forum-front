<script>
  export default {
    name: 'Header',
    methods: {
      toUser() {
        console.log(111);
        //this.$router.push('/user');
      },
      logOut() {
        this.$router.push('/Home');
      },
      collapse() {
        this.$emit('doCollapse')
      }
    }
  }

</script>

<template>
  <div style="display: flex;line-height: 60px;">
    <div>
      <i class="el-icon-guide" style="font-size: 26px" @click="collapse"></i>
    </div>
    <div style="flex:1;text-align: center;font-size: 32px;">
      <span>扑虎篮球论坛管理员后台</span>
    </div>
    <el-dropdown>
      <span style="font-size: 18px">王小虎</span><i class="fa fa-user" style="margin-left: 10px;font-size: 23px;color: #2c3e50" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="logOut">返回主页</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<style scoped>

</style>