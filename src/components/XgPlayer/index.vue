<!--组件API及参数依赖西瓜视频播放器： http://h5player.bytedance.com/plugins/#loading -->
<template>
<div class="xgplayer-wrapper">
  <div class="xgplayer" :id="id" style="overflow: hidden;" :style="{height: height}">
    <div class="cover-content">
      <div class="control-btn" v-if="isReplyShow">
        <img src="./img/reply@3x.png" alt="" @click="play">
      </div>
      <div class="share-wrapper" v-if="isInApp && isShareShow">
        <div class="share-item" @click="share(0)">
          <img src="./img/weixin@3x.png" alt="">
        </div>
        <div class="share-item" @click="share(1)">
          <img src="./img/friend@3x.png" alt="">
        </div>
        <div class="share-item" @click="share(2)">
          <img src="./img/weibo@3x.png" alt="">
        </div>
        <div class="share-item" @click="share(3)">
          <img src="./img/QQ@3x.png" alt="">
        </div>
        <div class="share-item" @click="share(4)">
          <img src="./img/QQzone@3x.png" alt="">
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import './xgplayer/src/index'
import Xgplayer from './xgplayer/src/player' // 引入西瓜视频
import { isAndroid, isIOS } from '@/utils/platform'
export default {
  props: {
    dataWidth: {
      type: Number,
      default: 0
    },
    dataHeight: {
      type: Number,
      default: 0
    },
    isInApp: {
      type: Boolean,
      default: false
    },
    uid: {
      default: ''
    },
    id: {
      type: String,
      default: 'xgplayer'
    },
    url: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      default: ''
    },
    volume: {
      type: Number,
      default: 0.8
    },
    // 多数浏览器允许静音状态下的 autoplay 行为。为保证 autoplay 确定发生，当配置 autoplay: true 时，xgplayer会忽略volume配置项并默认静音自动播放。在手机上 autoplay 部分机型无效。
    autoplay: {
      type: Boolean,
      default: false
    },
    poster: {
      type: String,
      default: ''
    },
    hasPlaybackRate: {
      type: Boolean,
      default: false
    },
    // 倍速
    playbackRate: {
      type: Array,
      default: () => {
        return [0.5, 0.75, 1, 1.5, 2]
      }
    },
    // 是否有预览
    hasThumbnail: {
      type: Boolean,
      default: false
    },
    // 预览 用户将鼠标指针移动到进度条某处时进度条上方会出现该时刻的视频预览图，服务端提供sprite图(由多张视频预览小图组成)作为预览图资源。
    thumbnail: {
      type: Object,
      default: () => {
        return {
          pic_num: 0,
          width: 0,
          height: 0,
          col: 0,
          row: 0,
          urls: []
        }
      }
    },
    // 画面中央按钮(播放、暂停、重播)
    centerBtn: {
      type: Object,
      default: () => {
        return {
          // pausePath: 'M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z',
          // 'M8.65367573,17.2291054 L16.4787864,17.2291054 C16.612467,17.2291054 16.7437182,17.1933754 16.8589525,17.1256143 C17.2160095,16.9156544 17.3352552,16.4559963 17.1252953,16.0989393 L9.30018463,2.79158784 C9.23550598,2.68159561 9.14383405,2.58992367 9.03384181,2.52524503 C8.67678481,2.3152851 8.21712676,2.43453084 8.00716684,2.79158784 L0.18205617,16.0989393 C0.114295059,16.2141736 0.0785650649,16.3454248 0.0785650649,16.4791054 C0.0785650649,16.8933189 0.414351503,17.2291054 0.828565065,17.2291054 L8.65367573,17.2291054 Z',
          // replayPath: 'M8.22708362,13.8757234 L11.2677371,12.6472196 C11.7798067,12.4403301 12.3626381,12.6877273 12.5695276,13.1997969 L12.9441342,14.1269807 C13.1510237,14.6390502 12.9036264,15.2218816 12.3915569,15.4287712 L6.8284538,17.6764107 L5.90126995,18.0510173 C5.38920044,18.2579068 4.80636901,18.0105096 4.5994795,17.49844 L1.97723335,11.0081531 C1.77034384,10.4960836 2.0177411,9.91325213 2.52981061,9.70636262 L3.45699446,9.33175602 C3.96906396,9.12486652 4.5518954,9.37226378 4.75878491,9.88433329 L5.67885163,12.1615783 C7.99551726,6.6766934 13.3983951,3 19.5,3 C27.7842712,3 34.5,9.71572875 34.5,18 C34.5,26.2842712 27.7842712,33 19.5,33 C15.4573596,33 11.6658607,31.3912946 8.87004692,28.5831991 C8.28554571,27.9961303 8.28762719,27.0463851 8.87469603,26.4618839 C9.46176488,25.8773827 10.4115101,25.8794641 10.9960113,26.466533 C13.2344327,28.7147875 16.263503,30 19.5,30 C26.127417,30 31.5,24.627417 31.5,18 C31.5,11.372583 26.127417,6 19.5,6 C14.4183772,6 9.94214483,9.18783811 8.22708362,13.8757234 Z'
          pausePath: '',
          playPath: '',
          replayPath: ''
        }
      }
    },
    hasEnterLogo: {
      type: Boolean,
      default: false
    },
    // 视频加载页logo
    enterLogo: {
      type: Object,
      default: () => {
        return {
          url: '',
          width: 0,
          height: 0
        }
      }
    },
    // 视频加载页背景
    enterBg: {
      type: Object,
      default: () => {
        return {
          color: 'rgba(0,0,0,0.87)'
        }
      }
    },
    // 视频加载页加载特效
    enterTips: {
      type: Object,
      default: () => {
        return {
          background: 'linear-gradient(to right, rgba(0,0,0,0.87), #3D96FD, rgba(86,195,248), #3D96FD, rgba(0,0,0,0.87))'
        }
      }
    },
    // 画中画 画中画功能支持用户在浏览网页其它内容时继续以小窗的形式观看视频，同时可以拖拽改变小窗在页面中的fix位置。
    pip: {
      type: Boolean,
      default: false
    },
    // 控制条
    controls: {
      type: Boolean,
      default: true
    },
    /**
     * 控制条选项配置
     * 注意: 只对原生video有效，对自定义UI请使用ignores选项
     * 参考值：['nodownload','nofullscreen','noremoteplayback']
     */
    controlsList: {
      type: Array,
      default: () => {
        return ['nodownload']
      }
    },
    /**
    * xgplayer播放器对于原生video的基本功能进行了优化和封装，如果不想使用xgplayer内置控件，可以通过ignores配置项关闭，使用自己开发的相同功能插件进行替换。
    * 参考值： ['time', 'definition', 'error', 'fullscreen', 'i18n', 'loading', 'mobile', 'pc', 'play', 'poster', 'progress', 'replay', 'start', 'volume']
    * time 当前播放时间/视频时长
    * definition 清晰度切换
    * error 报错提示
    * fullscreen 全屏切换
    * i18n 多语种切换
    * loading 加载提示
    * mobile 手机交互
    * pc 桌面视频交互
    * play 控制条的播放、暂停按钮
    * poster 封面图插件
    * progress 视频进度条
    * replay 重播交互与提示
    * start 初始化播放按钮
    * volume 音量控制
    */
    ignores: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 播放镜像
    // 开启airplay选项可以将iOS设备上的视频传送到支持airplay的设备上进行播放
    airplay: {
      type: Boolean,
      default: true
    },
    /**
     * 白名单
     * 手机上video表现各异，自定义UI会有意想不到的情况发生，为了安全起见，播放器在手机上会关掉自定义UI功能，开发者可以通过白名单的方式开启此项功能。whitelist是数组，数组的每项值可以是字符串、正则表达式、函数（箭头函数）均可，字符串和正则表达式都是对navigator.userAgent来判断，函数不限。
     * 参考值：[字符串，正则，函数]
    */
    whitelist: {
      type: Array,
      default: () => {
        return ['OS', 'Android']
      }
    },
    /**
     * 内联模式
     * 该选项在手机观看时，开启ios和微信的内联模式
    */
    playsinline: {
      type: Boolean,
      default: true
    },
    // 微信同层播放
    x5VideoPlayerType: {
      type: String,
      default: 'h5'
    },
    // 微信全屏播放
    x5VideoPlayerFullscreen: {
      type: Boolean,
      default: false
    },
    /**
     * 微信横竖屏控制
     * 参考值：'landscape' | 'portraint'
    */
    x5VideoOrientation: {
      type: String,
      default: 'portrait'
    }
  },
  data () {
    return {
      isShareShow: false,
      isReplyShow: false,
      instance: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    share (val) {
      if (isAndroid()) {
        try {
          window.glamor.shareUrl(val)
        } catch (error) {
          console.log(error)
        }
      } else if (isIOS()) {
        try {
          this.$device.JsBridge.callHandler('h5ClickShare', {val: val}, (data) => {
            // 返回APP端给回的data
            console.log(data)
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
    start (url) {
      this.instance.start(url)
    },
    play () {
      this.instance.play()
    },
    replay () {
      this.instance.replay()
    },
    pause () {
      this.instance.wating()
    },
    reload () {
      this.instance.reload()
    },
    // 销毁播放器
    destroy () {
      this.instance.destroy()
    },
    canPlayType () {
      this.instance.canPlayType()
    },
    getBufferedRange () {
      const array = this.instance.getBufferedRange()
      console.log(array)
    },
    // 加载播放器
    init () {
      var _this = this
      if (this.instance) {
        this.destroy()
      }
      _this.instance = new Xgplayer({
        el: document.getElementById(_this.id),
        url: _this.url,
        width: _this.width,
        height: _this.height,
        dataWidth: _this.dataWidth,
        dataHeight: _this.dataHeight,
        volume: _this.volume,
        poster: _this.poster,
        autoplay: _this.autoplay,
        playbackRate: _this.hasPlaybackRate ? _this.playbackRate : '',
        thumbnail: _this.hasThumbnail ? _this.thumbnail : '',
        centerBtn: _this.centerBtn,
        // enterLogo: {
        //   url: _this.enterLogo.url,
        //   width: _this.enterLogo.width,
        //   height: _this.enterLogo.height
        // },
        enterBg: _this.enterBg,
        enterTips: _this.enterTips,
        pip: _this.pip,
        controls: _this.controls,
        controlsList: _this.controlsList,
        ignores: _this.ignores,
        airplay: _this.airplay,
        whitelist: _this.whitelist,
        playsinline: _this.playsinline,
        'x5-video-player-type': _this.x5VideoPlayerType,
        'x5-video-player-fullscreen': _this.x5VideoPlayerFullscreen,
        'x5-video-orientation': _this.x5VideoOrientation
      })

      // 注册钩子函数
      this.instance.on('ready', () => {
        this.instance.on('play', () => {
          this.isShareShow = false
          this.isReplyShow = false
        })
        this.instance.on('pause', () => {
          this.isShareShow = true
          this.isReplyShow = false
        })
        this.instance.on('ended', () => {
          this.isShareShow = true
          this.isReplyShow = true
        })
        // 拖动滚动条播放
        this.instance.on('seeking', () => {
          let currentTime = this.instance.currentTime
          let duration = this.instance.duration
          if (currentTime < duration) {
            this.play()
          } else if (currentTime === duration) {
            this.instance.currentTime = this.instance.duration - 1
          }
        })
        this.instance.on('seeked', () => {
          this.play()
        })
      })

      if (isIOS()) {
        let _this = this
        try {
          this.$device.JsBridge.registerHandler('destoryXgPlayer', (data, responseCallback) => {
            if (_this.instance) {
              _this.instance.destroy()
            }
          })
        } catch (e) {}
      }
    }
  },
  destroyed () {
    this.instance.destroy()
  }
}
</script>
<style lang="scss">
  @import './xgplayer/src/style/index'
</style>

<style lang="less">
.xgplayer{
  width: 100%;
  background: #000;
  position: relative;
}
.xgplayer-ended .xgplayer-controls {
  display: none;
}
.video-rotate, .video-rotate video{
  transtion: all 0.1s linear;
  transform: rotate(90deg);
}
.xgplayer-pause .cover-content{
  top: 45%;
}
.xgplayer-ended .cover-content{
  top: 32%;
}
.cover-content{
  display: block;
  width: 100%;
  position: absolute;
  left: 0;
  z-index: 9;
  margin: 0 auto;
  .control-btn{
    width: 1.12rem;
    height:1.12rem;
    margin: 0 auto;
    margin-bottom: .266667rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .share-wrapper{
    display: flex;
    // width: 8.4rem;
    height: 1.066667rem;
    border-radius: .106667rem;
    width: calc(100% - 1.6rem);
    margin: 0 auto;
    background: rgba(0,0,0,0.4);
    border-radius: 4px;
    box-sizing: border-box;
    .share-item{
      flex: 1;
      display: flex;
      justify-content: space-around;
      text-align: center;
      align-items: center;
      img{
        width: .746667rem;
        height: .746667rem;
      }
    }
  }
}
.xgplayer-share-wrapper{
    display: flex;
    width: 8.4rem;
    height: 1.066667rem;
    margin-top: .266667rem;
    border-radius: .106667rem;
    .share-item{
      flex: 1;
      display: flex;
      justify-content: space-around;
      text-align: center;
      align-items: center;
      img{
        width: .746667rem;
        height: .746667rem;
      }
    }
}

</style>
<style lang="less" scoped>
.xgplayer-wrapper{
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
