/* eslint-disable */
import Player from '../player'
import SVG from '../utils/svg'

let play = function () {
  let player = this
  let root = player.controls;
  let util = Player.util;
  let scale = player.config.iconScale || 0.0320625
  let iconPath = {
    play: 'M204.454912 138.15808 820.340736 512.016384l-616.723456 373.819392L204.454912 138.15808M204.454912 84.583424c-29.586432 0-53.574656 23.988224-53.574656 53.574656l-0.837632 747.676672c-0.013312 19.47648 10.529792 37.421056 27.5456 46.877696 7.99232 4.368384 16.939008 6.670336 26.028032 6.695936 9.993216 0.014336 19.776512-2.771968 28.278784-8.04352L848.605184 557.559808c25.1392-15.591424 32.896-48.617472 17.317888-73.783296-4.369408-7.011328-10.30656-12.949504-17.317888-17.304576L232.733696 92.653568c-8.48896-5.25824-18.285568-8.04352-28.278784-8.04352l0 0L204.454912 84.583424z',
    pause: 'M325.5 192.5c-19.9 0-36 16.1-36 36v567c0 19.9 16.1 36 36 36s36-16.1 35-36v-567c1-19.9-15.1-36-35-36z m373 0c-19.9 0-36 16.1-36 36v567c0 19.9 16.1 36 36 36s36-16.1 36-36v-567c0-19.9-16.1-36-36-36z'
  }
  let btn = util.createDom('xg-play', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path transform="scale(${scale} ${scale})" fill="#ffffff" d="${iconPath.play}"></path>
        </svg></xg-icon>`)
  // let tipsPlay = player.config.lang && player.config.lang === "zh-cn" ? "播放" : "Play"
  // let tipsPause = player.config.lang && player.config.lang === "zh-cn" ? "暂停" : "Pause"
  // let tips = util.createDom('xg-tips', tipsPlay, {}, 'xgplayer-tips')
  let path = btn.querySelector('path')
  // btn.appendChild(tips)

  let svg = new SVG({
    progress: (shape, percent) => {
      path.setAttribute('d', svg.toSVGString(shape))
    },
    from: iconPath.pause,
    to: iconPath.play,
    duration: 50
  })

  let ev = ['click', 'touchstart']
  btn.className = 'xgplayer-play'
  root.appendChild(btn)
  ev.forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (player.ended) {
        return
      }
      if (player.paused) {
        player.play()
      } else {
        player.pause()
      }
    }, false)
  })

  player.on('play', () => {
    // tips.textContent = tipsPause
    if (svg.to !== iconPath.pause) {
      svg.reset(iconPath.pause, iconPath.play)
    }
  })

  player.on('pause', () => {
    // tips.textContent = tipsPlay
    if (svg.to !== iconPath.play) {
      svg.reset(iconPath.play, iconPath.pause)
    }
  })
  player.once('destroy', () => {
    btn = null
  })
}

Player.install('play', play)
