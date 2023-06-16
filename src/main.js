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
//import mavonEditor from 'mavon-editor' //markdown编辑器
//import 'mavon-editor/dist/css/index.css'
import VueParticles from "vue-particles";   //粒子特效

axios.defaults.withCredentials=true
Vue.prototype.$axios = axios;
Vue.prototype.$httpUrl = 'http://localhost:8088'
Vue.use(ElementUI, { size: 'large', zIndex: 3000 });  //Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = true
Vue.use(VueParticles);

new Vue({
    router: routes,
    render: h => h(App),
    store
}).$mount('#app')
