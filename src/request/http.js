/**
 * http.js文件用来对axios进行拦截，添加token
 * */
import axios from "axios";
import store from "@/store/index";

axios.defaults.timeout = 10000; //设置请求时间
axios.defaults.baseURL = 'http://localhost:8088'; //设置默认接口地址

//post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//请求拦截器
axios.interceptors.request.use(
    config => {
        //判断是否存在token，如果存在的话，则每个http header都加上token，更新vueX中的token
        //如果不存在，则跳转到登录页面
        if (store.state.user.token!=='') {
            config.headers.Authorization = `${store.state.user.token}`;
            console.log(`${store.state.user.token}`)
        }
        return config;
    },
    error => {
        return Promise.error(error);
})

//响应拦截器
axios.interceptors.response.use(
    response => {
        //如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        //否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }
    //如果错误，可以根据返回的错误码进行一些处理
    // error => {
    //     if (error.response.status) {
    //         switch (error.response.status) {
    //             //401:未登录
    //             //未登录则跳转登录页面，并携带当前页面的路径
    //             //在登录成功后返回当前页面，这一步需要在登录页操作
    //             case 401:
    //                 router.replace({
    //                     path: '/login',
    //                     query: {
    //                         redirect: router.currentRoute.fullPath
    //                     }
    //                 });
    //                 break;
    //             //403 token过期
    //             //登录过期对用户进行提示
    //             //清除本地token和清空vuex中token对象
)

export default axios