<template>
  <div class="activy-root">
<!--    <Loading v-if="isLoading"></Loading>-->
<!--    <contError v-else-if="isContError"></contError>-->
<!--    <netError v-else-if="isNetError"></netError>-->
    <div class="conten">
      <quick-loadmore ref="vueLoad"
        :bottom-method="handleBottom"
        :disable-top="true"
        :disable-bottom="false"
        :bottomDistance="80"
        style="margin-bottom: 50px;"
      >
        <AppHeaderBar slogan="上班族的邂逅神器" />
        <div class="topic">
          <img src="../../assets/way/huati2@2x.png"/>
          <img class="topic-title-pic" src="../../assets/way/#@2x.png"/>
          <div class="topic-title">搭讪</div>
          <div class="topic-number">256人<span>正在参与</span></div>
          <div class="attention">
            <img src="../../assets/way/+@2x.png"/>
            <span>关注</span>
          </div>
        </div>
        <Operate v-waves/>
        <Layer id="MASK" @closeMask="closeMask" style="display: none;"></Layer>
        <!-- 轮播或单张图 -->
        <div class="swipper-wrapper">
          <swiper id='swiper' class='swiper' ref='swiper' :options='swiperOption' v-if='swiperList.length > 1'>
            <swiper-slide v-for='(item, index) in swiperList' :key="index" >
              <div class="slide-item">
                <img :src="item">
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="oneImg" v-else>
            <img v-lazy="swiperList[0]" alt="">
          </div>
        </div>
        <title-and-info :isTopic="false" :info="info"></title-and-info>
        <div class="pd20">
          <div class="line"></div>
        </div>
        <template v-if="eventResult && eventResult.length">
          <div class="sub-title mr20">结果公布</div>
          <div class="pd20">
            <div class="async-cont">
              <p v-for="(v, k) in eventResult" :key="k">{{v}}</p>
            </div>
            <div class="line"></div>
          </div>
        </template>
        <template v-if="eventDescArray.length">
          <div class="sub-title mr20">话题详情</div>
          <div class="pd20">
            <div class="async-cont">
              <p v-for="(v, k) in eventDescArray" :key="k">{{v}}</p>
            </div>
            <div class="line"></div>
          </div>
        </template>
        <!-- 用户信息和关注按钮 -->
        <p class="sub-title mr20">话题发起人</p>
        <div class="user-info">
          <user-info @clickAvatar="clickAvatar" @clickCared="clickCared" :isBorder="false" :userinfo="info"></user-info>
        </div>
        <template v-if="info.partakeList && info.partakeList.length">
          <more-people :peopleList="info.partakeList" @doApp="doApp" />
          <div class="pd20 mr30"><div class="line"></div></div>
        </template>
        <template v-if="eventNotice">
          <div class="sub-title mr20">温馨提示</div>
          <div class="pd20">
            <div class="async-cont">
              <p v-for="(v, k) in eventNoticeArray" :key="k">{{v}}</p>
            </div>
          </div>
        </template>
        <div class="pd20"><div class="line"></div></div>
        <template v-if="loadList.length > 0">
          <div class="sub-title pdlr20">大家都在聊</div>
          <div v-for="(item, index) in loadList" :key="index">
            <div class="user-info">
              <user-info @clickAvatar="clickAvatar" @clickCared="clickCared" :isBorder="false" :userinfo="item"></user-info>
            </div>
            <div class="item-cont">
              <!-- 1张图 -->
              <!-- <p class="text">{{item.text}}</p> -->
              <div class="one-img" :class="item.vw > item.vh ? 'video-horizontal-size':''" v-if="item.imgList.length < 4">
                <p v-lazy:background-image="item.imgList[0].src"  @click="openApp"></p>
                <div class="play-btn" v-if="item.isVideo" @click="openApp">
                  <p class="img-wrap">
                    <img src="../../assets/video_btn.png" alt="">
                  </p>
                </div>
                <div class="play-time" v-if="item.isVideo" @click="openApp">
                  <p class="icon">
                    <img src="../../assets/voice@3x.png" alt="">
                  </p>
                  {{item.time | timeF}}
                </div>
                <div class="quality" v-if="item.quality > 0" @click="openApp">
                  <img src="../../assets/jing.png" alt="">
                </div>
              </div>
              <div class="more-img" v-if="item.imgList.length >= 4">
                <div class="quality" v-if="item.quality > 0" @click="openApp">
                  <img src="../../assets/jing.png" alt="">
                </div>
                <div class="img-wrap" v-for="idx in 4" :key="'n' + idx" :class="idx % 2 == 1 ? '' : 'img-wrap-mgl'">
                  <p v-lazy:background-image="item.imgList[idx -1].src"  @click="openApp"></p>
                </div>
              </div>
            </div>
            <div class="item-info">
              <item-info :itemInfo="item" @doApp="doApp"></item-info>
            </div>
            <div class="pad-block"></div>
          </div>
        </template>
      </quick-loadmore>
      <!-- 活动没开始，这里不能分享，所以这里只有晒图或报名的状态 -->
      <div class="footer" @click="openApp">{{eventStatus == 1 ? '参加' : '已结束'}}</div>
    </div>
  </div>
</template>

<script>
import { H5OpenApp, isWeixinBrowser } from '@/utils/openApp'
import AppHeaderBar from '@/components/AppHeaderBar'
import Layer from '@/components/layer'
import Loading from '@/components/Loading'
import { getEventDetailApi, getContListApi } from '@/api/topic'
import contError from '@/components/ErrorPage/contError'
import netError from '@/components/ErrorPage/netError'
// import avatarImg from '../../assets/avatar@3x.png'
import TitleAndInfo from '@/views/shareActivity/components/TitleAndInfo'
import UserInfo from '@/components/common/userinfo/UserInfo'
import MorePeople from '@/components/common/userinfo/MorePeople'
import ItemInfo from '@/views/shareActivity/components/ItemInfo'
import Operate from '@/components/common/operate'
export default {
  components: {
    AppHeaderBar,
    Operate,
    Layer,
    Loading,
    contError,
    netError,
    TitleAndInfo,
    UserInfo,
    MorePeople,
    ItemInfo
  },
  data () {
    return {
      swiperOption: {
        watchOverflow: true,
        autoHeight: true, // 自动赋值高度
        loop: true, // 循环播放
        effect: 'slide', // 切换swiper-slide的效果
        // autoplay: {
        //   delay: 6000,
        //   disableOnInteraction: false
        // },
        autoplay: 3000,
        noSwiping: false,
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        }
      },
      originalTime: null,
      eventId: '',
      pageNum: 1,
      isLoading: false,
      isNetError: false,
      isContError: false,
      isHandleBottom: false,
      swiperList: [],
      title: '',
      eventDateStr: '',
      eventAddress: '',
      pointStr: '',
      avatar: '',
      isAuth: 0,
      nickName: '',
      authTitle: '',
      cntFansStr: '',
      eventDesc: '',
      eventDescArray: [],
      eventNotice: '',
      eventNoticeArray: [],
      loadList: [],
      eventStatus: 1,
      info: {},
      eventResult: []
    }
  },
  mounted () {
    console.log(this.loadList, 'hahhah')
    let eventId = this.$route.query.eventId
    let account = this.$route.query.account || 0
    if (eventId) {
      this.originalTime = new Date().getTime()
      this.eventId = eventId
      this.getCont({eventId, account})
      this.getList({account, eventId: this.eventId, pageNum: this.pageNum, originalTime: this.originalTime})
    } else {
      this.$vux.toast.text('参数错误')
    }
  },
  methods: {
    clickCared () {
      this.shareActivity()
    },
    clickAvatar () {
      this.shareActivity()
    },
    doApp () {
      this.shareActivity()
    },
    // 分享
    shareActivity () {
      window.location.href = 'http://url.cn/553SnHV'
    },
    handleBottom () {
      this.isHandleBottom = true
      this.pageNum += 1
      this.getList({account: '0', eventId: this.eventId, pageNum: this.pageNum, originalTime: this.originalTime})
    },
    getList (obj) {
      getContListApi(obj)
        .then(res => {
          if (res.data.code == 2000) {
            res.data.data.forEach(item => {
              if (item.contStatus == 2) {
                let obj = {}
                obj.nickName = item.nickName
                obj.authTitle = item.authTitle
                obj.org = item.org
                obj.isAuth = item.isAuth
                obj.cntFansStr = item.cntFansStr
                // 懒加载的配置  单独出来的头像
                // obj.avatar = {
                //   src: item.avatar,
                //   error: avatarImg,
                //   loading: avatarImg
                // }
                obj.avatar = item.avatar
                obj.publishDateStr = item.publishDateStr
                obj.cntCommentStr = item.cntCommentStr
                obj.cntLikeStr = item.cntLikeStr
                obj.quality = item.quality
                Object.assign(obj, item)
                // 这是状态
                if (item.contType == 0) {
                  // 图
                  if (item.timelineType == 0) {
                    let contentStr = item.content
                    obj.isVideo = false
                    try {
                      let contObj = JSON.parse(contentStr)
                      obj.text = contObj.text
                      obj.imgList = contObj.images
                      // 只有try成功才能进入列表
                      this.loadList.push(obj)
                    } catch (error) {
                      console.log(error)
                    }
                  // 视频
                  } else if (item.timelineType == 1) {
                    let contentStr = item.content
                    obj.isVideo = true
                    let try1 = false
                    let try2 = false
                    try {
                      let contObj = JSON.parse(contentStr)
                      obj.time = contObj.video.time
                      obj.text = contObj.text
                      obj.vw = contObj.video.width
                      obj.vh = contObj.video.height
                      try1 = true
                    } catch (error) {
                      console.log(error)
                    }
                    let coverSrc = item.coverSrc
                    try {
                      let coverSrcObj = JSON.parse(coverSrc)
                      obj.imgList = []
                      obj.imgList.push(coverSrcObj)
                      try2 = true
                    } catch (error) {
                      console.log(error)
                    }
                    // 只有try成功才能进入列表
                    if (try1 && try2) {
                      this.loadList.push(obj)
                    }
                  }
                }
              }
            })
            if (this.isHandleBottom) {
              this.$nextTick(() => {
                if (this.$refs.vueLoad) {
                  if (res.data.data.length == 0 && this.loadList.length) {
                    this.$refs.vueLoad.onBottomLoaded(false)
                  } else {
                    this.$refs.vueLoad.onBottomLoaded(true)
                  }
                }
              })
            }
          }
        })
    },
    getCont (obj) {
      let _this = this
      this.isLoading = true
      getEventDetailApi(obj)
        .then(res => {
          this.isLoading = false
          if (res.data.code == 2000) {
            this.info = res.data.data
            this.swiperList = res.data.data.images
            this.title = res.data.data.title
            this.eventDateStr = res.data.data.eventDateStr
            this.eventAddress = res.data.data.eventAddress
            this.pointStr = res.data.data.pointStr
            var oImg = new Image()
            oImg.src = res.data.data.avatar
            oImg.onload = function () {
              _this.avatar = res.data.data.avatar
            }
            this.isAuth = res.data.data.isAuth
            this.nickName = res.data.data.nickName
            this.authTitle = res.data.data.authTitle
            this.cntFansStr = res.data.data.cntFansStr
            this.eventDesc = res.data.data.eventDesc
            this.eventDescArray = res.data.data.eventDesc.split('#').filter(item => item !== '')
            this.eventNotice = res.data.data.eventNotice
            this.eventNoticeArray = res.data.data.eventNotice.split('#')
            this.eventStatus = res.data.data.eventStatus
            this.eventResult = res.data.data.eventResult.split('#').filter(item => item !== '')
          } else {
            this.isContError = true
          }
        })
        .catch(e => {
          this.isLoading = false
          this.isContError = true
        })
    },
    openApp () {
      if (isWeixinBrowser()) {
        this.showMask(true)
      } else {
        let adrPath = '?jt=3&eventId=' + this.eventId
        let iosPath = '?jt=3&eventId=' + this.eventId
        // '?jt=1&contId=1085465558880620544&detailUrl=http://dev.cogo.club/api/gmh5/index.html#/detail'
        H5OpenApp({iosPath: iosPath, adrPath: adrPath})
      }
    },
    showMask (v) {
      this.$nextTick(() => {
        document.getElementById('MASK').style.display = 'block' // 这块用vue变量控制失效，故用js写
        document.getElementById('MASK').addEventListener('touchmove', function (e) {
          e.preventDefault()
        }, { passive: false })
      })
    },
    closeMask (v) {
      this.$nextTick(() => {
        document.getElementById('MASK').style.display = 'none' // 这块用vue变量控制失效，故用js写
        document.getElementById('MASK').removeEventListener('touchmove')
      })
    }
  },
  filters: {
    timeF (v) {
      if (!v) return ''
      v = parseInt(v / 1000)
      var m = parseInt(v / 60)
      var s = parseInt(v % 60)
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10) {
        s = '0' + s
      }
      return m + ':' + s
    }
  }
}
</script>
<style lang="less">
.activy-root{
  .my-bullet{
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    display: inline-block;
    background: #d7d7d7;
  }
  .my-bullet-active{
    background: #2a2a2a;
  }
  // .vsim-load-content{
  //   // padding-bottom: 50px;
  // }
}
</style>
<style lang="less" scoped>
.conten{
  box-sizing: border-box;
  margin-top: 60px;
  // padding-top: 1.706667rem;
  overflow: scroll;
  width: 100%;
  height: 100%;
  .topic {
    position: relative;
    height: 76px;
    color: #ffffff;
    img {
      width: 100%;
    }
    .topic-title-pic {
      position: absolute;
      top: 19px;
      left: 14px;
      width: 20px;
      height: 20px;
    }
    .topic-title {
      position: absolute;
      top: 15px;
      left: 42px;
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
      line-height: 28px;
    }
    .topic-number {
      position: absolute;
      bottom: 12px;
      line-height: 17px;
      left: 15px;
      font-size: 10px;
      span {
        font-size: 8px;
      }
    }
    .attention {
      position: absolute;
      top: 27px;
      right: 14px;
      width: 68px;
      height: 30px;
      background: #ffffff;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bolder;
      color: #00C584;
      img {
        margin-right: 4px;
        width: 12px;
      }
    }
  }
}
.swipper-wrapper {
  position: relative;
  width: 10rem;
  height: 5.973333rem;
  margin-top: 1.706667rem;
  .swiper {
    width: 10rem;
    height: 5.973333rem;
    background: #ccc;
    img {
      width: 100%;
      height:100%;
    }
  }
  .slide-item{
    width: 10rem;
    height: 5.973333rem;
  }
}
.oneImg {
  width: 10rem;
  height: 5.973333rem;
  img {
    width: 100%;
    height:100%;
  }
}
.share-circle{
  position: absolute;
  z-index: 10;
  bottom: -32px;
  right: 30px;
}
.video-horizontal-size {
  width: 10rem;
  height: 5.866667rem!important;
}
.mr30 {
  margin-top: 30px;
}
.mr20 {
  margin-top: 20px;
}
.pd20{
  padding: 0 20px;
}
.pdlr20{
  padding: 0 .533333rem;
}
.ev-title {
  font-size: 24px;
  color: #2A2A2A;
  font-weight: 700;
}
.subr {
  margin: 14px 0;
  .item{
    margin: 5px 0;
    display: flex;
    .icon {
      flex: 0 0 14px;
      width: 14px;
      height: 14px;
      margin-right: 14px;
      margin-top: 4px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      flex: 1;
      font-size: 16px;
      color: #4D4D4D;
    }
  }
}
.line {
  box-sizing: border-box;
  border-top: 1px solid #F6F6F6;
}
.sub-title {
  font-size: 14px;
  line-height: 14px;
  color: #2A2A2A;
  font-weight: 700;
  padding-top: 10px;
  padding-left: 20px;
}
.user-info{
  margin-top: -20px;
}
.async-cont{
  margin: 14px 0;
  p {
    font-size: 16px;
    color: #4D4D4D;
    letter-spacing: 0;
    line-height: 26px;
  }
  p:empty {
    height: 18px;
  }
}
.item-cont {
  .text{
    font-size: 16px;
    color: #4D4D4D;
    padding:0 .533333rem;
    word-break: break-all;
      /*! autoprefixer: off */
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      /*! autoprefixer: on */
  }
  .one-img{
    position: relative;
    margin-top: -8px;
    width: 10rem;
    height: 10rem;
    .quality{
      width: 50px;
      height: 20px;
      position: absolute;
      right: 5px;
      top: 5px;
      z-index: 10;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position:center center;
      background-size: cover;
    }
    .play-btn{
      position: absolute;
      top: 50%;
      left: 50%;
      width:50px;
      height: 50px;
      margin-left: -0.533333rem;
      margin-top: -0.533333rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      .img-wrap{
        width: .48rem;
        height: .586667rem;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .play-time {
      position: absolute;
      left: .533333rem;
      bottom: .533333rem;
      border-radius: .266667rem;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      padding: .08rem .213333rem;
      align-items: center;
      font-size: 12px;
      color: #fff;
      .icon {
        width: .32rem;
        height: .32rem;
        padding-right: 6px;
        border-right: 1px solid rgba(255, 255, 255, 0.26);
        margin-right: 6px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .more-img{
    position: relative;
    margin-top: .266667rem;
    overflow: hidden;
    .img-wrap{
      width: 4.933333rem;
      height: 4.933333rem;
      float: left;
      margin-bottom: .133333rem;
      p {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position:center center;
        background-size: cover;
      }
    }
    /*! autoprefixer: off */
    .img-wrap-mgl {
      margin-left: .133333rem;
    }
    /*! autoprefixer: on */
    .quality{
      width: 50px;
      height: 20px;
      position: absolute;
      right: 5px;
      top: 5px;
      z-index: 10;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.item-info {
  padding: 14px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4D4D4D;
  .time{
    flex: 2;
  }
  .each{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .icon1{
    width: 18px;
    height: 14px;
    margin-right: 5px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .icon2{
    width: 15px;
    height: 15px;
    margin-right: 5px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.pad-block{
  overflow: hidden;
  clear: both;
  width: 100%;
  height: .266667rem;
  background: #fafafa;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 20;
  text-align: center;
  line-height: 50px;
  background: #FF5A5F;
  color: #fff;
  font-size: 16px;
}
</style>
