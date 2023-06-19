<script>
import PostListPage from "@/components/common/PostListPage.vue";
import CardBar from "@/components/home/CardBar.vue";

export default {
  name: "Carousel",
  components: {CardBar, PostListPage},
  data() {
    return {
      itemList: [
        require("../../../assets/imags/carousel1.png"),
        require("../../../assets/imags/carousel2.png"),
        require("../../../assets/imags/carousel3.png"),
        require("../../../assets/imags/carousel4.png"),
        require("../../../assets/imags/carousel5.png"),
        require("../../../assets/imags/carousel6.png"),
      ]
    }
  }


}
</script>

<template>
  <div>
    <div style="background-color: #eeeeee">
      <el-carousel :interval="4000" type="card" height="280px" >
        <el-carousel-item v-for="item in itemList" :key="item">
          <el-image :src="item" alt="" fit="fill"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="columns">
      <div class="column is-three-quarters">
        <PostListPage></PostListPage>
      </div>

      <div class="column">
        <CardBar></CardBar>
      </div>
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