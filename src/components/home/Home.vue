<script>
import Footer from "@/components/home/Footer.vue";
import Header from "@/components/home/Header.vue";
import Post_list from "@/components/home/Post_list.vue";
import CardBar from "@/components/home/CardBar.vue";

  export default {
    name: 'home',
    components: {Footer, Header, Post_list, CardBar},
    data() {
      return {
        itemList: [
          require("../../assets/carousel1.png"),
          require("../../assets/carousel2.png"),
          require("../../assets/carousel3.png"),
          require("../../assets/carousel4.png"),
          require("../../assets/carousel5.png"),
          require("../../assets/carousel6.png"),
        ]
      }
    },
    methods: {

    }
  }

</script>

<template>
  <div>
    <Header></Header>

    <div style="background-color: #eeeeee">
      <el-carousel :interval="4000" type="card" height="280px" >
        <el-carousel-item v-for="item in itemList" :key="item">
          <el-image :src="item" alt="" fit="fill"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="columns">
      <div class="column is-three-quarters">
        <Post_list></Post_list>
      </div>

      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>

    <div>
      <Footer/>
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