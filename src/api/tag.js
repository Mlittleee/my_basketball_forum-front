import {get, post} from '@/request/request'

//批量增加标签
export const addTags = (param) => post('/tag/addTags', param)

//根据帖子id查询标签
export const getTagsByPostId = (postId) => get('/tag/getTagsByPostId', {postId: postId})