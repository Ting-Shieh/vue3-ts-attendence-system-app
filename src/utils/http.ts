import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '@/store'
import router from '@/router';
import type { StateAll } from '@/store'
import { ElMessage } from "element-plus";
/**
 * https://axios-http.com/zh/docs/interceptors
 */
// 创建实例时配置默认值
const instance = axios.create({
  baseURL: 'http://api.h5ke.top/',
  timeout: 5000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  if (config.headers) {
    config.headers.authorization = (store.state as StateAll).users.token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 偽造或是超時token
  if (response.data.errmsg === 'token error') {
    ElMessage.error('token error')
    store.commit('users/clearToken')
    // 不推薦編程式路由，因為跳過去後不會刷新頁面
    // 重新登入，還原所有共享狀態
    setTimeout(() => {
      window.location.replace('/login')
    }, 1000)
  } else if (response.data.errmsg === 'error') {
    router.push('/500')
  }
  // 对响应数据做点什么
  return response;
}, function (error) {
  return Promise.reject(error);
});

interface Data {
  [index: string]: unknown
}

interface Http {
  get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>,
  post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>,
  put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>,
  patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>,
  delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

const http: Http= {
  get(url, data, config){
    return instance.get(url, {
      params: data,
      ...config
    })
  },
  post(url, data, config){
    return instance.post(url, data, config)
  },
  put(url, data, config){
    return instance.put(url, data, config)
  },
  patch(url, data, config){
    return instance.patch(url, data, config)
  },
  delete(url, data, config){
    return instance.delete(url, {
      data,
      ...config
    })
  }
}

export default http;