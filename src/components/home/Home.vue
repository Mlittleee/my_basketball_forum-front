<script>
import Footer from "@/components/home/Footer.vue";
import Header from "@/components/home/Header.vue";
//import Post_list from "@/components/home/Post_list.vue";
import PostListPage from "@/components/common/PostListPage.vue";
import CardBar from "@/components/home/CardBar.vue";

  export default {
    name: 'home',
    components: {PostListPage, Footer, Header, CardBar},
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

    <!-- 轮播图和其他板块之间标签和话题的切换 -->
    <router-view></router-view>

    <div>
      <Footer/>
    </div>
  </div>
</template>

<style scoped>


</style>