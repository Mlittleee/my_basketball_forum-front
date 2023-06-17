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