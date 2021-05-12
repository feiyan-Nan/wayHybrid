/**
 * // name 是传入 设备系统
 * @param {*} name :Android 或 iOS
 */

/* eslint-disable */
const u = navigator.userAgent
export function isAndroid () {
  // android终端或者
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
  return isAndroid
}

export function isIOS () {
  // ios终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isIOS
}

export function isWeichat() {
  var agent = navigator.userAgent.toLowerCase()
  if (agent.match(/MicroMessenger/i) == "micromessenger") {
      return true
  } else {
      return false
  }
}
export function isPhone () {
  let ua = navigator.userAgent
  let isWindowsPhone = /(?:Windows Phone)/.test(ua)
  let isAndroid = /(?:Android)/.test(ua)
  let isFireFox = /(?:Firefox)/.test(ua)
  let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  let isPhone = /(?:iPhone)/.test(ua) && !isTablet
  return isPhone
}

export function isPc () {
  let ua = navigator.userAgent
  let isWindowsPhone = /(?:Windows Phone)/.test(ua)
  let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  let isAndroid = /(?:Android)/.test(ua)
  let isFireFox = /(?:Firefox)/.test(ua)
  let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  let isPhone = /(?:iPhone)/.test(ua) && !isTablet
  let isPc = !isPhone && !isAndroid && !isSymbian
  return isPc
}
