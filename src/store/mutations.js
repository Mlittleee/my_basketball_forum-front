/**
 * 处理同步操作
 * 提交的是状态state
 * */

//将token保存到localStorage中
export const constructUser = (state, user) => {
    //用户
    state.user = user;
}
