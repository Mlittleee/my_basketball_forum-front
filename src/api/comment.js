//评论功能的实现
import {get, post} from "@/request/request";

//添加评论
export const addComment=(param)=>get('/comment/addComment',param)

//根据postId获取所有评论
export const getCommentList=(param)=>get('/comment/listAllComments',param)

//根据commentId删除评论
export const deleteComment=(param)=>get('/comment/delComment',param)

//修改评论内容
export const updateComment=(param)=>get('/comment/updateComment',param)

//分页展示评论
export const getCommentByPage=(param)=>post('/comment/listCommentsByPage',param)