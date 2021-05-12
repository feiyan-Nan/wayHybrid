/* eslint-disable */
import Player from '../player'

let time = function () {
  let player = this;
  let util = Player.util
  let format = util.format
  // let curtime = util.createDom('xg-time', `<span>${player.currentTime || format(0)}</span><em>${player.duration || format(0)}</em>`, {}, 'xgplayer-time-start');
  let curtime = util.createDom('xg-time', `<span>${player.currentTime || format(0)}</span>`, {}, 'xgplayer-time-start');
  let root = player.controls
  let durationTime = util.createDom('xg-time', `<em>${player.duration || format(0)}</em>`, {}, 'xgplayer-time-end');
  root.appendChild(curtime)
  root.appendChild(durationTime)
  let handle = function () {
    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving) {
      // curtime.innerHTML = `<span>${format(player.currentTime || 0)}</span><em>${format(player.duration)}`
      curtime.innerHTML = `<span>${format(player.currentTime || 0)}</span>`
      durationTime.innerHTML = `<em>${format(player.duration)}</em>`
    }
  }
  player.on('durationchange', handle)
  player.on('timeupdate', handle)
  player.once('destroy', () => {
    player.off('durationchange', handle)
    player.off('timeupdate', handle)
    curtime = null
  })
}

Player.install('time', time)
