import {post,get} from '@/request/request'

//更新帖子的浏览量
export const updatePostView=(param)=>get('/postcard/addViewCount',param)

//更新帖子的点赞量
export const updatePostLike=(param)=>get('/postcard/addLikeCount',param)

//删除帖子
export const deletePost=(param)=>get('/postcard/deletePost',param)

//更新（编辑）帖子
export const updatePost=(param)=>post('/postcard/updatePostcard',param)

//根据帖子id获取帖子信息
export const getPostById=(param)=>get('/postcard/getPostcardById',param)