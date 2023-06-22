import {get, post} from "@/request/request";

//获取所有板块
export const getAllCategory = (params) => get('/category/selectAllCategory',params)

//返回帖子列表然后进行分页展示
export const PostListByCategory = (param)=>post('/category/findPostByCategory',param)

//返回板块描述信息
export const getDescription = (param)=>get('/category/getCategoryDescription',param)

//更改板块描述信息
export const updateDescription = (param)=>get('/category/updateCategoryDescription',param)

//按照板块名称查询热度(返回[2,5]的热度值）
export const getHeat = (param)=>get('/category/getCategoryHeatOrder',param)

//根据板块名称返回帖子百分比和用户百分比
export const getPercent = (param)=>get('/category/getCategoryPercentage',param)
