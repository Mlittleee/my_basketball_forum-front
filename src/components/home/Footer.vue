<template>
    <footer class="footer has-text-grey-light has-background-grey-darker">
      <div class="container">
        <div class="">
          <span id="txt">简洁、实用、美观</span>

          <span style="float: right">
            <router-link :to="{path:'/Index'}">
              管理员登录
            </router-link>
            |
            <a href="/?lang=zh_CN">中文</a> |
            <a href="/?lang=en_US">English</a>
          </span>
        </div>

        <div>
          <span>{{ title }} ALL RIGHTS RESERVED</span>
          <div style="float: right">

              <div>
                <span style="font-size: 18px">Design</span>
                <span >{{ author }}</span>
              </div>

          </div>
        </div>
      </div>
      <BackTop/>
    </footer>
</template>

<script>
import BackTop from './Backtop.vue';

export default {
  name: "Footer",
  components: {BackTop},
  data() {
    return {
      title: "© " + new Date().getFullYear() + 'mhc',
      author: 'mhc',
    };
  },
};
</script>

<style scoped>

footer {
  margin-top: 120px;
  height: 150px;
}
footer a{
  color: #bfbfbf;
}
#txt{
  text-align: center;
}

</style>
