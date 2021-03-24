import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeLoginStorage } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log('error') // for debug
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 请求成功
    if (response.status == 200) {
      let data = response.data
      return data
    } else {
      Message({
        message: '网络错误',
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  error => {
    if (error.response.status === 401) {
      removeLoginStorage()
      // return window.location.reload()
    } else if (error.response.status === 500) {
      Message({
        message: '服务运行错误，请联系管理员',
        showClose: true,
        type: 'error'
      })
    } else {
      Message({
        message: error.response.data.msg,
        showClose: true,
        type: 'error'
      })
    }
  }
)

export default service
