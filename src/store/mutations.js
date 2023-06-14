/**
 * 处理同步操作
 * 提交的是状态state
 * */

//将token保存到localStorage中
export const constructUser = (state, user) => {
    //用户
    state.user = user;
}

//退出登录，清空token
export const logout = (state) => {
    state.user = {
        id: '',
        userName: '',
        password: '',
        status: '',
        roleId: '',
        token: ''
    }
    //清空缓存
    localStorage.removeItem('token')
}
