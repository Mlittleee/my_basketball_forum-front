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
export const addPost=(param)=>post('/post/addPost',param)

//查看文章详情功能
export const getPost=(param)=>get('/post/content',param)

//查询最后一条的帖子id
export const getLastPostId=(param)=>get('/post/selectLastPostId',param)

//返回一条帖子卡片的信息
export const getPostCard=(param)=>get('/post/getOnePost',param)

//返回帖子列表然后进行分页展示
export const getPostList=(param)=>post('/post/findPostCardPage',param)

//查看帖子详情
export const getPostDetail=(param)=>get('/post/getPostDetail',param)