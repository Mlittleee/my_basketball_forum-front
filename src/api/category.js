import {get, post} from "@/request/request";

//获取所有板块
export const getAllCategory = (params) => get('/category/selectAllCategory',params)