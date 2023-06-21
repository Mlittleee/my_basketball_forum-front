//添加点赞
import {get, post} from "@/request/request";

export const addLike=(param)=>get('/like/addLike',param)