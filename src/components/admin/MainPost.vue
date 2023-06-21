<script>
import {getPostList} from "@/api/post";
import {deletePost} from "@/api/postcard";

export default {
  name: 'adminPost',
  data() {
    return {
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      title: "",
      form: {
        id: null,
        title: "",
        description: "",
        categoryName: "",
        userName: "",
      },
    }
  },
  methods: {
    //清空查询条件，这个函数要在add中使用
    resetForm() {
      this.$refs.form.resetFields();
    },
    loadPost() {
      getPostList({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        param: {
          title: this.title
          //sex: this.sex
        }
      }).then(res=>{
        //if (res.data.=== 200) {
        this.tableData = res.data;
        this.total = res.total;
        //}else{
        //this.$message.error(res.data.msg);
        //}
      })
    },
    onDelete(postId) {
      //删除功能
      deletePost({id: postId}).then(res => {
        if (res.code === 200) {
          this.$message.success("成功删除帖子");
          this.loadPost();
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    //编辑功能带id为参数进行路由跳转
    onEdit(postId) {
      this.$router.push({
        path: '/updatePost',
        query: {id: postId}
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
      this.title = ""
      this.loadPost();
    },
  },
  //create
  beforeMount() {
    this.loadPost();
  }
}
</script>

<template>
  <div>
    <div style="text-align: left">
      <el-input v-model="title" placeholder="请输入要查询的帖子标题" prefix-icon="el-icon-search" style="width: 250px"
                @keyup.enter.native="loadPost"></el-input>

      <el-button icon="el-icon-search" circle style="margin-left: 5px" @click="loadPost"></el-button>
      <el-button type="info" round @click="requestParam">重置</el-button>
    </div>

    <el-table :data="tableData"
              :header-cell-style="{'background-color':'#F5F7FA','color':'#909399'}"
              border
    >
      <el-table-column prop="id" label="ID" width="150">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="220">
      </el-table-column>
      <el-table-column prop="description" label="描述" width="280">
      </el-table-column>
      <el-table-column prop="categoryName" label="所属板块" width="220">
      </el-table-column>
      <el-table-column prop="userName" label="作者" width="200">
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="280">
        <!--使用插槽来传递这一整行的数据-->
        <template slot-scope="scope">
          <el-button
              size="medium"
              @click="onEdit(scope.row.id)">编辑</el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="onDelete(scope.row.id)">
            <el-button size="medium" type="danger" slot="reference" style="margin-left: 25px">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2,5,10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<style scoped>

</style>