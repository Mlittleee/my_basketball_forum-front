/**actions注册事件处理函数
 * 提交的是mutations
 * 事件处理函数内部可以执行异步操作
 * 通过store.dispatch()方法触发
 * 事件处理函数接受一个与store实例具有相同方法和属性的context对象
 * 因此可以调用context.commit()提交一个mutation
 * 或者通过context.state和context.getters来获取state和getters
*/
//ES6精简写法(参数解构)
//export const modifyAName = ({commit}, name) => commit('modifyAName', name)

//用户登录
export const constructUser = ({commit}, user) => commit('constructUser', user)