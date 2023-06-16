import VueRouter from "vue-router";
import Login from "@/components/user/Login.vue";
import Index from "@/components/Index.vue";
import Home from "@/components/home/Home.vue";
import myEditor from "@/components/home/myEditor.vue";

const routes = [
    //重定向，默认登录页
    {
        path: "/",
        redirect: "/Login"
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
    },
    //富文本编辑器
    {
        path: "/editor",
        component: myEditor
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})
export default router;

//还需要到main.js中注册router