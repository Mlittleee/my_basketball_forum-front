<script>
//导入api目录下user.js文件中的所有内容
import {addUser ,listUser, listUserByPage, updateUser} from "@/api/user";

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
        listUser().then(res => res.data).then(res => {
          console.log(res)
        })
      },
      loadPost() {
        listUserByPage({
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          param: {
            userName: this.userName
            //sex: this.sex
          }
        }).then(res=>{
          console.log(res)
          //if (res.data.=== 200) {
            this.tableData = res.data;
            this.total = res.total;
          //}else{
            //this.$message.error(res.data.msg);
          //}
        })
      },
      doSave() {
        //调用api接口
        addUser(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success("新增用户成功！");
            this.DialogVisible = false
            this.loadPost()
          } else {
            this.DialogVisible = false
            this.$message.error(res.msg);
          }
        })
      },
      doEdit() {
        updateUser(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success("修改用户成功！");
            this.DialogVisible = false
            this.loadPost()
          } else {
            this.DialogVisible = false
            this.$message.error(res.msg);
          }
        })
      },
      save() {
        //增加表单检查，如果不通过，不提交
        this.$refs.form.validate((valid) => {
          if (valid) {
            //用id是否已经存在来判断是新增还是修改
            if (this.form.id) {
              this.doEdit();
            } else {
              this.doSave();
            }

          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onEdit(row) {
        //编辑功能
        this.DialogVisible = true;
        this.$nextTick(() => {
          this.form = row;
        })

      },
      onDelete(id) {
        //将id转换为Int类型
        //删除功能
        console.log(id)
        this.$axios.get(this.$httpUrl + "/user/delete?id=" + id).then(res => {
          if (res.data.code === 200) {
            this.$message.success("删除用户成功！");
            this.loadPost()
          } else {
            this.$message.error(res.data.msg);
          }
        })
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
        <!--使用插槽来传递这一整行的数据-->
        <template slot-scope="scope">
          <el-button
              size="medium"
              @click="onEdit(scope.row)">编辑</el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="onDelete(scope.row.id)"
          >
            <el-button size="medium" type="danger" slot="reference" style="margin-left: 25px">删除</el-button>
          </el-popconfirm>
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