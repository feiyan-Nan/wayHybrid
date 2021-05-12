<template>
  <div class="rootEl" v-cloak>
    <!-- 有视频 st -->
    <Loading v-if="isLoading"></Loading>
    <contDeleted v-else-if="isContDeleted"></contDeleted>
    <contError v-else-if="isContError"></contError>
    <contUnpass v-else-if="isContUnpass"></contUnpass>
    <netError v-else-if="isNetError"></netError>
    <div v-else>
      <div v-if="isVideo" class="video-wrapper">
        <xg-player id="player"
          :url="player.url"
          :height = "player.height"
          :autoplay="player.autoplay"
          :poster="player.poster"
          :uid="uid"
          :isInApp="true"
          ref="xgplayer"
          >
        </xg-player>
      </div>
      <!-- 有视频 end -->
      <!-- 是状态 且有轮播图 st -->
      <div v-if="isStatus && info.images.length > 1" class="swiper-wrapper">
        <swiper id='swiper' class='swiper' ref='swiper' :options='swiperOption'>
          <swiper-slide v-for='(item, index) in info.images' :key="index" >
            <div class="slide-item" :style="{maxHeight: maxHeight,height: item.height}">
              <img :src="item.src">
              <p class="pagination" v-if="info.images && info.images.length > 1">{{index +1}}/{{info.images.length}} </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div v-if="isStatus && info.images.length == 1" true class="banner-wrapper" :style="{maxHeight: maxHeight}">
        <img :src="info.images[0].src" alt="">
      </div>
      <!-- 是状态 且有轮播图 end -->
      <div v-if="isArticle" class="banner-wrapper" :style="{maxHeight: maxHeight, height: info.cover.height}">
        <img :src="info.cover.src" alt="">
      </div>
      <div v-if="isArticle && info.title">
        <p class="article-title">{{info.title}}</p>
        <div class="divider"></div>
      </div>
      <div class="author-wrapper">
        <div class="author-img"  @click="clickAvatar(info.uid)">
          <div class="img-wrapper">
            <img v-if="info.avatar" :src="info.avatar">
            <img v-else src="../../assets/avatar@3x.png" alt="">
          </div>
          <div v-if="info.isAuth" class="auth">
            <img src="../../assets/auth@3x.png" alt="">
          </div>
        </div>
        <div class="author-info">
          <p class="name">{{info.nickName}}</p>
          <p class="desc">
            <span v-if="info.isAuth">{{info.org ? info.org : ''}}  {{info.authTitle}}</span>
            <span v-else>{{info.cntFansStr}} 人关注</span>
          </p>
        </div>
        <!-- 关注按钮,只有文章作者ID和当前登陆用户ID不同才会显示 -->
        <div v-if="info.isOwner == 0" v-waves class="attention-button" :class="info.isFollow !== 0 ? ' active' : ''" @click="clickCared">
          {{info.isFollow !== 0 ? '已关注' : '关注'}}
        </div>
      </div>
      <div class="content-wrapper">
        <!-- 这是状态现实的内容 st-->
        <p v-if="isStatus">{{info.text}}</p>
        <!-- 这是状态现实的内容 end -->
        <!-- 这是文章现实的内容  st -->
        <div v-if="isArticle" v-html="info.content"></div>
        <!-- 这是文章现实的内容 end -->
      </div>
      <div class="content-info">
        <p class="time">发布于{{info.publishDateStr}}</p>
        <p class="read">{{info.cntReadStr}} {{isVideo ? '播放' : '阅读'}}</p>
        <div class="clearfix"></div>
        <p class="copyright" v-if="isCopyRightShow">
          本文版权归该作者所有，任何形式转载请联系作者。本文仅代表作者个人观点，不代表本平台的立场
        </p>
      </div>
      <div class="divider"></div>
      <div class="comment-wrapper">
        <p class="title">评论</p>
        <div v-if="commentList.length && commentList.length > 0" class="comment-list">
          <div class="comment-item" v-for="(item, index) in commentList" :key="index">
            <div class="avatar" @click="clickAvatar(item.uid)">
              <div class="img-wrapper">
                <img v-if="item.avatar" :src="item.avatar" alt="">
                <img v-else src="../../assets/avatar@3x.png" alt="">
              </div>
              <div v-if="item.authStatus" class="auth">
                <img src="../../assets/auth@3x.png" alt="">
              </div>
            </div>
            <div class="right">
              <div class="desc">
                <div class="left" @click="showComment">
                  <div class="name">{{item.nickName}}</div>
                  <div class="time">{{item.createDateStr}}</div>
                </div>
                <div class="zan" @click="clickZan({index: index, likeStatus: item.likeStatus, destCommentId: item.id.toString(), destUid: item.uid})">
                  <img v-if="item.likeStatus" src="../../assets/zan_active@3x.png" alt="">
                  <img v-else src="../../assets/zan@3x.png" alt="">
                  <span>{{item.likeTotal > 9999 ? item.likeTotalStr : item.likeTotal}}</span>
                </div>
              </div>

              <div class="content" @click="showComment">{{item.contComment}}</div>
              <div class="at-comment" @click="showComment" v-if="item.destNickName && item.destComment">{{item.destNickName}} ： {{item.destComment}}</div>
            </div>
          </div>
          <p class="tips" @click="showComment">
            查看全部{{cntComment}}条评论
          </p>
          <p class="end">
            - END -
          </p>
        </div>
        <p v-else class="empty" @click="showComment">快来发表你的评论吧~</p>
      </div>
    </div>
  </div>
</template>

<script>
// 引入按钮水波纹指令
import waves from '@/directive/waves'
// 引入播放器
import xgPlayer from '@/components/XgPlayer'
// 引入Api
import { addUserbrowseCntApi, commentListApi, followApi, cancelLikeCommentApi, likeCommentApi, contInfoApi } from '@/api/detail'
// 引入工具函数判断平台
import { isAndroid, isIOS } from '@/utils/platform'
// 引入删除页，审核不通过页面，加载异常，网络异常
import contDeleted from '@/components/ErrorPage/contDeleted'
import contUnpass from '@/components/ErrorPage/contUnpass'
import contError from '@/components/ErrorPage/contError'
import netError from '@/components/ErrorPage/netError'
// 引入loading
import Loading from '@/components/Loading'
export default {
  computed: {
    maxHeight () {
      return document.documentElement.clientHeight + 'px' // 最大高度屏幕高度
      // return 435 / 335 * document.documentElement.clientWidth / parseFloat(document.getElementsByTagName('html')[0].style.fontSize) + 'rem'
    },
    clientWidth () {
      return parseFloat(document.documentElement.clientWidth)
    },
    rootfontSize () {
      return parseFloat(document.getElementsByTagName('html')[0].style.fontSize)
    }
  },
  data () {
    return {
      contId: '',
      uid: '',
      isLoading: false,
      isContDeleted: false,
      isContError: false,
      isContUnpass: false,
      isNetError: false,
      player: {
        url: '',
        autoplay: false,
        poster: '',
        height: ''
      },
      // swiper的配置
      swiperOption: {
        autoHeight: true, // 自动赋值高度
        loop: false, // 循环播放
        effect: 'fade', // 切换swiper-slide的效果
        fadeEffect: {
          crossFade: true
        }
      },
      isLogin: 0,
      info: {
        uid: null,
        avatar: '',
        nickName: '',
        org: '',
        authTitle: '',
        isAuth: 0, // 认证标记
        isFollow: 0, // 是不是关注
        isOwner: 0, // 是不是作者
        publishDateStr: '',
        cntRead: 0,

        images: [], // swiper的列表
        text: '', // 状态的内容

        title: '',
        cover: { // 文章的封面图
          src: '',
          width: '100%',
          height: 'auto'
        },
        content: ''
      },
      isCopyRightShow: true,
      cared: false,
      isVideo: false,
      isStatus: false,
      isArticle: !false,
      cntComment: 0,
      commentList: []
    }
  },
  mounted () {
    this.contId = this.$route.query.contId
    this.uid = this.$route.query.uid
    if (this.contId && this.uid) {
      this.requestCommentList()
      this.requestDetail()
      this.handleAddUserbrowseCnt()
    } else {
      this.$vux.toast.text('参数缺失')
    }
  },
  methods: {
    showComment () {
      if (isAndroid()) {
        try {
          window.glamor.showComment()
        } catch (error) {
          console.log(error)
        }
      } else if (isIOS()) {
        try {
          this.$device.JsBridge.callHandler('h5ShowComment', {}, (data) => {
            // 返回APP端给回的data
            console.log(data)
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
    clickAvatar (uid) {
      console.log(uid)
      if (isAndroid()) {
        try {
          window.glamor.clickAvatar(uid.toString())
        } catch (error) {
          console.log(error)
        }
      } else if (isIOS()) {
        try {
          this.$device.JsBridge.callHandler('h5ClickAvatar', {uid: uid.toString()}, (data) => {
            // 返回APP端给回的data
            console.log(data)
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
    clickCared () {
      // 参数不够，返回
      if (!this.uid || !this.info.uid) {
        return
      }
      // 判断没有登陆
      if (this.isLogin == 0) {
        if (isAndroid()) {
          try {
            window.glamor.login()
          } catch (error) {}
        } else if (isIOS()) {
          try {
            this.$device.JsBridge.callHandler('h5Login', {}, (data) => {})
          } catch (error) {}
        }
        return
      }
      if (this.info.isFollow !== 1) {
        followApi({fromUid: this.uid, toUid: this.info.uid})
          .then(res => {
            if (res.data.code === 2000) {
              this.info.isFollow = 1
            }
          })
          .catch(e => {
          })
      }
    },
    clickZan (obj) {
      // 参数不够，返回
      if (!this.uid || !this.contId || !obj.destCommentId || !obj.destUid) {
        return
      }
      // 判断没有登陆
      if (this.isLogin == 0) {
        if (isAndroid()) {
          try {
            window.glamor.login()
          } catch (error) {
            console.log(error)
          }
        } else if (isIOS()) {
          try {
            this.$device.JsBridge.callHandler('h5Login', {}, (data) => {
              // 返回APP端给回的data
              console.log(data)
            })
          } catch (error) {
            console.log(error)
          }
        }
        return
      }

      // 判断不可给自己点赞
      if (this.uid == obj.destUid) {
        this.$vux.toast.text('暂无此操作权限')
        return
      }
      if (!obj.likeStatus) {
        if (this.commentList[obj.index].likeTotal * 1 < 9998) {
          this.commentList[obj.index].likeTotal += 1
        }
        this.commentList[obj.index].likeStatus = 1
        likeCommentApi({contId: this.contId, uid: this.uid, destCommentId: obj.destCommentId, destUid: obj.destUid})
          .then(data => {
            console.log(data.data)
          })
          .catch(_ => {
          })
      } else {
        if (this.commentList[obj.index].likeTotal > 0) {
          if (this.commentList[obj.index].likeTotal < 10000) {
            this.commentList[obj.index].likeTotal -= 1
          }
        }
        this.commentList[obj.index].likeStatus = 0
        cancelLikeCommentApi({contId: this.contId, uid: this.uid, destCommentId: obj.destCommentId, destUid: obj.destUid})
          .then(data => {
            console.log(data.data)
          })
          .catch(_ => {
          })
      }
    },
    // 请求评论列表
    requestCommentList () {
      let obj = {
        pageNum: 1,
        uid: this.uid,
        lastTimeMillis: new Date().getTime(),
        contId: this.contId
      }
      commentListApi(obj)
        .then(res => {
          const data = res.data
          if (data.code === 2000) {
            const array = []
            data.data.forEach(item => {
              let obj = {}
              obj.id = item.id // 评论的id
              obj.uid = item.uid
              obj.avatar = ''
              var img = new Image()
              img.src = item.avatar
              img.onload = function () {
                obj.avatar = item.avatar
              }
              obj.nickName = item.nickName

              obj.authStatus = item.authStatus // 认证状态
              obj.createDateStr = item.createDateStr
              obj.likeStatus = item.likeStatus // 是否点赞
              obj.likeTotal = item.likeTotal ? item.likeTotal * 1 : 0
              obj.likeTotalStr = item.likeTotalStr
              obj.destNickName = item.destNickName
              obj.destComment = item.destComment // 被评论内容
              obj.destUid = item.destUid // 评论的uid
              obj.contComment = item.contComment
              array.push(obj)
            })
            this.commentList = array.splice(0, 3)
            this.cntComment = res.data.totalNum
          } else {
            this.$vux.toast.hide()
          }
        })
        .catch(_ => {
          this.$vux.toast.hide()
        })
    },
    // 请求文章详情
    requestDetail () {
      this.isLoading = true
      let _this = this
      contInfoApi({contId: this.contId, uid: this.uid})
        .then(res => {
          if (res.data.code === 2000) {
            if (res.data.data.delStatus === 0) {
              if (res.data.data.contStatus === 3 && this.uid !== res.data.data.uid) {
                this.isContUnpass = true
              } else {
                this.isLogin = res.data.data.isLogin
                this.info.cntFansStr = res.data.data.cntFansStr
                this.info.cntReadStr = res.data.data.cntReadStr
                this.info.uid = res.data.data.uid
                this.info.isOwner = res.data.data.isOwner
                // 对头像做onload
                this.info.avatar = ''
                var img = new Image()
                img.src = res.data.data.avatar
                img.onload = function () {
                  _this.info.avatar = res.data.data.avatar
                }
                this.info.nickName = res.data.data.nickName
                this.info.isFollow = res.data.data.isFollow
                this.info.isAuth = res.data.data.isAuth
                this.info.org = res.data.data.org
                this.info.authTitle = res.data.data.authTitle
                this.info.publishDateStr = res.data.data.publishDateStr
                // 这是状态
                if (res.data.data.contType === 0) {
                  this.isCopyRightShow = false
                  this.isStatus = true
                  this.isArticle = false
                  let content = {}
                  try {
                    content = JSON.parse(res.data.data.content)
                    // 这是有video的
                    if (res.data.data.timelineType == 1) {
                      this.isVideo = true
                      this.player.url = content.video.src
                      this.player.height = content.video.height / content.video.width * this.clientWidth / this.rootfontSize + 'rem'
                      console.log(this.player)
                      try {
                        var coverSrcObj = JSON.parse(res.data.data.coverSrc)
                        this.player.poster = coverSrcObj.src
                        var _img = new Image()
                        _img.src = coverSrcObj.src
                        _img.onload = function () {
                          _this.isLoading = false
                        }
                        _img.onerror = function () {
                          _this.isLoading = false
                          _this.isContError = true
                        }
                      } catch (e) {}
                      this.player.time = res.data.data.time
                    } else if (res.data.data.timelineType == 0) {
                      let array = []
                      console.log(content.images)
                      content.images.forEach((item, index) => {
                        let obj = {}
                        obj.src = item.src
                        obj.width = '100%'
                        obj.height = item.height / item.width * this.clientWidth / this.rootfontSize + 'rem'
                        console.log('height', item.height, 'clientWidth', this.clientWidth, 'wdith', item.width, 'obj.height', obj.height)
                        array.push(obj)
                      })
                      // 判断轮播中的图片有一张加载成功，就关闭loading
                      var length = array.length
                      if (length == 0) {
                        _this.isLoading = false
                      }
                      array.forEach(item => {
                        var IMG = new Image()
                        IMG.src = item.src
                        IMG.onload = function () {
                          length--
                          if (length != array.length) {
                            _this.isLoading = false
                          } else {
                            _this.isLoading = false
                            _this.isContError = true
                          }
                        }
                      })
                      this.info.images = array
                      console.log(this.info.images)
                    }
                    this.info.text = content.text
                  } catch (error) {}
                // 这是文章
                } else if (res.data.data.contType === 1) {
                  this.isCopyRightShow = true
                  this.isArticle = true
                  this.info.title = res.data.data.title
                  try {
                    let coverObj = JSON.parse(res.data.data.coverSrc)
                    console.log(coverObj)
                    let obj = {}
                    obj.src = coverObj.src
                    var img1 = new Image()
                    img1.src = coverObj.src
                    img1.onload = function () {
                      _this.isLoading = false
                    }
                    img1.onerror = function () {
                      _this.isLoading = false
                      _this.isContError = true
                    }
                    obj.width = '100%'
                    obj.height = coverObj.height / coverObj.width * this.clientWidth / this.rootfontSize + 'rem'
                    this.info.cover = obj
                    this.info.content = res.data.data.content
                  } catch (error) {}
                } else {
                  this.isLoading = false
                  this.isContError = true
                }
              }
            } else {
              this.isLoading = false
              this.isContDeleted = true
            }
          } else {
            this.isLoading = false
            this.isContError = true
          }
        })
        .catch(e => {
          this.isLoading = false
          this.isNetError = true
        })
    },
    // 添加用户浏览数
    handleAddUserbrowseCnt () {
      addUserbrowseCntApi({uid: this.uid, contId: this.contId})
    }
  },
  components: {
    'xg-player': xgPlayer,
    Loading,
    contDeleted,
    contError,
    contUnpass,
    netError
  },
  directives: {
    waves
  }
}
</script>

<style scoped>
.content-wrapper>>>p {
  white-space: pre-line;
  word-break: break-all;
  text-align: left;
  font-size: 16px;
  line-height: 26px;
}
.content-wrapper>>>img {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<style lang='less' scoped>
.rootEl{
  overflow: scroll;
}
.video-wrapper{
  width: 100%;
  background: #000;
}
.swiper-wrapper{
  height: auto;
  .slide-item{
    height: auto;
    overflow: hidden;
    // max-height: 11.6rem;
    background: #000;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    width: 100%;
    img{
      width: 100%;
    }
    .pagination{
      position: absolute;
      right: 15px;
      bottom: 15px;
      color: #ffffff;
      font-size: 14px;
      line-height: 12px;
    }
  }
}
.banner-wrapper{
  height: auto;
  width: 100%;
  overflow: hidden;
  background: #000;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  img{
    display: block;
    width: 100%;
  }
}
.article-title{
  padding: 0 20px;
  margin-top: 20px;
  white-space: pre-line;
  word-break: break-all;
  font-size: 20px;
  color: #2A2A2A;
}
.author-wrapper{
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  overflow: hidden;
  display: flex;
  .author-img{
    flex: 0 0 40px;
    position: relative;
    width: 40px;
    height: 40px;
    float: left;
    .img-wrapper{
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .auth{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 14px;
      height: 14px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .author-info{
    flex: 1;
    margin-left: 10px;
    width: calc(100% - 100px);
    .name{
      font-size: 14px;
      color: #222222;
      letter-spacing: 0;
      text-align: left;
      height: 14px;
    }
    .desc{
      margin-top: 8px;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
  }
  .attention-button{
    flex: 0 0 60px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #FF5A5F;
    letter-spacing: 0;
    text-align: center;
    background: rgba(254, 248, 255);
    border-radius: 4px;
    box-sizing: border-box;
    &.active {
      background: #fff;
      border: 1px solid #CCCCCC;
      color: #ccc;
    }
  }
}
.content-wrapper{
  padding: 20px;
  font-size: 15px;
  color: #2A2A2A;
  letter-spacing: 0;
  line-height: 26px;
}
.content-info{
  padding:0 20px;
  overflow: hidden;
  p{
    font-size: 12px;
    color: #CCCCCC;
    letter-spacing: 0;
    text-align: left;
    line-height: 12px;
  }
  .time{
    float: left;
  }
  .read{
    float: right;
  }
  .copyright{
    margin-top: 15px;
    font-size: 12px;
    line-height: 18px;
    color: #CCCCCC;
    letter-spacing: 0;
    text-align: left;
  }
}
.divider{
  margin: 20px 20px 0;
  border-top: 1px solid #f2f2f2;
  height: 0;
}
.comment-wrapper{
  padding: 20px;
  .title{
    font-size: 17px;
    color: #2A2A2A;
    letter-spacing: -0.41px;
    line-height: 17px;
  }
  .empty{
    font-size: 12px;
    color: #CCCCCC;
    letter-spacing: 0;
    text-align: center;
    line-height: 100px;
    height: 100px;
  }
  .comment-list{
    .comment-item{
      margin-top: 20px;
      display: flex;
      .avatar{
        position: relative;
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        text-align: center;
        .img-wrapper{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .auth{
          position: absolute;
          right: 0;
          bottom: 0;
          width: 14px;
          height: 14px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .right{
        flex: 1;
        margin-left: 15px;
        .desc{
          display: flex;
          .left{
            flex: 1;
            .name{
              font-size: 14px;
              color: #2A2A2A;
              letter-spacing: 0;
              line-height: 22px;
              height: 22px;
            }
            .time{
              font-size: 12px;
              color: #999999;
              letter-spacing: 0;
              height: 18px;
              line-height: 18px;
            }
          }
          .zan{
            display: flex;
            flex: 0 0 0;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            color: #4D4D4D;
            letter-spacing: 0;
            img{
              display: inline-block;
              width: 22px;
              height: 22px;
              margin-right: 5px;
            }
          }
        }
        .content{
          font-size: 14px;
          color: #2A2A2A;
          letter-spacing: 0;
          text-align: left;
          line-height: 22px;
          margin-top: 5px;
        }
        .at-comment{
          padding-left: 15px;
          margin-top: 10px;
          font-size: 14px;
          color: #999999;
          letter-spacing: 0;
          text-align: left;
          line-height: 14px;
          border-left: 2px solid #999999;
        }
      }
    }
    .tips{
      height: 60px;
      line-height: 60px;
      margin-top: 20px;
      font-size: 12px;
      color: #CCCCCC;
      letter-spacing: 0;
      text-align: center;
    }
    .end{
      margin-top: 40px;
      margin-bottom: 30px;
      font-size: 12px;
      color: #2A2A2A;
      letter-spacing: 0;
      text-align: center;
      line-height: 12px;
    }
  }
}

</style>
