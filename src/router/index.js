import VueRouter from "vue-router";
import Login from "@/components/user/Login.vue";
import Admin from "@/components/admin/Admin.vue";
import Home from "@/components/home/Home.vue";
import myEditor from "@/components/home/myEditor.vue";
import MainUser from "@/components/admin/MainUser.vue";
import MainPost from "@/components/admin/MainPost.vue";
import MainComment from "@/components/admin/MainComment.vue";
import MainCategory from "@/components/admin/MainCategory.vue";
import NBA from "@/components/admin/Category/NBA.vue";
import teach from "@/components/admin/Category/teach.vue";
import CUBA from "@/components/admin/Category/CUBA.vue";
import CBA from "@/components/admin/Category/CBA.vue";
import wilkins from "@/components/admin/Category/wilkins.vue";
import UserCenter from "@/components/user/UserCenter.vue";


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
        path: "/Admin",
        component: Admin,
        children: [
            {
                path: "/Admin/adminUser",
                component: MainUser
             },
            {
                path: "/Admin/adminPost",
                component: MainPost
            },
            {
                path: "/Admin/adminComment",
                component: MainComment
            },
            {
                path: "/Admin/adminCategory",
                component: MainCategory,
                    children: [
                        {
                            path: "/Admin/adminCategory/NBA",
                            component: NBA
                        },
                        {
                            path: "/Admin/adminCategory/CBA",
                            component: CBA
                        },
                        {
                            path: "/Admin/adminCategory/CUBA",
                            component: CUBA
                        },
                        {
                            path: "/Admin/adminCategory/teach",
                            component: teach
                        },
                        {
                            path: "/Admin/adminCategory/wilkins",
                            component: wilkins
                        }
                    ]
            }
        ]
    },
    //富文本编辑器
    {
        path: "/editor",
        component: myEditor
    },
    //用户中心
    {
        path: "/user",
        component: UserCenter
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})
export default router;

//还需要到main.js中注册router