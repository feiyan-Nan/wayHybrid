<!-- 积分礼物详情 -->
<template>
  <div class="gift-root">
    <!--<Header :isFirstPage="true" title="礼品详情" v-if="false"></Header>-->
    <!--<Loading v-if="loading" :isFirstPage="true" :hasHeader="true"></Loading>-->
    <!--<netError v-else-if="isNetError" :isFirstPage="true" :hasHeader="true"></netError>-->
    <!--<contError v-else-if="isContError" :isFirstPage="true" :hasHeader="true"></contError>-->
    <HeaderNav ref="headerNav" :style="`background-color: rgba(255, 255, 255, ${opacity})`"></HeaderNav>
    <template>
      <quick-loadmore ref="vueLoad"
          :bottom-method="handleBottom"
          :disable-top="true"
          :disable-bottom="false"
          :bottomDistance="60">
        <div class="" v-if="isShowStat">
          <!--头部轮播图-->
          <HeaderSwiper :list="swiperList"></HeaderSwiper>
          <!--价格区域-->
          <GiftDesc :name="activityTitle" :price="price" :needJpoint="needJpoint" :cntTotal="cntTotal"></GiftDesc>
          <!--内容区域-->
          <div class="good-detail" v-html="content"></div>
          <div class="line1px" v-if="content"></div>
          <stretch :title="'特别说明'"></stretch>
        </div>
        <div class="empty" v-else>
          <div class="inn">
            <img src="../../../assets/xiajia@2x.png" alt="">
            <p>礼品售罄已下架</p>
          </div>
        </div>
        <div class="line1px" v-if="showImgsList.length"></div>
        <div class="showImgs" v-if="showImgsList.length">
          <div class="specify">晒礼品</div>
          <showGiftList :list="showImgsList"></showGiftList>
        </div>
      </quick-loadmore>
      <div>
        <confirm v-model="isConfirmShow"
          title="确定兑换？"
          confirm-text="兑换礼品"
          @on-cancel="onCancel"
          @on-confirm="onConfirm"
        >
          <p style="text-align:center;">{{confirmInner}}</p>
        </confirm>
      </div>
    </template>

    <!--底部导航-->
    <div class="footer" v-if="isShowStat">
      <div :class="isExchange ? 'red' : 'white'" @click="exchangeGift">{{!!isExchange ? '兑换' : '兑换礼品'}}</div>
      <div :class="isExchange ? 'white' : 'red'" v-if="isExchange" @click="printImg">晒图</div>
    </div>
  </div>
</template>

<script>
import { setCookie } from '@/utils/cookie'
import { Confirm } from 'vux'
// import Loading from '@/components/Loading'
// import Header from '@/components/Header'
import { activityDetailApi, giftExchangeApi, shareGetListApi } from '@/api/surprise'
import { isAndroid, isIOS } from '@/utils/platform'
// import contError from '@/components/ErrorPage/contError'
// import netError from '@/components/ErrorPage/netError'
import avatar from '@/components/AVATAR'
import HeaderSwiper from './HeaderSwiper'
import GiftDesc from './GiftDesc'
import showGiftList from './showGiftList'
import stretch from './stretch'
import HeaderNav from './HeaderNav'
export default {
  data () {
    return {
      loading: false,
      isNetError: false,
      isContError: false,
      uid: '',
      goodid: '',
      title: '',
      activityTitle: '',
      price: 0,
      cntTotal: 0,
      needJpoint: 0,
      content: '',
      isConfirmShow: false,
      confirmInner: '',
      swiperOption: {
        watchOverflow: true,
        autoHeight: true, // 自动赋值高度
        loop: false, // 循环播放
        effect: 'slide', // 切换swiper-slide的效果
        autoplay: 1000,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
          // bulletClass: 'my-bullet',
          // bulletActiveClass: 'my-bullet-active'
        }
      },
      isExchange: false, // 是不是兑换过
      isExlpain: false, // 是不是展开
      isShowStat: 1, // 是不是上架状态
      isHandleBottom: false, // 是不是下拉动作
      swiperList: [],
      showImgsList: [],
      pageNum: 1,
      opacity: 0
    }
  },
  mounted () {
    this.eventScroll()
    var goodid = this.$route.query.goodid
    var uid = this.$route.query.uid
    console.log('goodid:', goodid)
    console.log('uid', uid)
    if (goodid && uid) {
      this.goodid = goodid
      this.uid = uid
      setCookie('uid', uid)
      this.requestData()
      this.getshareList({
        srcId: this.goodid,
        srcType: 4,
        pageNum: 1,
        uid: this.uid
      })
    } else {
      this.$vux.toast.text('参数错误')
    }
  },
  methods: {
    eventScroll (event) {
      const headerNavHeight = this.$refs.headerNav.$el.clientHeight
      // 获得滚动距离
      setInterval(() => {
        let scrollTop = this.$refs.vueLoad.getScrollTop()
        this.opacity = scrollTop / headerNavHeight
      }, 0)
    },
    toDetailView (contId, detailUrl) {
      if (!contId || !detailUrl) return
      if (isAndroid()) {
        try {
          window.glamor.toDetailView(contId, detailUrl)
        } catch (err) {
          console.log(err)
        }
      } else if (isIOS()) {
        try {
          this.$device.JsBridge.callHandler('h5ClickPicture', {detailUrl: detailUrl, contId: contId}, (data) => {})
        } catch (e) {
          console.log(e)
        }
      }
    },
    clickAvatar (uid) {
      if (!uid) return
      if (isAndroid()) {
        try {
          window.glamor.clickAvatar(uid.toString())
        } catch (error) {
          console.log(error)
        }
      } else if (isIOS()) {
        try {
          this.$device.JsBridge.callHandler('h5ClickAvatar', {uid: uid.toString()}, (data) => {})
        } catch (error) {
          console.log(error)
        }
      }
    },
    getshareList (obj) {
      shareGetListApi(obj)
        .then(res => {
          if (res.data.code == 2000) {
            res.data.data.forEach(item => {
              let obj = {}
              obj.avatar = ''
              obj.uid = item.uid
              let img = new Image()
              img.src = item.avatar
              img.onload = () => {
                obj.avatar = item.avatar
              }
              // obj.nickName = item.nickName
              // obj.cntFans = item.cntFans
              // obj.org = item.org
              // obj.authTitle = item.authTitle
              // obj.contId = item.contId
              // obj.detailUrl = item.detailUrl
              // obj.isAuth = item.isAuth
              // obj.timelineType = item.timelineType
              // obj.quality = item.quality
              Object.assign(obj, item)
              try {
                let cont = JSON.parse(item.coverSrc)
                obj.coverSrc = cont.src
                obj.coverH = cont.height * 1
                obj.coverW = cont.width * 1
              } catch (e) {
                console.log(e)
              }
              this.showImgsList.push(obj)
            })
            this.$nextTick(() => {
              if (this.$refs.vueLoad) {
                if (res.data.data.length == 0) {
                  this.$refs.vueLoad.onBottomLoaded(false)
                  if (this.isHandleBottom) {
                    this.$vux.toast.text('暂无新内容')
                  }
                } else {
                  this.$refs.vueLoad.onBottomLoaded()
                }
              }
            })
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    printImg () {
      if (isAndroid()) {
        try {
          window.glamor.toPublish()
        } catch (e) {
          console.log(e)
        }
      } else if (isIOS()) {
        try {
          this.$device.JsBridge.callHandler('h5ClickShowPicture', {}, (data) => {})
        } catch (e) {
          console.log(e)
        }
      }
    },
    handleBottom () {
      this.isHandleBottom = true
      this.pageNum += 1
      this.getshareList({
        srcId: this.goodid,
        srcType: 4,
        pageNum: this.pageNum,
        uid: this.uid
      })
    },
    toggleArrow () {
      this.isExlpain = !this.isExlpain
    },
    exchangeGift (val) {
      this.confirmInner = '将扣除' + this.needJpoint + '可用积分'
      this.isConfirmShow = true
    },
    onConfirm () {
      var _this = this
      giftExchangeApi({uid: this.uid, id: this.goodid})
        .then(res => {
          // 2000 是领取成功
          // res.data.code = 3000
          if (res.data.code == 2000) {
            if (this.cntTotal > 1) {
              this.cntTotal -= 1
            }
            this.isExchange = 1
            console.log(res.data.data)
            let accid = res.data.data.accid
            let avatar = res.data.data.avatar
            let isAuth = res.data.data.isAuth
            let nickName = res.data.data.nickName
            let uid = res.data.data.uid
            this.$vux.confirm.show({
              showCancelButton: false,
              confirmText: '联系客服',
              title: '兑换成功',
              content: '点击联系客服，提供收货信息',
              onConfirm () {
                if (isAndroid()) {
                  try {
                    window.glamor.jumpToServicer(accid, avatar, isAuth, nickName, uid)
                  } catch (e) {
                    console.log(e)
                  }
                } else if (isIOS()) {
                  _this.$vux.toast.text('run 交互 ios')
                  _this.$device.JsBridge.callHandler('h5ClickContactService', {accid, avatar, isAuth, nickName, uid}, (data) => {})
                }
              }
            })
            // 3000是积分不足
          } else if (res.data.code == 3000) {
            this.$vux.confirm.show({
              confirmText: '获取积分',
              title: '噢，积分不足',
              content: '快去获取更多积分吧',
              onConfirm () {
                try {
                  if (isAndroid()) {
                    window.glamor.h5AchieveIntegral()
                  } else if (isIOS()) {
                    _this.$device.JsBridge.callHandler('h5AchieveIntegral', {}, (data) => {})
                  }
                  _this.$router.go(-1)
                } catch (error) {
                  console.log(error)
                }
              }
            })
          } else if (res.data.code == 3001) {
            this.$vux.confirm.show({
              showConfirmButton: false,
              cancelText: '我知道了',
              title: '噢，礼物被兑换光了',
              onCancel () {

              }
            })
          }
        })
        .catch(e => {
          console.log(e)
        })
      // this.$vux.confirm.show({
      //   showConfirmButton: false,
      //   cancelText: '我知道了',
      //   title: '',
      //   content: '别忘了到消息中心查看通知'
      // })
    },
    onCancel () {
      this.isConfirmShow = false
    },
    // 请求礼物详情
    requestData () {
      this.loading = true
      activityDetailApi({id: this.goodid, uid: this.uid})
        .then(res => {
          this.loading = false
          if (res.data.code == 3021) {
            this.isShowStat = 0
          } else if (res.data.code === 2000) {
            this.swiperList = res.data.data.imgList
            this.cntTotal = res.data.data.cntTotal ? res.data.data.cntTotal * 1 : 0
            const arr = ['title', 'activityTitle', 'price', 'content', 'needJpoint', 'isExchange']
            arr.forEach(item => {
              this[item] = res.data.data[item]
            })
          } else {
            this.isContError = true
          }
        })
        .catch(_ => {
          this.loading = false
          this.isNetError = true
        })
    }
  },
  components: {
    Confirm,
    // Header,
    // Loading,
    // netError,
    // contError,
    avatar,
    HeaderSwiper,
    GiftDesc,
    showGiftList,
    stretch,
    HeaderNav
  }
}
</script>

<style scoped>
  .weui-dialog__btn_primary{
    color: #FA7268!important;
  }
  weui-dialog__btn {
    text-decoration: none;
  }
  .gift-root .good-detail{
    color: #2a2a2a;
    white-space: pre-line;
    word-break: break-all;
    text-align: left;
    font-size: 16px;
    line-height: 26px;
    position: relative;
  }
  .gift-root .good-detail >>> img {
    width: 100%;
    margin: 10px 0;
  }
  .gift-root .good-detail >>> p {
    color: #2a2a2a;
    white-space: pre-line;
    word-break: break-all;
    text-align: left;
    font-size: 16px;
    line-height: 26px;
  }
  .gift-root .my-bullet{
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    display: inline-block;
    background: #d7d7d7;
  }
  .gift-root .my-bullet-active{
    background: #2a2a2a;
  }
</style>

<style lang="less" scoped>
.gift-root{
  overflow-y: scroll;
}
.mgb{
  margin-bottom: 60px;
}
.pagination{
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  background: rgba(0, 0, 0, 0.8);
  width: 1.066667rem;
  height: .533333rem;
  line-height: .533333rem;
  border-radius: .266667rem;
  text-align: center;

}
.swipper-wrapper {
  /*margin-top: 45px;*/
  overflow: hidden;
  position: relative;
  height: 12.16rem;
  width: 100%;
  .slide-item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto;
      display: block;
    }
  }
}
.title {
  margin-top: 20px;
  padding: 0 20px;
  font-size: 16px;
  color: #2a2a2a;
  font-weight: bold;
  /*! autoprefixer: off */
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
}
.info{
  overflow: hidden;
  margin-top: 12px;
  padding-bottom: 15px;
  padding-bottom: 20px;
  .worth{
    padding: 0 20px 15px;
    font-size: 16px;
    color: #4d4d4d;
    img{
      vertical-align:middle;
      width: 14px;
      height: 14px;
      margin-right: 12px;
    }
  }
  .flex {
    margin: 0 20px;
    padding-bottom: 20px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;
    .point {
      font-size: 16px;
      color: #4d4d4d;
      img{
        width: 14px;
        height: 14px;
        display: inline-block;
        margin-right: 12px;
        vertical-align:middle;
      }
    }
    .rest {
      font-size: 12px;
      color: #999;
    }
  }
}
.good-detail{
  .img-wrapper {
    width: 100%;
    margin-bottom: 12px;
    img{
      width: 100%;
    }
  }
}
.explain{
  padding: 0 18px;
  line-height: 28px;
  font-size: 15px;
  color: #2A2A2A;
  letter-spacing: 0.5px;
  &.up{
     /*! autoprefixer: off */
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
     /*! autoprefixer: on */
    overflow: hidden;
  }
}
.arrow{
  height: 1.333333rem;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 14px;
    height: 7px;
  }
}
.empty{
  width: 100%;
  height: 12.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .inn{
    text-align: center;
    img {
      width: 3.466667rem;
      height: 3.466667rem;
    }
    p{
      margin-top: 1.333333rem;
      font-size: .426667rem;
      color: #999;
    }
  }
}
.line1px{
  margin:0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  height: 1px;
}

.specify{
  font-size: 14px;
  color: #2A2A2A;
  letter-spacing: 0;
  line-height: 14px;
  padding: 0 20px;
  margin-bottom: 24px;
  margin-top: 20px;
  font-weight: bold;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.showImgs{
  margin-bottom: 16px;
  .title{
    font-size: 16px;
    color: #2A2A2A;
    text-align: justify;
    /*margin-bottom: .133333rem;*/
    margin-bottom: 26px;
  }
  .list{
    padding:0 20px;
    overflow: hidden;
    .item{
      display: block;
      margin-top: .533333rem;
      box-sizing: border-box;
      float: left;
      width: 50%;
      &:nth-child(odd) {
        padding-right: .2rem;
      }
      &:nth-child(even) {
        padding-left: .2rem;
      }
      .user-info{
        display: flex;
        .outer-wrap{
          width: .8rem;
          height: .8rem;
          position: relative;
          .avatar-wrap{
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .auth-wrap{
            width: .186667rem;
            height: .186667rem;
            position: absolute;
            right: 0;
            bottom: 0;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .right{
          height: 1.066667rem;
          margin-left: .32rem;
          .name{
            font-size: 14px;
            color: #2A2A2A;
            /*text-align: justify;*/
            /*! autoprefixer: off */
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            /*! autoprefixer: on */
          }
          .desc{
            margin-top: 4px;
            font-size: 12px;
            color: #909090;
            // text-align: justify;
            /*! autoprefixer: off */
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            /*! autoprefixer: on */
          }
        }
      }
      .img-wrap{
        position: relative;
        margin-top: .266667rem;
        width: 4.266667rem;
        height: 4.266667rem;
        border-radius: .106667rem;
        overflow: hidden;
        background-repeat:no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        &.bg-top{
          background-position: center top;
        }
        &.bg-center{
          background-position: center center;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .playicon-wrap{
          width: .693333rem;
          height: .693333rem;
        }
        .quality{
          width: 1.333333rem;
          height: 20px;
          position: absolute;
          right: .133333rem;
          top: .133333rem;
        }
      }
    }
  }
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  /*background: #FA7268;*/
  background-color: #FF5A5F;;
  z-index: 99;
  display: flex;

  .red, .white {
    flex: 1;
    text-align: center;
  }
  .red{
    border: 1px solid #FA7268;
    box-sizing: border-box;
    color: #FA7268;
    background: #fff;
  }
  .white{
    color: #fff;
  }
}
</style>
