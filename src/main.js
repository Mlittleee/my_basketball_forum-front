import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'; //element-ui
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'  //front-awesome
import './assets/global.css';
import axios from "axios";  //axios
import VueRouter from "vue-router"; //vue-router
import routes from "./router"; //路由配置文件
import store from "./store/index";
import mavonEditor from 'mavon-editor' //markdown编辑器
import 'mavon-editor/dist/css/index.css'
import VueParticles from "vue-particles";   //粒子特效
import bulma from "bulma";  //bulma
import buefy from "buefy";  //buefy
import 'buefy/dist/buefy.css'
import relativeTime from 'dayjs/plugin/relativeTime';//相对时间
//国际化,显示帖子时间的依赖
import 'dayjs/locale/zh-cn'
const dayjs= require('dayjs')
// 相对时间插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance
import 'highlight.js/styles/github.css' //css高亮
import { VueShowdown }  from 'vue-showdown';   //markdown渲染
Vue.component('VueShowdown', VueShowdown);
import 'github-markdown-css/github-markdown.css'

axios.defaults.withCredentials=true
Vue.prototype.$axios = axios;
Vue.prototype.$httpUrl = 'http://localhost:8088'
// Vue.prototype.$httpUrl = '/api';
Vue.prototype.dayjs = dayjs;//可以全局使用dayjs

Vue.use(ElementUI, { size: 'large', zIndex: 3000 });  //Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = true
Vue.use(VueParticles);
Vue.use(buefy);
Vue.use(mavonEditor);

new Vue({
    router: routes,
    render: h => h(App),
    store
}).$mount('#app')
