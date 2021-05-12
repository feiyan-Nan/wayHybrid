import axios from 'axios'
import { getCookie } from '@/utils/cookie'
// import { isAndroid, isIOS } from '@/utils/platform'
// import vue from 'vue'
// create an axios instance

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  let token = getCookie('token')
  let account = getCookie('uid')
  if (token && account) {
    config.headers['at'] = token
    config.headers['account'] = account
  }
  // vue.$vux.toast.text(account + '//' + token)
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// service.defaults.retry = 4 // 请求次数
// service.defaults.retryDelay = 1000 // 请求的间隙

// respone interceptor
service.interceptors.response.use(
  response => {
    // vue.$vux.toast.show({text: JSON.stringify(response.data), time: 20000})
    // let config = response.config
    // if (response.data == '' || response.data.code == 2126 || response.data.code == 2125 || JSON.stringify(response.data) === '{}') {
    //   try {
    //     if (isAndroid()) {
    //       let token = window.glamor.refreshAt()
    //       setCookie('token', token)
    //       config['account'] = getCookie('uid')
    //       config['at'] = token
    //     } else if (isIOS()) {
    //       vue.$device.JsBridge.callHandler('htmlCallAt', {}, (data) => {
    //         let token = data
    //         setCookie('token', token)
    //         config['account'] = getCookie('uid')
    //         config['at'] = token
    //       })
    //     } else {
    //       vue.$vux.toast.text('请在安卓，ios上使用')
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    return response
    // } else {
    //   return response
    // }
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  })

export default service
