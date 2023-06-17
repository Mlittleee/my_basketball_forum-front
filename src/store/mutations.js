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
    localStorage.removeItem('user')
}

//将动态标签数组存入localStorage中
export const setTagsList = (state, list) => {
    state.tagsList.push(...list);
    localStorage.setItem('tagsList', JSON.stringify(state.tagsList));
}

//设置当前的帖子id
export const setPostId = (state, id) => {
    state.postId = id;
}

//删除动态标签数组中的某一项
export const delTagsItem = (state, obj) => {
    state.tagsList.splice(obj.index, 1);
    localStorage.setItem('tagsList', JSON.stringify(state.tagsList));
}

//清空动态标签数组
export const clearTags = (state) => {
    state.tagsList = [];
    state.postId = '';
    localStorage.removeItem('tagsList');
    localStorage.removeItem('postId');
}
