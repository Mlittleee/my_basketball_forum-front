import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
import Index from "@/components/Index.vue";

const routes = [
    //重定向，默认登录页
    {
        path: "/",
        redirect: "/login"
    },
    //登录页
    {
        path: "/login",
        component: Index
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})
export default router;

//还需要到main.js中注册router