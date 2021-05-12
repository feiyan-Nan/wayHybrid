/**
 *  android：https://github.com/lzyzsd/JsBridge
 *  IOS：https://github.com/marcuswestin/WebViewJavascriptBridge
 */
/* eslint-disable */
// cookie存储
import cookie from 'arale-cookie'
// 获取设备信息
const ua = navigator.userAgent
// 是安卓设备
const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua)
// 是苹果pad
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
// 是iphone设备
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
// 是微信
const isWechat = /micromessenger/i.test(ua)

// 初始化设置
let defaultParams = {
  code: 0,
  msg: '',
  data: {
    method: ''
  }
}

/**
 * 和app 交互
 * @param {*} method 方法名
 * @param {*} params 参数
 * @param {*} isAuth 是否需要用户信息
 */
const nativeBridge = (method, params = {}, isAuth = true) => {
  defaultParams.data.method = method
  defaultParams.data.para = params
  if (isAuth) {
    defaultParams.data.para = {
      ...defaultParams.data.para,
      user_id: cookie.get('user_id'),
      token: cookie.get('access_token'),
      user_name: cookie.get('user_name')
    }
  }
  _nativeBridge(defaultParams)
}

function _nativeBridge (params) {
  let param = isAndroid ? JSON.stringify(params) : params
  WebViewJavascriptBridge.nativeBridge(param)
}

/**
 * 函数描述：js调用webview事件
 *
 * jsBridge.callHandler(method, data, callBack(response));
 * @param method {string} 方法名
 * @param data {Object} 参数
 * @return {Object} 回调
 */

/**
 * 函数描述：webView调用JS事件
 *
 * jsBridge.registerHandler(method, callBack(data, response));
 * @param method {string} 方法名
 * @return {Object} 回调
 */

var JsBridge = {
  init: function (callback) {
    var u = navigator.userAgent
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (!isiOS) {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function () {
            callback(WebViewJavascriptBridge)
          },
          false
        )
      }
    } else {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge)
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
      }
      window.WVJBCallbacks = [callback]
      var WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    }
  },

  first: function (data) {
    var u = navigator.userAgent
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (!isiOS) {
      var _this = this
      _this.init(function (bridge) {
        bridge.init(function (message, responseCallback) {
          responseCallback(data)
        })
      })
    }
  },

  // App to H5
  registerHandler: function (name, fun) {
    var _this = this
    _this.init(function (bridge) {
      bridge.registerHandler(name, fun)
    })
  },

  // H5 to App
  callHandler: function (name, data, fun) {
    var _this = this
    _this.init(function (bridge) {
      bridge.callHandler(name, data, fun)
    })
  }
}

JsBridge.first()

// export {
//   JsBridge
// }

const plugin = function (Vue) {
  // Vue.$device will be removed
  if (!Vue.$device || !Vue.device) {
    Vue.$device = Vue.device = {
      isAndroid,
      isIpad,
      isIpod,
      isIphone,
      isWechat,
      nativeBridge,
      JsBridge
    }
  }
  Vue.mixin({
    created () {
      this.$device = {
        isAndroid,
        isIpad,
        isIpod,
        isIphone,
        isWechat,
        nativeBridge,
        JsBridge
      }
    }
  })
}

export default plugin
