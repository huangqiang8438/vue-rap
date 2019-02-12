
import axios from 'axios'
import cmsMessage from '@/components/cms/cmsMessage'
/**
 * 配置全局参数请求头
 */

const $axios = axios.create({
  baseURL: process.env.baseUrl,
  timeout: 500000,
  headers: {
    // 'JSPGOU-Auth-Token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiO123123124iIxIiwiaWF0IjoxNTIxNzAyMTgwLCJpc3MiOiJKU1BHT1UgQXV0aCBCdWlsZGVyIiwiZXhwIjoxNTIxNzA5MzgwfQ.3NBn51wC53eMFzm8r3d9wmB9uustC961xrz2TxX8bhk'
  }
})
/**
 * 请求拦截器
 */
$axios.interceptors.request.use(config => { // 在此处统一配置公共参数
  return config
}, error => {
  Promise.reject(error)// 错误提示
})

/** 响应拦截器 */
$axios.interceptors.response.use(response => {
  return response.data
},
error => {
  cmsMessage({ message: '与服务器断开连接', type: 'error', timer: '3000'
  })
  return Promise.reject(error)
}
)
export default $axios
