<script>
import  {getTodayTip} from "@/api/tip";

export default {
  name: "CardBar",
  data() {
    return {
      tip:{}
    }
  },
  created(){
    this.fetchTodayTip()
  },
  //定义异步请求
  methods: {
    fetchTodayTip(){
      getTodayTip().then(res=>{
        this.tip= res.data
      })
    }
  }


}
</script>

<template>
  <section id="building">
    <el-card class="box-card" shadow="never" id="txt1">
      <div slot="header">
        <span>💐 发帖</span>
      </div>

      <div class="has-text-centered">
        <b-button type="is-danger" tag="router-link" :to="{path:'/editor'}" outlined>✍ 发表想法</b-button>
      </div>
    </el-card>


    <el-card class="box-card" shadow="never" id="txt">
      <div slot="header">
        <span>🥳 篮球名言</span>
        <el-button style="margin-left:160px; border:none; font-size: 20px" icon="el-icon-refresh" @click="fetchTodayTip" ></el-button>
      </div>
      <div>
        <div class="has-text-left block">
          {{tip.content}}
        </div>
        <div class="has-text-right mt-5 block">
          ——{{tip.author}}
        </div>
      </div>
    </el-card>
  </section>
</template>

<style scoped>
#txt1{
  text-align:left;
}

#txt{
  text-align:left;
}

#building{
  opacity: 0.85;
}

</style>