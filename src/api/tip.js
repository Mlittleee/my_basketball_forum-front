import {post,get} from '@/request/request'

// export function getTodayTip() {
//     return request({
//         url: '/tip',
//         method: 'get'
//     })
// }

export const getTodayTip=(params) =>get('/tip/tip',params)
//还需要一个每日一句的表
//id content author type
//随机从数据库的表中挑选出一句出来  select * from tiptable order by rand() limit 1

//列出所有名言
export const listAllTip=(params)=>get('/tip/all',params)

//分页
export const listTipByPage = (params) => post('/tip/findPage', params)

//更新名言
export const updateTip=(params)=>get('/tip/update',params)

//删除名言
export const delTip=(params)=>get('/tip/delete',params)

//增加名言
export const addTip=(params)=>get('/tip/add',params)