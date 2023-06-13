<script>
  export default {
    name: 'Main',
    data() {
      return {
        tableData: [],
        pageSize: 10,
        pageNum: 1,
        total: 0,
        userName: "",
        DialogVisible: false,
        form: {
          userName: "",
          password: "",
          status: 1,
          roleId: 1
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ]
        }
        //下拉框搜索
        /*sex:"" ,
        sexList: [
          {
            value: '1',
            label: '男'
          },
          {
            value: '2',
            label: '女'
          }
        ]*/
      }
    },
    methods: {
      //清空查询条件，这个函数要在add中使用
      resetForm() {
        this.$refs.form.resetFields();
      },
      loadGet() {
        this.$axios.get(this.$httpUrl + "/user/listAll").then(res=>res.data).then(res=>{
          console.log(res)
        })
      },
      loadPost() {
        this.$axios.post(this.$httpUrl + "/user/findPage", {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          param: {
            userName: this.userName
            //sex: this.sex
          }
        }).then(res=>res.data).then(res=>{
          console.log(res)
          if (res.code === 200) {
            this.tableData = res.data;
            this.total = res.total;
          }else{
            this.$message.error(res.msg);
          }
        })
      },
      save() {
        //增加表单检查，如果不通过，不提交
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$axios.post(this.$httpUrl + "/user/save", this.form).then(res => res.data).then(res => {
              if (res.code === 200) {
                this.$message.success("新增用户成功！");
                this.DialogVisible = false
                this.loadPost()
              } else {
                this.DialogVisible = false
                this.$message.error(res.msg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageNum = 1;
        this.pageSize = val;
        this.loadPost();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val;
        this.loadPost();
      },
      requestParam() {
        this.userName = ""
        //this.sex = ""
        this.loadPost();
      },
      add() {
        this.DialogVisible = true;
        this.$nextTick(() => {
          this.resetForm();
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
  <div>
    <div style="text-align: left">
      <el-input v-model="userName" placeholder="请输入名字" prefix-icon="el-icon-search" style="width: 250px"
                @keyup.enter.native="loadPost"></el-input>
      <!--下拉框搜索,若需要可以再后端代码中添加相关条件查询-->
<!--      <el-select v-model="sex" filterable placeholder="请选择性别">
        <el-option
            v-for="item in sexList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>-->
      <el-button icon="el-icon-search" circle style="margin-left: 5px" @click="loadPost"></el-button>
      <el-button type="info" round @click="requestParam">重置</el-button>
      <el-button type="success" plain @click="add" style="margin-left: 830px">新增用户</el-button>
    </div>
    <el-table :data="tableData"
              :header-cell-style="{'background-color':'#F5F7FA','color':'#909399'}"
              border
    >
      <el-table-column prop="id" label="ID" width="170">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="280">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="220">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.status === 1 ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.status === 1 ? '正常' : '禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roleId" label="角色" width="280">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.roleId === 1 ? 'success' : 'danger'"
              disable-transitions>{{scope.row.roleId === 1 ? '普通用户' : '管理员'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作" width="360">
        <template slot-scope="scope">
          <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2,5,10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
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
          <el-form-item label="密码" prop="password">
            <el-col :span="15">
              <el-input v-model="form.password"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="角色">
            <el-col :span="5">
              <el-select v-model="form.roleId" placeholder="请选择用户角色">
                <el-option label="管理员" value=0></el-option>
                <el-option label="普通用户" value=1></el-option>
              </el-select>
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

<style scoped>

</style>