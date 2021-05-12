
import Player from '../player'

let replay = function () {
  let player = this; let util = Player.util
  let centerBtn = player.config.centerBtn ? player.config.centerBtn : {}
  let iconPath = {
    replay: centerBtn.replayPath ? centerBtn.replayPath : `M8.22708362,13.8757234 L11.2677371,12.6472196 C11.7798067,12.4403301 12.3626381,12.6877273 12.5695276,13.1997969 L12.9441342,14.1269807 C13.1510237,14.6390502 12.9036264,15.2218816 12.3915569,15.4287712 L6.8284538,17.6764107 L5.90126995,18.0510173 C5.38920044,18.2579068 4.80636901,18.0105096 4.5994795,17.49844 L1.97723335,11.0081531 C1.77034384,10.4960836 2.0177411,9.91325213 2.52981061,9.70636262 L3.45699446,9.33175602 C3.96906396,9.12486652 4.5518954,9.37226378 4.75878491,9.88433329 L5.67885163,12.1615783 C7.99551726,6.6766934 13.3983951,3 19.5,3 C27.7842712,3 34.5,9.71572875 34.5,18 C34.5,26.2842712 27.7842712,33 19.5,33 C15.4573596,33 11.6658607,31.3912946 8.87004692,28.5831991 C8.28554571,27.9961303 8.28762719,27.0463851 8.87469603,26.4618839 C9.46176488,25.8773827 10.4115101,25.8794641 10.9960113,26.466533 C13.2344327,28.7147875 16.263503,30 19.5,30 C26.127417,30 31.5,24.627417 31.5,18 C31.5,11.372583 26.127417,6 19.5,6 C14.4183772,6 9.94214483,9.18783811 8.22708362,13.8757234 Z`
  }
  let container = util.createDom('xg-replay', `
    <svg class="xgplayer-replay-svg" xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewbox="0 0 78 78">
      <path d="${iconPath.replay}"></path>
    </svg>
    <xg-replay-txt class="xgplayer-replay-txt"></xg-replay-txt>
    `, {}, 'xgplayer-replay'); let root = player.root
  let btn = container.querySelector('.xgplayer-replay-svg')
  root.appendChild(container)

  player.on('ended', function () {
    // container.querySelector('.xgplayer-replay-txt').textContent = player.lang.REPLAY
    let path = container.querySelector('path')
    let transform = window.getComputedStyle(path).getPropertyValue('transform')
    if (transform !== 'none') {
      path.setAttribute('transform', transform)
    }
    if (!player.config.loop) {
      util.addClass(root, 'replay')
    }
  })
  btn.addEventListener('click', function (e) {
    e.preventDefault()
    util.removeClass(root, 'replay')
    player.replay()
  })
  player.once('destroy', () => {
    btn = null
  })
}

Player.install('replay', replay)
