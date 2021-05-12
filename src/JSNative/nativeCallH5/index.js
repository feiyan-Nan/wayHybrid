/**
 * // 封装native调用
 * @param {*} device :this.$device
 * @param {*} router :this.$router
 * @param {*} funName :与native端定义的方法名，两端需要统一
 */

import Vue from 'vue'
// 引用native交互函数
import NativeDevice from '../device.js'
Vue.use(NativeDevice)

export default function interactionNative (device, router, funName) {
  var router2 = router
  // app调h5 responseCallback为h5给app的返回值
  device.JsBridge.registerHandler(funName, (data, responseCallback) => {
    // 路由跳转到指定路由界面
    router2.push({ name: data })

    var dataJson = '跳转到' + data + '成功！'
    responseCallback(dataJson)
  })
}
