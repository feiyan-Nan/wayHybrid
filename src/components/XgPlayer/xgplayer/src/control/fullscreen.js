/* eslint-disable */
import Player from '../player'
import util from '../utils/util'
import vue from 'vue'
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
  if (window.orientation === 180 || window.orientation === 0) {
  }
  if (window.orientation === 90 || window.orientation === -90) {
  }
}, false);
let fullscreen = function () {
  let player = this;
  let util = Player.util
  let scale = 0.03
  let iconPath = {
    active: 'M370.752 608L129.6 849.152a32 32 0 0 0 45.248 45.248L416 653.248V768a32 32 0 0 0 64 0v-192a31.904 31.904 0 0 0-32-32H256a32 32 0 0 0 0 64h114.752z m182.624-137.376A31.904 31.904 0 0 1 544 448V256a32 32 0 0 1 64 0v114.752l241.152-241.152a32 32 0 1 1 45.248 45.248L653.248 416H768a32 32 0 0 1 0 64h-192a31.904 31.904 0 0 1-22.624-9.376z',
    default: 'M547.4 197.4v46l200.3 0.1L546.1 444l32.4 32.6 201.9-200.7v200.9h46V197.5zM471.4 584.4l-32.6-32.6L243.6 747V547.9h-46v278.7h279v-46H275z'
  }
  let btn = util.createDom('xg-fullscreen', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path transform="scale(${scale} ${scale})" d="${iconPath.default}"></path>
        </svg></xg-icon>`, {}, 'xgplayer-fullscreen')
  let tipsFull = player.config.lang && player.config.lang === "zh-cn" ? "全屏" : "Full screen"
  let tipsExitFull = player.config.lang && player.config.lang === "zh-cn" ? "退出全屏" : "Exit full screen"
  let root = player.controls;
  let container = player.root
  let tips = util.createDom('xg-tips', tipsFull, {}, 'xgplayer-tips')
  let path = btn.querySelector('path')
  // btn.appendChild(tips)
  let getFullscreen = function (el) {
    try {
      if (util.isAndorid()) {
        window.glamor.enterFullScreen()
      } else if (util.isIOS()) {
        vue.$device.callHandler('enterFullScreen', {}, () => {})
      }
    } catch (error) {}

    let fullscreeSupport = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled
    path.setAttribute('d', iconPath.active)
    tips.textContent = tipsExitFull
    if (fullscreeSupport) {
      if (el.requestFullscreen) {
        el.requestFullscreen()
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
      } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen()
      } else {
        util.addClass(el, 'xgplayer-fullscreen-active')
      }
    } else {
      util.addClass(el, 'xgplayer-fullscreen-active')
    }
  }
  let exitFullscreen = function (el) {
    try {
      if (util.isAndorid()) {
        window.glamor.quitFullScreen()
      } else if (util.isIOS()) {
        vue.$device.callHandler('quitFullScreen', {}, () => {})
      }
    } catch (error) {}
    let fullscreeSupport = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled
    path.setAttribute('d', iconPath.default)
    tips.textContent = tipsFull
    if (fullscreeSupport) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    } else {
      util.removeClass(el, 'xgplayer-fullscreen-active')
    }
  }
  root.appendChild(btn);
  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()

      if (util.hasClass(container, 'xgplayer-fullscreen-active') || util.hasClass(container, 'xgplayer-is-fullscreen')) {
        exitFullscreen(container)
      } else {
        getFullscreen(container)
      }
    })
  })

  let handle = function (e) {
    let fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
    let _width = document.getElementsByClassName('videoElement')[0].getAttribute('data-width')
    let _height = document.getElementsByClassName('videoElement')[0].getAttribute('data-height')
    console.log(_width, _height)
    if (fullscreenEl && fullscreenEl === container) {
      if (_width > _height) {
        util.addClass(container, 'video-rotate')
      }
      // console.log(window.)
      util.addClass(container, 'xgplayer-is-fullscreen')
      path.setAttribute('d', iconPath.active)
      tips.textContent = tipsExitFull
    } else {
      util.removeClass(container, 'video-rotate')
      util.removeClass(container, 'xgplayer-is-fullscreen')
      path.setAttribute('d', iconPath.default)
      tips.textContent = tipsFull
    }
  };

  btn.addEventListener('mouseenter', (e) => {
    e.preventDefault();
    e.stopPropagation();
    tips.style.left = "50%"
    let rect = tips.getBoundingClientRect()
    let rootRect = container.getBoundingClientRect()
    if (rect.right > rootRect.right) {
      tips.style.left = `${- rect.right + rootRect.right + 16}px`
    }
  });

  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
    document.addEventListener(item, handle)
  })

  player.once('destroy', function () {
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.removeEventListener(item, handle)
    })
    btn = null
  })
}

Player.install('fullscreen', fullscreen)
