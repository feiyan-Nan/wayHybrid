// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入交互
import NativeDevice from '@/JSNative/device.js'
// 引入轮播组建
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'// 这里注意具体看使用的版本是否需要引入样式，以及具体位置。

// 引入复制到剪切板
import VueClipboard from 'vue-clipboard2'
// 引入图片懒加载
import lazyload from 'vue-lazyload'
// 引入vuX通用组建
import { AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
// Vue.use(VueAwesomeSwiper, /* { default global options } */)

import VueQuickLoadmore from 'vue-quick-loadmore'

// 引入jQ
import $ from 'jquery'
const VConsole = require('./utils/vconsole')
console.log(VConsole, 123)
// 引入淘宝移动端rem
require('flexiblejs')
// // 使用animate.css
// require('vue2-animate/dist/vue2-animate.min.css')
// 引入重置样式
import('./assets/css/reset.css')
// 引入通用样式
import('./assets/css/common.css')

window.jQuery = $
window.$ = $

// 需要注意的是axios是基于Promise的，因此如果你需要兼容低版本浏览器(caniuse)，需要引入polyfill。 Polyfill 推荐使用 es6-promise
require('es6-promise').polyfill()

// 解决ios快速点击
const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.config.productionTip = false
// 使用轮播插件
Vue.use(VueAwesomeSwiper)
// 使用交互
Vue.use(NativeDevice)

Vue.use(lazyload, {
  preLoad: 2,
  effect: 'fadeIn',
  threshold: 200,
  error: require('./assets/img_block.png'),
  loading: require('./assets/img_block.png'),
  attempt: 2
})

// 使用vuX通用组建
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

// 使用上拉加载插件
Vue.use(VueQuickLoadmore)

// 使用复制到剪切板
Vue.use(VueClipboard)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
