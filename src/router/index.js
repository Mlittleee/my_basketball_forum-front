import VueRouter from "vue-router";
import Login from "@/components/user/Login.vue";
import Admin from "@/components/admin/Admin.vue";
import Home from "@/components/home/Home.vue";
import Editor from "@/components/home/Editor.vue";
import MainUser from "@/components/admin/MainUser.vue";
import MainPost from "@/components/admin/MainPost.vue";
import MainTip from "@/components/admin/MainTip.vue";
import MainComment from "@/components/admin/MainComment.vue";
import MainCategory from "@/components/admin/MainCategory.vue";
import NBA from "@/components/admin/Category/NBA.vue";
import teach from "@/components/admin/Category/teach.vue";
import CUBA from "@/components/admin/Category/CUBA.vue";
import CBA from "@/components/admin/Category/CBA.vue";
import wilkins from "@/components/admin/Category/wilkins.vue";
import UserCenter from "@/components/user/UserCenter.vue";
import HomeNBA from "@/components/home/Category/NBA.vue";
import HomeCBA from "@/components/home/Category/CBA.vue";
import HomeCUBA from "@/components/home/Category/CUBA.vue";
import Community from "@/components/home/Community.vue";
import HomeWilkins from "@/components/home/Category/Wilkins.vue";
import Carousel from "@/components/home/Category/Carousel.vue";
import PostView from "@/components/common/PostView.vue";


const routes = [
    //重定向，默认登录页
    {
        path: "/",
        redirect: "/Login"
    },
    //登录页
    {
        path: "/Login",
        component: Login
    },
    //首页
    {
        path: "/Home",
        component: Home,
        children: [
            {
                path: "/Home/NBA",
                component: HomeNBA
            },
            {
                path: "/Home/CBA",
                component: HomeCBA
            },
            {
                path: "/Home/CUBA",
                component: HomeCUBA
            },
            {
                path: "/Home/Wilkins",
                component: HomeWilkins
            },
            {
                path: "/Home/Carousel",
                component: Carousel
            }
        ]
    },
    //社区
    {
        path: "/Community",
        component: Community
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
                path:"/Admin/adminTip",
                component: MainTip
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
        component: Editor
    },
    //用户中心
    {
        path: "/user",
        component: UserCenter
    },
    //测试帖子卡片
    {
        path: "/test",
        component: () => import("../components/common/PostListPage.vue")
    },
    //显示文章详情
    {
        path: "/post/:id",
        component: PostView,
        meta: {
            title: "文章详情",
        },
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})
export default router;

//还需要到main.js中注册router