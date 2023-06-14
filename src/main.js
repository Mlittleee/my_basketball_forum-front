import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'; //element-ui
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'  //font-awesome
import './assets/global.css';
import axios from "axios";  //axios
import VueRouter from "vue-router"; //vue-router
import routes from "./router"; //路由配置文件
import store from "./store";

Vue.prototype.$axios = axios;
Vue.prototype.$httpUrl = 'http://localhost:8088'
Vue.use(ElementUI, { size: 'large', zIndex: 3000 });  //Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false

new Vue({
    router: routes,
    render: h => h(App),
    store
}).$mount('#app')
