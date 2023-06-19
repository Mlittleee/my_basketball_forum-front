/**
 * user-api接口统一管理
 * */
import {get, post} from '@/request/request'

// 用户登录
export const login = (params) => post('/user/login', params)

// 新增用户
export const addUser = (params) => post('/user/save', params)

// 列出所有用户
export const listUser = (params) => get('/user/listAll', params)

// 删除用户
export const deleteUser = (params) => post('/user/delete', params)

// 用户分页查询
export const listUserByPage = (params) => post('/user/findPage', params)

// 编辑更新用户
export const updateUser = (params) => post('/user/update', params)

// 根据用户名模糊查询用户
export const findUserByName = (params) => get('/user/query', params)

// 根据用户id查询用户
export const findUserById = (params) => get('/user/getUserById', params)