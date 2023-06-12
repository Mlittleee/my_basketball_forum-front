<script>
  export default {
    name: 'Main',
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      loadGet() {
        this.$axios.get(this.$httpUrl + "/user/listAll").then(res=>res.data).then(res=>{
          console.log(res)
        })
      },
      loadPost() {
        this.$axios.post(this.$httpUrl + "/user/findPage", {}).then(res=>res.data).then(res=>{
          console.log(res)
          this.tableData = res.data
        })
      }
    },
    //create
    beforeMount() {
      this.loadGet();
      this.loadPost();
    }
  }
</script>

<template>
  <el-table :data="tableData">
    <el-table-column prop="id" label="ID" width="140">
    </el-table-column>
    <el-table-column prop="userName" label="姓名" width="250">
    </el-table-column>
    <el-table-column prop="status" label="状态" width="220">
      <template slot-scope="scope">
        <el-tag
            :type="scope.row.status === 1 ? 'primary' : 'danger'"
            disable-transitions>{{scope.row.status === 1 ? '正常' : '禁用'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="roleId" label="角色" width="220">
      <template slot-scope="scope">
        <el-tag
            :type="scope.row.roleId === 1 ? 'success' : 'danger'"
            disable-transitions>{{scope.row.roleId === 1 ? '普通用户' : '管理员'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="operate" label="操作" width="320">
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>