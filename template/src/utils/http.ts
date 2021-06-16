import axios from 'axios'
// import jsCookie from 'js-cookie'
import { message } from 'ant-design-vue'

const request = axios.create({
  baseURL: '',
  timeout: 5000,
})

// request拦截器
request.interceptors.request.use(
  (config) => {
    // 示例
    // const token = jsCookie.get('token')
    // if (token) {
    //   config.headers['Access-Token'] = token
    // }
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

// response拦截器，拦截错误请求全局提示
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    message.error(err.message)
    return Promise.reject(err)
  },
)

const service = request.request

export default service
