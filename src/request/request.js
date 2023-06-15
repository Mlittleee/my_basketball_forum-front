import axios from './http'
//封装get方法
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            console.log(url)
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * */
//封装post方法
export function post(url, params) {
    return new Promise((resolve, reject) => {
        //序列化参数
        axios.post(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data)
            }).catch(err => {
            reject(err.data)
        })
    })
}