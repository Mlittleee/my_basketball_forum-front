import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'  //vuex持久化存储插件
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

//声明一个需要全局维护的状态变量
const state = {
    //user信息
    user: {
        id: '',
        userName: '',
        password: '',
        status: '',
        roleId: '',
        token: ''
    },

    //动态标签数组
     tagsList: []
}

const store = new Vuex.Store({
    state,              //全局状态变量
    getters,            //全局getter函数,获取数值并渲染
    actions,            //全局action函数,数据的异步操作
    mutations,           //全局mutation函数,处理数据的唯一途径,state的合法改变只能通过mutation

    //开启数据缓存 若 需要state 中的变量页面刷新数据缓存 需要调用 actions 中的方法
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
})

export default store    //导出store并在main.js中引用注册