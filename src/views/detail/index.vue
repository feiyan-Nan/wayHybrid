<template>
  <div :class="{rootEl: isFixed}" v-cloak>
    <Loading v-if="isLoading"></Loading>
    <contDeleted v-else-if="isContDeleted"></contDeleted>
    <!-- 内容加载异常 -->
    <contError v-else-if="isContError"></contError>
    <!-- 该内容未通过审核 -->
    <contUnpass v-else-if="isContUnpass"></contUnpass>
    <netError v-else-if="isNetError"></netError>
    <div v-else>
<!--      <div v-if="isVideo" class="video-wrapper">-->
<!--        <xg-player id="player"-->
<!--          :url="player.url"-->
<!--          :height = "player.height"-->
<!--          :autoplay="player.autoplay"-->
<!--          :poster="player.poster"-->
<!--          :uid="uid"-->
<!--          :isInApp="true"-->
<!--          ref="xgplayer"-->
<!--          >-->
<!--        </xg-player>-->
<!--      </div>-->
      <!-- 有视频 end -->
      <!-- 是状态 且有轮播图 -->
      <div v-if="isStatus && info.images.length > 1" class="swiper-wrapper">
        <swiper id='swiper' class='swiper' ref='swiper' :options='swiperOption'>
          <swiper-slide v-for='(item, index) in info.images' :key="index">
            <div class="slide-item" :style="{height: item.height > maxHeight ? maxHeight + 'rem': item.height + 'rem', width: '100%'}" >
              <img v-lazy="item.src" @click="handleBannerClick(index)"  width="100%">
              <p class="pagination" v-if="info.images && info.images.length > 1">{{index +1}}/{{info.images.length}} </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <!-- 是状态并且只有一张图 -->
      <div @click="handleBannerClick(1)" v-if="isStatus && info.images.length == 1" class="banner-wrapper" :style="{maxHeight: maxHeight + 'rem', width: '100%'}">
        <img v-lazy="info.images[0].src" alt="" :style="{height: info.images[0].height + 'rem'}">
      </div>
      <!-- 是文章展示的图 -->
      <div v-if="isArticle" class="banner-wrapper" :style="{maxHeight: maxHeight + 'rem'}">
        <img v-lazy="info.coverSrc" alt="" :style="{height: info.coverHeight}">
      </div>
      <!-- 是文章并且有标题 -->
      <div v-if="isArticle && info.title">
        <p class="article-title">{{info.title}}</p>
        <div class="bar-small"></div>
      </div>
      <!-- 用户头像和用户名发布时间 -->
      <publish-time :userinfo="info" @clickAvatar="clickAvatar" />
      <div class="content-wrapper" id="content-wrapper">
        <!-- 这是状态现实的内容 st-->
        <p v-if="isStatus">{{info.text}}</p>
        <!-- 这是状态现实的内容 end -->
        <!-- 这是文章现实的内容  st -->
        <div v-if="isArticle">
          <!-- 如果是数组结构，启动懒加载写法(目前还没有用到) -->
          <template v-if="info.contentArray && info.contentArray.length">
            <p v-for="(item,index) in info.contentArray" :key="index" >
              <span v-if="item.type =='text'" v-html="item.cont"></span>
              <img v-if="item.type == 'img'" v-lazy="item.src" width="100%" :height="(clientWidth - 40) / item.width * item.height">
            </p>
          </template>
          <!-- 如果不是数组结构，直接显示 -->
          <template v-else>
            <div v-html="info.content"></div>
          </template>
        </div>
        <!-- 这是文章现实的内容 end -->
      </div>
      <div class="content-info">
        <p class="read">{{info.cntReadStr}} {{isVideo ? '播放' : '阅读'}}</p>
        <div class="clearfix"></div>
        <p class="copyright" v-if="isCopyRightShow">
          本文版权归该作者所有，任何形式转载请联系作者。本文仅代表作者个人观点，不代表本平台的立场
        </p>
      </div>
      <!-- <div class="divider"></div> -->
      <!-- 用户信息和关注按钮 -->
      <div>
        <user-info :userinfo="info" @clickAvatar="clickAvatar" @clickCared="clickCared"></user-info>
      </div>
      <div></div>
      <!-- 评论 -->
      <comment-list @showComment="showComment" @clickLike="clickLike" @clickAvatar="clickAvatar" :cntComment="cntComment" :commentList="commentList"/>
    </div>
    <fade-animation>
      <common-gallary
      v-if="showGallary"
      @close="handleGallaryClose"
      :pictrueIndex="pictrueIndex"
      :imgUrls="info.images">
      </common-gallary>
    </fade-animation>
    <!-- 文章中图片点击放大 -->
    <fade-animation>
      <common-gallary
      v-if="showArticleImg"
      @close="handleGallaryClose"
      :pictrueIndex="pictrueIndex"
      :imgUrls="info.articleImg">
      </common-gallary>
    </fade-animation>
  </div>
</template>

<script>
// 引入按钮水波纹指令
import waves from '@/directive/waves'
// 引入播放器
// import xgPlayer from '@/components/XgPlayer'
// 引入Api
import { addUserbrowseCntApi, commentListApi, followApi, cancelLikeCommentApi, likeCommentApi, contInfoApi } from '@/api/detail'
// 引入工具函数判断平台
import { isAndroid, isIOS } from '@/utils/platform'
// 引入删除页，审核不通过页面，加载异常，网络异常
import contDeleted from '@/components/ErrorPage/contDeleted'
import contUnpass from '@/components/ErrorPage/contUnpass'
import contError from '@/components/ErrorPage/contError'
import netError from '@/components/ErrorPage/netError'
import CommonGallary from '@/components/common/gallary/Gallary'
import FadeAnimation from '@/components/common/fade/FadeAnimation'
import UserInfo from '@/components/common/userinfo/UserInfo'
import PublishTime from '@/components/common/userinfo/PublishTime'
import CommentList from '@/components/common/userinfo/CommentList'
// 引入loading
import Loading from '@/components/Loading'
// 引入评论的封装
import {comment, Article} from '@/utils/constant'
import blockImg from '../../assets/img_block.png'
import avatar from '@/components/AVATAR/'
export default {
  components: {
    // 'xg-player': xgPlayer,
    Loading,
    contDeleted,
    contError,
    contUnpass,
    netError,
    avatar,
    CommonGallary,
    FadeAnimation,
    UserInfo,
    PublishTime,
    CommentList
  },
  computed: {
    maxHeight () {
      return document.documentElement.clientHeight / this.rootfontSize // 最大高度屏幕高度
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
      isFixed: true,
      showArticleImg: false,
      showGallary: false,
      pictrueIndex: 1,
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
        width: Math.trunc(document.documentElement.clientWidth),
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
        beFollowed: 0,
        isOwner: 0, // 是不是作者
        publishDateStr: '',
        cntRead: 0,
        quality: 0,
        images: [], // swiper的列表
        text: '', // 状态的内容

        title: '', // 标题
        coverSrc: '', // 文章的封面图
        coverWidth: '100%', // 文章的封面图的宽高
        coverHeight: '',
        contentArray: [],
        content: '',
        articleImg: []// 文章中的图片组成的数组
      },
      isCopyRightShow: true,
      cared: false,
      isVideo: false,
      isStatus: false,
      isArticle: false,
      cntComment: 0,
      commentList: []
    }
  },
  mounted () {
    // url上获取contId
    this.contId = this.$route.query.contId
    // url获取当前登录的uid
    // 没有登录时
    // 安卓传递过来的是"f45675bdf022be9cdb3007cf8659caee"
    // ios传递过来的是 "(null)"
    this.uid = this.$route.query.uid
    console.log('传递了uid', this.uid)
    console.log('传递了contId', this.contId)
    console.log('访问路径', window.location.href)
    console.log('获取网页的宽度:', document.documentElement.clientWidth)
    if (this.contId && this.uid) {
      this.requestCommentList()
      this.requestDetail()
      // 增加浏览量
      this.handleAddUserbrowseCnt()
    } else {
      this.$vux.toast.text('参数缺失')
    }
    // // url上获取当前的contType
    // const contType = this.$route.query.contType
    // if (contType == 0) {
    //   this.isStatus = true
    // } else if (contType == 1) {
    //   this.isArticle = true
    // }
    // // url上获取当前的timeLineType
    // const timelineType = this.$route.query.timelineType
    // if (timelineType == 1) {
    //   this.isVideo = true
    // }

    // // url上获取的宽高
    // const width = this.$route.query.width
    // const height = this.$route.query.height

    // // 现在mounted中根据url上取到的参数计算出高度，赋值给图片或者视频，在请求中再次计算高度，赋值给图片或者视频
    // if (width && height) {
    //   console.log(this.isStatus)
    //   if (this.isArticle) {
    //     this.info.coverHeight = height / width * this.clientWidth / this.rootfontSize + 'rem'
    //     console.log('this.info.cover.height' + this.info.coverHeight)
    //     this.player.height = height / width * this.clientWidth / this.rootfontSize + 'rem'
    //   } else if (this.isStatus && timelineType == 0) {
    //     this.info.images = [{height: height / width * this.clientWidth / this.rootfontSize, src: ''}]
    //   }
    // }
    // console.log('contType:' + contType + ',timelineType:' + timelineType + ',width:' + width + ',height:' + height)
  },
  methods: {
    handleBtn () {
      console.log('报名')
    },
    clickArticleImg (index) {
      this.showArticleImg = true
      this.pictrueIndex = index
      this.isFixed = false
    },
    handleBannerClick (index) {
      this.pictrueIndex = index
      this.showGallary = true
      this.isFixed = false
    },
    handleGallaryClose () {
      this.showGallary = false
      this.showArticleImg = false
      this.isFixed = true
    },
    // 调起原生的显示评论
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
    // 点击用户头像跳到用户主页
    clickAvatar (uid) {
      console.log(uid)
      if (isAndroid()) {
        try {
          window.glamor.clickAvatar(uid.toString())
        } catch (error) {
          console.log(error)
        }
      }
      if (isIOS()) {
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
    follow () {
      if (this.info.isFollow !== 1) {
        followApi({fromUid: this.uid, toUid: this.info.uid})
          .then(res => {
            if (res.data.code === 2000) {
              this.info.isFollow = 1
              this.info.cntFansStr = Number(this.info.cntFansStr) + 1
              // 如果接口返回成功,就告知ios和android去改变状态
              if (isAndroid()) {
                try {
                  window.glamor.H5ClickCared(this.info.uid, this.info.isFollow)
                } catch (error) {
                  console.log(error)
                }
              } else if (isIOS()) {
                try {
                  this.$device.JsBridge.callHandler('H5ClickCared', {uid: this.info.uid, status: 1}, (data) => {})
                } catch (error) {
                  console.log(error)
                }
              }
            }
          })
          .catch(e => {
          })
      }
    },
    androidGetUid (uid) {
      console.log('安卓传参', uid)
      this.uid = uid
      this.clickCared()
    },
    clickCared () {
      console.log('clickCared', this.uid)
      console.log('clickCared', this.info.uid)
      // 参数不够，返回
      if (!this.uid || !this.info.uid) {
        return
      }
      // 判断没有登陆
      if (this.isLogin == 0) {
        if (isAndroid()) {
          try {
            window.androidGetUid = (uid) => {
              console.log('安卓window', uid)
              this.uid = uid
              this.isLogin = 1
              if (this.info.uid == this.uid) {
                this.info.isOwner = 1
                return
              }
              contInfoApi({contId: this.contId, uid: this.uid}).then((res) => {
                if (res.data.code === 2000) {
                  console.log('最新请求', res.data.data)
                  // this.info.beFollowed !== 0 && this.info.isFollow !== 0
                  this.info.beFollowed = res.data.data.beFollowed
                  this.info.isFollow = res.data.data.isFollow
                  if (this.info.beFollowed !== 0 && this.info.isFollow !== 0) {
                    return
                  }
                  this.clickCared()
                }
              })
            }
            window.glamor.login()
          } catch (error) {}
        } else if (isIOS()) {
          try {
            this.$device.JsBridge.callHandler('h5Login', {}, (data) => {
              if (data.result !== '') {
                this.isLogin = 1
                this.uid = data.result
                if (this.info.uid == this.uid) {
                  this.info.isOwner = 1
                  return
                }

                contInfoApi({contId: this.contId, uid: this.uid}).then((res) => {
                  if (res.data.code === 2000) {
                    console.log('最新请求', res.data.data)
                    // this.info.beFollowed !== 0 && this.info.isFollow !== 0
                    this.info.beFollowed = res.data.data.beFollowed
                    this.info.isFollow = res.data.data.isFollow
                    if (this.info.beFollowed !== 0 && this.info.isFollow !== 0) {
                      return
                    }
                    this.clickCared()
                  }
                })
              }
            })
          } catch (error) {}
        }
      }
      this.follow()
    },
    // 判断是否登录
    login () {
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
        return false
      } else {
        return true
      }
    },
    clickLike (commentItem, index) {
      console.log('评论', commentItem)
      console.log(this.commentList[index])
      // 如果登陆了
      console.log(this.login())
      if (!this.login()) {
        return
      }
      // 判断不可给自己点赞
      if (this.uid == commentItem.uid) {
        this.$vux.toast.text('暂无此操作权限')
        return
      }
      const args = {contId: this.contId, uid: this.uid, destCommentId: commentItem.id, destUid: commentItem.uid}
      if (!commentItem.likeStatus) {
        if (commentItem.likeTotal * 1 < 9998) {
          // 为了用户体验更好,先将状态变了
          commentItem.likeTotal++
          commentItem.likeStatus = 1
        }
        likeCommentApi(args)
          .then(res => {
            if (res.data.code !== 2000) {
              commentItem.likeTotal -= 1
              commentItem.likeStatus = 0
              this.$vux.toast.text('点赞失败了')
            }
          })
          .catch(error => {
            console.log(error)
            // 如果失败了,就将点赞取消
            commentItem.likeTotal -= 1
            commentItem.likeStatus = 0
            this.$vux.toast.text('点赞失败了')
          })
      } else {
        if (commentItem.likeTotal > 0 && commentItem.likeTotal < 10000) {
          commentItem.likeTotal--
          commentItem.likeStatus = 0
        }
        // 取消关注
        cancelLikeCommentApi(args)
          .then(res => {
            if (res.data.code !== 2000) {
              commentItem.likeTotal++
              commentItem.likeStatus = 1
              this.$vux.toast.text('取消点赞失败了')
            }
          })
          .catch(error => {
            console.log(error)
            commentItem.likeTotal++
            commentItem.likeStatus = 1
            this.$vux.toast.text('取消点赞失败了')
          })
      }
      // 数据更新
      this.commentList.splice(index, 1, commentItem)
    },
    // 请求评论列表
    requestCommentList () {
      commentListApi({pageNum: 1, uid: this.uid, lastTimeMillis: new Date().getTime(), contId: this.contId})
        .then(res => {
          if (res.data.code === 2000) {
            // 评论总数
            this.cntComment = res.data.totalNum - 0
            this.commentList = comment.getCommentList(res.data.data, 3)
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
          this.isLoading = false
          const result = res.data
          console.log(result, 123)
          if (result.code === 2000) {
            // 是否删除
            if (result.data.delStatus === 0) {
              // 该内容未通过审核
              if (result.data.contStatus === 3 && this.uid !== result.data.uid) {
                this.isContUnpass = true
              } else {
                this.isLogin = result.data.isLogin
                console.log('res.data.data', result.data)

                Object.assign(this.info, res.data.data)
                // 对头像做onload
                let img = new Image()
                img.src = res.data.data.avatar
                img.onload = function () {
                  _this.info.avatar = res.data.data.avatar
                }
                // 这是状态
                if (res.data.data.contType === 0) {
                  this.isCopyRightShow = false
                  this.isStatus = true
                  this.isArticle = false
                  this.isVideo = false
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
                      } catch (e) {
                        this.contError = true
                      }
                      this.player.time = res.data.data.time
                    } else if (res.data.data.timelineType == 0) {
                      let array = []
                      console.log(content.images)
                      content.images.forEach((item, index) => {
                        let obj = {}
                        obj.src = item.src
                        obj.width = '100%'
                        obj.height = item.height / item.width * this.clientWidth / this.rootfontSize // rem
                        // this.$vux.toast.text(item.width + '//' + item.height + '//' + this.clientWidth + '//' + obj.height)
                        obj.marginTop = (document.documentElement.clientHeight - obj.height * this.rootfontSize) / this.rootfontSize / 2
                        console.log('height', item.height, 'clientWidth', this.clientWidth, 'wdith', item.width, 'obj.height', obj.height)
                        array.push(obj)
                      })
                      this.info.images = array
                      console.log(this.info.images)
                    }
                    this.info.text = content.text
                  } catch (error) {
                    this.isContError = true
                  }
                } else if (res.data.data.contType === 1) {
                  this.isCopyRightShow = true
                  this.isArticle = true
                  this.isStatus = false
                  this.isVideo = false
                  this.info.title = res.data.data.title
                  try {
                    // 封面
                    let coverObj = JSON.parse(res.data.data.coverSrc)
                    this.info.coverSrc = coverObj.src
                    this.info.coverWidth = '100%'
                    this.info.coverHeight = coverObj.height / coverObj.width * this.clientWidth / this.rootfontSize + 'rem'
                  } catch (error) {
                    this.isContError = true
                  }
                  // try {
                  //   let content = JSON.parse(res.data.data.content)
                  //   if (content && Array.isArray(content)) {
                  //     this.info.contentArray = content
                  //   } else {
                  //     console.log('content is not array')
                  //     this.info.content = res.data.data.content
                  //   }
                  // } catch (error) {
                  this.info.content = res.data.data.content
                  this.info.articleImg = Article.htmlToArr(res.data.data.content, this.clientWidth, this.rootfontSize)
                  console.log(this.info.articleImg, 'UUUUUU')
                  // console.log(result12)
                  console.log('//////')
                  this.$nextTick(() => {
                    let imgs = $('#content-wrapper img')
                    for (let i = 0; i < imgs.length; i++) {
                      let oSrc = imgs.eq(i).attr('src')
                      let oW = imgs.eq(i).attr('width')
                      let oH = imgs.eq(i).attr('height')
                      console.log(oW + '//' + oH)
                      imgs.eq(i).attr('src', blockImg)
                      var iH = parseInt(oH / oW * (this.clientWidth - 40))
                      imgs.eq(i).css({width: '100%', height: iH + 'px'})
                      console.log(i)
                      imgs.eq(i).click(function () {
                        _this.clickArticleImg(i)
                      })
                      let Img = new Image()
                      Img.src = oSrc
                      Img.onload = () => {
                        imgs.eq(i).attr('src', oSrc)
                      }
                    }
                  })
                  // }
                } else {
                  this.isContError = true
                }
              }
            } else {
              this.isContDeleted = true
            }
          } else {
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
  directives: {
    waves
  }
}
</script>

<style scoped>
.content-wrapper >>> p {
  white-space: pre-line;
  word-break: break-all;
  text-align: left;
  font-size: 16px;
  line-height: 26px;
  margin-top: 10px;
}
.content-wrapper >>> img {
  width: 100%;
  height: auto;
  display: block;
}
</style>

<style lang='less' scoped>
@import './index';
</style>
