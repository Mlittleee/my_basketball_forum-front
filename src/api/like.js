import {get, post} from "@/request/request";

//添加点赞
export const addLike=(param)=>get('/like/addLike',param)

//获取所有用户点赞过的帖子
export const getLikePost=(param)=>get('/like/listLiked',param)