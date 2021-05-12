/**
 * obj = {
 *  iosPath: 'key=aaa&val=24345646',
 *  adrPath: 'key=aaa&val=24345646'
 * }
 */
export function H5OpenApp (obj) {
  // android 使用Scheme 协议
  var androidScheme = 'glamor://com.cogo'
  // 跳转连接 包括拼接参数值
  var jumpUrl = ''
  // 下载连接
  // var androidDownUrl = 'https://www.guangmangapp.com/download/index.html'
  var androidDownUrl = 'https://ul.guangmangapp.com/index.html'
  // var iosDownUrl = 'https://www.guangmangapp.com/download/index.html'
  var iosDownUrl = 'https://ul.guangmangapp.com/index.html'
  var ua = navigator.userAgent.toLowerCase()
  // 安卓和IOS判断
  if (ua.indexOf('iphone') > -1) {
    if (isIOS9()) {
      // 判断ios9 以上用 iosDownUrl  + getAddress(obj.iosPath)
      location.href = iosDownUrl + getAddress(obj.iosPath)
      return false
    } else {
      location.href = iosDownUrl
    }
  }
  // 安卓的打开连接暂时放应用宝链接
  if (ua.indexOf('android') > -1) {
    jumpUrl = androidScheme + getAddress(obj.adrPath)
    openUrlIframe(jumpUrl, androidDownUrl)
  }
}

function openUrlIframe (jumpUrl, downUrl) {
  var iframe = document.createElement('iframe')
  var body = document.body
  iframe.style.cssText = 'display: none; width: 0; height: 0;'
  var timer = null
  body.appendChild(iframe)
  iframe.src = jumpUrl
  timer = setTimeout(function () {
    location.href = downUrl
  }, 2000)

  document.addEventListener('onvisibilitychange onwebkitvisibilitychange', function () {
    var tag = document.hidden || document.webkitHidden
    if (tag) {
      clearTimeout(timer)
    }
  })

  window.addEventListener('pagehide', function () {
    clearTimeout(timer)
  })
}

function getAddress (path) {
  var _path = ''
  if (!path) { return '' }
  if (path.startsWith('?')) {
    _path = path
  } else {
    _path = '?' + path
  }
  return _path
}

function isIOS9 () {
  var getOsv = function () {
    var reg = /OS ((\d+_?){2,3})\s/
    if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
      var osv = reg.exec(navigator.userAgent)
      if (osv.length > 0) {
        return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.')
      }
    }
    return ''
  }
  var osv = getOsv()
  var osvArr = osv.split('.')
  // 初始化显示ios9引导
  if (osvArr && osvArr.length > 0) {
    if (parseInt(osvArr[0]) >= 9) {
      return true
    }
  }
  return false
}

export function isWeixinBrowser () {
  var ua = navigator.userAgent.toLowerCase()
  return (/micromessenger/.test(ua))
}

export function isQQBrowser () {
  var ua = navigator.userAgent.toLowerCase()
  return (ua.match(/QQ/i) == 'qq')
}

export function isSafari () {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
}

export function isIos9 () {
  var getOsv = function () {
    var reg = /OS ((\d+_?){2,3})\s/
    if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
      var osv = reg.exec(navigator.userAgent)
      if (osv.length > 0) {
        return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.')
      }
    }
    return ''
  }
  var osv = getOsv()
  var osvArr = osv.split('.')
  // 初始化显示ios9引导
  if (osvArr && osvArr.length > 0) {
    if (parseInt(osvArr[0]) >= 9) {
      return true
    }
  }
  return false
}
