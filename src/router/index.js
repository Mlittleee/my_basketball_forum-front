import VueRouter from "vue-router";
import Login from "@/components/Login";
import Index from "@/components/Index.vue";

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
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