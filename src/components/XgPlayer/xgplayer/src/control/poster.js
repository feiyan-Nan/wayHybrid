/* eslint-disable */
import Player from '../player'

let poster = function () {
  let player = this;
  let util = Player.util
  let poster = util.createDom('xg-poster', '<img src="'+ player.config.poster +'" width="100%" height="100%">', {}, 'xgplayer-poster');
  let root = player.root
  if (player.config.poster) {
    // poster.style.backgroundImage = `url(${player.config.poster})`
    root.appendChild(poster)
  }
  player.on('play', () => {
    poster.style.display = 'none'
  })

  player.once('destroy', () => {
    poster = null
  })
}

Player.install('poster', poster)
