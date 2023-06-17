<template>
    <footer class="footer has-text-grey-light has-background-grey-darker">
      <div class="container">
        <div class="">
          <span id="txt">简洁、实用、美观</span>

          <span style="float: right">
            <router-link v-if="isAdmin===0" :to="{path:'/Admin'}">
              管理员登录
            </router-link>
            <router-link v-else :to="{path:'/Home'}">
              你还不是管理员哦
            </router-link>
            |
            <a href="/?lang=zh_CN">中文</a> |
            <a href="/?lang=en_US">English</a>
          </span>
        </div>

        <div>
          <span>{{ title }} ALL RIGHTS RESERVED</span>
          <div style="float: right">
            <template>
              <b-taglist attached>
                <b-tag type="is-dark" size="is-normal">Design</b-tag>
                <b-tag type="is-info" size="is-normal">{{ author }}</b-tag>
              </b-taglist>
            </template>
          </div>
        </div>
      </div>
      <BackTop/>
    </footer>
</template>

<script>
import BackTop from './Backtop.vue';
import store from "../../store/index";

export default {
  name: "Footer",
  components: {BackTop},
  data() {
    return {
      title: "© " + new Date().getFullYear() + 'mhc',
      author: 'mhc',
      isAdmin: store.state.user.roleId
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
