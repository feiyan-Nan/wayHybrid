/* eslint-disable */
// 播放器的配置模块是从这里进行配置的
import Player from './player'
import definition from './control/definition'
import error from './control/error' // 错误页面
import flex from './control/flex'
import fullscreen from './control/fullscreen'
import i18n from './control/i18n'
import loading from './control/loading'
import makeBullet from './control/makeBullet'
import mobile from './control/mobile'
import pip from './control/pip'
import play from './control/play' // 播放暂停按钮
import playbackRate from './control/playbackRate'
import poster from './control/poster' // 不要封面图
import progress from './control/progress'
// import reply from './control/replay' // 重播按钮不使用插件自带的
import textTrack from './control/textTrack'
import time from './control/time'
import volume from './control/volume'

// import * as Controls from './control/*.js'

export default Player
