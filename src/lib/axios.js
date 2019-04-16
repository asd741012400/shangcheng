import axios from 'axios'
import localStore from 'store2'

//默认配置地址
axios.defaults.baseURL = 'http://yuouapi.shizuyx.com'

//axios:请求拦截器
axios.interceptors.request.use(function(config) {

    
    return config;
});


// http 响应response 拦截器
axios.interceptors.response.use(response => {

    return response;
}, error => {

    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '请求错误!'
                break
            case 401:
                error.message = '登录过期或Tokn无效，请重新登录！'
                setTimeout(() => {
                    window.location.href = '/'
                }, 5000);
                break
            case 403:
                error.message = '你没有权限！'
                break
            case 404:
                error.message = (process.env.NODE_ENV === 'production' ? `请求地址出错` : `请求地址出错: ${error.response.config.url}`)
                break
            case 408:
                error.message = '请求超时,请刷新后重试！'
                break
            case 500:
                error.message = '服务器内部错误'
                break
            case 501:
                error.message = '服务未实现'
                break
            case 502:
                error.message = '网关错误'
                break
            case 503:
                error.message = '服务不可用'
                break
            case 504:
                error.message = '网关超时,请刷新后重试！'
                break
            case 505:
                error.message = 'HTTP版本不受支持'
                break
            default:
        }
        error.message = error.response.data.msg || error.message
    }

    if (error.response.data.msg) {
        return Promise.reject(error.response.data.msg);
    } else {
        return Promise.reject(error);
    }
});

export default axios

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: url,
        params: params
    });
};

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        // transformRequest: [function(data) {
        //   let ret = '';
        //   for (let it in data) {
        //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        //   }
        //   return ret;
        // }],
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        // }
    });
};

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: url,
        data: params,
        // transformRequest: [function(data) {
        //   let ret = '';
        //   for (let it in data) {
        //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        //   }
        //   return ret;
        // }],
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        // }
    });
};

export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: url,
        params: params
    });
};

export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        params: params
    });
};