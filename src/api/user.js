/**
 * user-api接口统一管理
 * */
import {get, post} from '@/request/request'

// 用户登录
export const login = (params) => post('/user/login', params)

// 新增用户
export const addUser = (params) => post('/user/save', params)