import {get, post} from '@/request/request'

//批量增加标签
export const addTags = (param) => post('/tag/addTags', param)