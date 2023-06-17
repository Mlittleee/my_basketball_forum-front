import {post,get} from '@/request/request'
// 帖子列表
// export function getList(pageNo, size,tab) { //页号，每页条数，主题（最新主题，最热主题）
//     return request(({
//         url: '/post/list',
//         method: 'get',
//         params: { pageNo: pageNo, size: size ,tab: tab}
//     }))
// }
export const getList=(param)=>post('/post/list',param)//传参传的是当前的页号和每一页的帖子大小

// 发布帖子
// export function up(topic) {
//     return request({
//         url: '/post/create',
//         method: 'post',
//         data: topic
//     })
// }
// 发布帖子
export const addPost=(param)=>post('/post/addPost',param)

//查看文章详情功能
export const getPost=(param)=>get('/post/content',param)