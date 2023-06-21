<template>
    <div>
        <el-table :data="tableData"
                  :header-cell-style="{'background-color':'#F5F7FA','color':'#909399'}"
                  border
        >
            <el-table-column prop="tipId" label="序号" width="170" style="text-align: center">
            </el-table-column>

            <el-table-column prop="content" label="内容" width="500" style="text-align: center">
            </el-table-column>

            <el-table-column prop="author" label="作者" width="280" style="text-align: center">
            </el-table-column>


            <el-table-column prop="operate" label="操作" width="300" style="text-align: center">
                <!--使用插槽来传递这一整行的数据-->
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        @click="onEdit(scope.row)">编辑</el-button>

                    <el-button
                        size="medium"
                        type="success"
                        plain
                        @click="add">新增</el-button>

                    <el-popconfirm
                        confirm-button-text='确定'
                        cancel-button-text='不用了'
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定删除吗？"
                        @confirm="onDelete(scope.row.tipId)"
                    >
                        <el-button size="medium" type="danger" slot="reference" style="margin-left: 25px">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!--编辑用户信息弹出框-->
        <el-dialog
            title="提示"
            :visible.sync="DialogVisible"
            width="30%"
            center>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">

                <el-form-item label="内容" prop="content" style="height: 50px">
                    <el-col :span="11" >
                        <el-input v-model="form.content"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="作者" prop="author">
                    <el-col :span="15">
                        <el-input v-model="form.author"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>


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
import {addTip, delTip, listTipByPage, updateTip} from "@/api/tip";

export default {
    name: "MainTip",
    data(){
        return{
            tableData:[],
            form:{
                tipId:null,
                content:'',
                author:''
            },
            DialogVisible:false,
            //分页
            pageSize: 10,
            pageNum: 1,
            total: 0,
            rules: {
                content: [
                    {required: true, message: '请输入名言内容', trigger: 'blur'},
                    {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
                ],
                author: [
                    {required: true, message: '请输入作者', trigger: 'blur'},
                    {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        //一进来，就加载所有的名言
        /*loadGet() {
            listAllTip().then(res => res.data).then(res => {
            })
        },*/
        //点击分页之后的结果
        loadPost() {
            listTipByPage({
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                param: {
                    author:''
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
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //用id是否已经存在来判断是新增还是修改
                    if (this.form.tipId) {
                        //编辑
                        this.doEdit();
                    } else {//新增
                        this.doSave();
                    }

                }else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //清空查询条件，这个函数要在add中使用
        resetForm() {
            this.$refs.form.resetFields();
        },
        //新增名言的，将表单清空，和新增键绑定
        add() {
            this.DialogVisible = true;
            this.$nextTick(() => {
                this.resetForm();
            })
        },
        //修改名言的，和编辑键绑定，直接获取到当前这一行的信息
        onEdit(row) {
            this.DialogVisible = true;
            this.$nextTick(() => {
                this.form = row;
            })
        },
        //增加tip
        doSave() {
            //调用api接口
            addTip(this.form).then(res => {
                if (res.code === 200) {
                    this.$message.success("新增每日一句成功！");
                    this.DialogVisible = false
                    this.loadPost()
                } else {
                    this.DialogVisible = false
                    this.$message.error(res.msg);
                }
            })
        },
        //修改Tip
        doEdit() {
            updateTip(this.form).then(res => {
                if (res.code === 200) {
                    this.$message.success("修改每日一句成功！");
                    this.DialogVisible = false
                    this.loadPost()
                } else {
                    this.DialogVisible = false
                    this.$message.error(res.msg);
                }
            })
        },
        //删除帖子
        onDelete(tipId) {
            delTip({tipId: tipId}).then(res => {
                if (res.code === 200) {
                    this.$message.success("删除名言成功！");
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
        //this.loadGet();
        this.loadPost();
    }

}
</script>

<style scoped>

</style>