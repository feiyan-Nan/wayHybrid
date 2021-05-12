/* eslint-disable */
import Player from '../player'

let error = function () {
  let player = this;
  let util = Player.util;
  let error = util.createDom('xg-error', '<em class="xgplayer-error-text">请<span class="xgplayer-error-refresh">刷新</span>试试</em>', {}, 'xgplayer-error')
  player.root.appendChild(error)
  let text = error.querySelector('.xgplayer-error-text')
  let refresh = null

  player.on('error', function () {
    player.controls.style.display = 'none'
    if (player.config.lang && player.config.lang === 'zh-cn') {
      text.innerHTML = `${player.lang[player.video.error.message] || player.lang.ERROR}，请<span class="xgplayer-error-refresh">刷新</span>试试`
    } else {
      text.innerHTML = `${player.lang[player.video.error.message] || player.lang.ERROR}，please try to <span class="xgplayer-error-refresh">refresh</span>`
    }

    util.addClass(player.root, 'xgplayer-is-error')
    refresh = error.querySelector('.xgplayer-error-refresh');
    ['touchstart', 'click'].forEach(item => {
      refresh.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        let p = e.target || e.srcElement
        if (p && p.tagName.toLocaleLowerCase() === 'span') {
          player.controls.style.display = 'flex'
          player.reload()
        }
      })
    })
  })

  player.once('destroy', () => {
    refresh = null
    error = null
  })
}

Player.install('error', error)
