<template>
  <div>
    <el-table :data="tableData"
              :header-cell-style="{'background-color':'#F5F7FA','color':'#909399'}"
              border
    >
      <el-table-column prop="commentId" label="序号" width="170" style="text-align: center">
      </el-table-column>

      <el-table-column prop="content" label="内容" width="500" style="text-align: center">
      </el-table-column>

      <el-table-column prop="userName" label="作者" width="240" style="text-align: center">
      </el-table-column>

      <el-table-column prop="createTime" label="评论时间" width="180" style="text-align: center">
      </el-table-column>


      <el-table-column prop="operate" label="操作" width="300" style="text-align: center">
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
              @confirm="onDelete(scope.row.commentId)"
          >
            <el-button size="medium" type="danger" slot="reference" style="margin-left: 25px">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑评论内容弹出框-->
    <el-dialog
        title="提示"
        :visible.sync="DialogVisible"
        width="30%"
        center>

      <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5}"
          placeholder="请输入内容"

          v-model="form.content">
      </el-input>


      <span slot="footer" class="dialog-footer">
                <el-button @click="DialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
    </el-dialog>

    <!--分页功能 -->
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


<script>
import { deleteComment,updateComment, getCommentByPage } from "@/api/comment";

export default {
  name: "MainComment",
  data(){
    return{
      tableData:[],
      form:{
        commentId:null,
        content:'',
        userName:''
      },
      DialogVisible:false,
      //分页
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  methods:{
    loadPost() {
      getCommentByPage({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        param: {
          userName:''
        }
      }).then(res=>{
        //if (res.data.=== 200) {
        this.tableData = res.data;
        this.total = res.total;
      })
    },
    //点击表单的确定，跳转到这个事件
    save() {
      //增加表单检查，如果不通过，不提交
        if (this.form.content !== '') {
          this.doEdit(this.form.commentId, this.form.content);
        }else {
          console.log('error submit!!');
          return false;
        }
    },
    //修改
    onEdit(row) {
      this.DialogVisible = true;
      this.$nextTick(() => {
        this.form.commentId = row.commentId;
        this.form.content = row.content;
      })
    },
    //修改
    doEdit(commentId, content) {
      updateComment({commentId: commentId, content: content}).then(res => {
        if (res.code === 200) {
          this.$message.success("修改成功！");
          this.DialogVisible = false
          this.loadPost()
        } else {
          this.DialogVisible = false
          this.$message.error(res.msg);
        }
      })
    },
    //删除帖子
    onDelete(commentId){
      deleteComment({commentId: commentId}).then(res => {
        if (res.code === 200) {
          this.$message.success("删除评论成功！");
          this.loadPost()
        } else {
          this.$message.error(res.msg);
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
  },
  beforeMount() {
    this.loadPost();
  }

}
</script>

<style scoped>

</style>