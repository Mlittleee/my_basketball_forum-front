<template>
  <div id="myEditor">
    <div style="margin-left: 500px;">

      <!--头像-->
      <el-row class="demo-avatar demo-basic">
        <el-col :span="12">
          <!--需要查询后端进行替换-->
          <!--这里应该显示用户名(可以考虑使用vuex中存储的用户名)-->
          <div class="demo-basic--circle">
            <div class="block"><el-avatar :size="80" :src="circleUrl"></el-avatar></div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div>
      <!--帖子标题和简介还有所属的板块-->
      <el-form :model="ruleForm" :rules="rules" ref="postForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="所属板块" prop="whichCategory">
          <el-select v-model="ruleForm.whichCategory" placeholder="请选择所属板块" style="margin-left:-1190px;">
            <el-option label="NBA" value="NBA"></el-option>
            <el-option label="CBA" value="CBA"></el-option>
            <el-option label="CUBA" value="CUBA"></el-option>
            <el-option label="野球帝" value="野球帝"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="创建时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>-->
        <el-form-item label="帖子简介" prop="desc">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <!--富文本编辑器-->
        <wangEditor></wangEditor>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import wangEditor from "@/components/home/wang-editor.vue";

export default {
  name: 'myEditor',
  components: {
    wangEditor
  },
  data() {
    return {
      circleUrl: 'https://avatars.githubusercontent.com/u/21263805?v=4',
      ruleForm: {
        title: '',
        whichCategory: '',
        desc: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入帖子标题', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        whichCategory: [
          { required: true, message: '请选择所属板块', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写帖子简介', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs.postForm.resetFields();
    }
  }
}

</script>

<style>
</style>
