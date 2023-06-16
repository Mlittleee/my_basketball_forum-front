<script>
import {mapMutations} from "vuex";

  export default {
    name: 'home',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        activeNames: ['1']
      }
    },
    methods: {
      ...mapMutations(["logout"]),
      toUser() {
        this.$message({message: "进入个人中心", type: "success",});
        this.$router.push("/user");
      },
      logOut() {
        this.logout();
        this.$router.push("/Login");
      },
      enterAdmin() {
        this.$router.push("/Admin");
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleChange(val) {
        console.log(val);
      }
    }
  }

</script>

<template>
  <div style="background-color: black">
    <div style="text-align: end">
      <el-dropdown style="text-align: end">
        <span style="font-size: 18px">用户中心</span><i class="fa fa-user" style="margin-left: 10px;font-size: 23px;color: #2c3e50" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
          <el-dropdown-item @click.native="enterAdmin">进入管理员后台</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="background-color: darkred;color: #eeeeee">
      <el-menu-item index="1" style="margin-left: 80px">首页</el-menu-item>
      <el-menu-item index="2" style="margin-left: 180px">NBA</el-menu-item>
      <el-menu-item index="3" style="margin-left: 180px">CBA</el-menu-item>
      <el-menu-item index="4" style="margin-left: 180px">CUBA</el-menu-item>
      <el-menu-item index="5" style="margin-left: 180px">野球帝</el-menu-item>
      <el-menu-item index="6" style="margin-left: 180px">社区</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <div style="background-color: #eeeeee">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="一致性 Consistency" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

</style>