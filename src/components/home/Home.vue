<script>
import Footer from "@/components/home/Footer.vue";
import Header from "@/components/home/Header.vue";
//import Post_list from "@/components/home/Post_list.vue";
import CardBar from "@/components/home/CardBar.vue";

  export default {
    name: 'home',
    components: {Footer, Header,  CardBar},
    data() {
      return {


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
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
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