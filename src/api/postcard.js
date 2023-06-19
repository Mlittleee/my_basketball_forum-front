import {post,get} from '@/request/request'

//更新帖子的浏览量
export const updatePostView=(param)=>get('/postcard/addViewCount',param)

//更新帖子的点赞量
export const updatePostLike=(param)=>get('/postcard/addLikeCount',param)