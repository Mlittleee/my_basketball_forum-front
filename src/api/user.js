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