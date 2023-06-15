import VueRouter from "vue-router";
import Login from "@/components/user/Login.vue";
import Index from "@/components/Index.vue";
import Home from "@/components/home/Home.vue";

const routes = [
    //重定向，默认登录页
    {
        path: "/",
        redirect: "/Home"
    },
    //登录页
    {
        path: "/login",
        component: Login
    },
    //首页
    {
        path: "/Home",
        component: Home
        /*children: [
            {

            },
            {

            },
        ]*/
    },
    // 后台管理系统首页
    {
        path: "/index",
        component: Index,
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})
export default router;

//还需要到main.js中注册router