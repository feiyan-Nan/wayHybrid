/**
 * // 封装native调用
 * @param {*} device :this.$device
 * @param {*} funName :与native端定义的方法名，两端需要统一
 * @param {*} requestData :发给服务器的参数
 */

import Vue from 'vue'
// 引用native交互函数
import NativeDevice from '../device.js'
Vue.use(NativeDevice)

export function interactionNative (device, funName, requestData) {
  // h5掉app data为返回的信息
  device.JsBridge.callHandler(funName, requestData, (data) => {
    // 返回APP端给回的data
    return data
  })
}
