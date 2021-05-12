<template>
  <div class="rootEl">
    <AppHeaderBar style="position: absolute;top: 0;left: 0;right: 0"></AppHeaderBar>
    <loading v-if="isLoading"></loading>
    <contError v-else-if="isContError"></contError>
    <netError v-else-if="isNetError"></netError>
    <div v-else>
      <quick-loadmore ref="vueLoad"
          :bottom-method="handleBottom"
          :disable-top="true"
          :disable-bottom="false">
        <div class="header">
          <div class="name">{{nickName}}</div>
          <div class="account">光芒号：{{uid}}</div>
        </div>
        <div class="user-info">
          <div class="avatar-wrap" @click="openApp">
            <div class="img-wrap">
              <img v-if="avatar" :src="avatar" alt="">
              <img v-else src="../../assets/avatar@3x.png" alt="">
            </div>
            <div v-if="isAuth" class="auth">
              <img src="../../assets/auth@3x.png" alt="">
            </div>
          </div>
          <div class="btn-wrap" @click="openApp">
            +关注
          </div>
        </div>
        <div class="user-desc">
          <p class="desc" v-if="isAuth">{{org}} {{title}}</p>
          <p class="desc" v-else>{{signature}}</p>
          <div class="marks">
            <div v-if="sex != 0" class="sex-mark mark">
              <p class="img-wrap">
                <img v-if="sex == 2" src="../../assets/G@3x.png" alt="">
                <img v-if="sex == 1" src="../../assets/B@3x.png" alt="">
              </p>
            </div>
            <p v-if="starSignStr" class="letter-wrap mark">{{starSignStr}}</p>
            <p v-if="regionStr" class="letter-wrap mark">{{regionStr}}</p>
          </div>
        </div>

        <div class="cards">
          <div class="card" @click="openApp">
            <p class="number">{{cntLikeStr}}</p>
            <p class="classify">赞</p>
          </div>
          <div class="card" @click="openApp">
            <p class="number">{{fansCntStr}}</p>
            <p class="classify">粉丝</p>
          </div>
          <div class="card" @click="openApp">
            <p class="number">{{cntFollowStr}}</p>
            <p class="classify">关注</p>
          </div>
        </div>

        <div class="empty" v-if="list.length == 0">
          <p>TA还没有发布内容呢</p>
        </div>
        <div v-if="list.length" class="cont-list">
          <div class="cont-item" v-for="(item, index) in list" :key="index" @click="openApp">
            <div class="time-wrap">
              <div class="left">
                <!-- <p class="day">{{item.publishDate | dayFilter}}</p> -->
                <p class="month">{{item.publishDateStr}}</p>
              </div>
              <div class="line"></div>
            </div>
            <div class="cont-text" v-html="item.text"></div>
            <div class="img-wrapper">
              <img v-if="item.images.src" :src="item.images.src" alt="">
              <div class="art-mark" v-if="item.isArticle">
                <div class="img-wrap"><img src="../../assets/art_icon.png" alt=""></div>文章
              </div>
              <div v-if="item.isVideo" class="mask">
                <img src="../../assets/play-button.png" alt="">
              </div>
            </div>
            <div class="bar">
              <div class="item">
                <div class="icon">
                  <img src="../../assets/share.png" alt="">
                </div>
                <span>{{item.cntShareStr}}</span>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="../../assets/common.png" alt="">
                </div>
                <span>{{item.cntCommentStr}}</span>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="../../assets/zan@3x.png" alt="">
                </div>
               <span>{{item.cntLikeStr}}</span>
              </div>
            </div>
          </div>
        </div>
      </quick-loadmore>
    </div>
  </div>
</template>

<script>
import AppHeaderBar from '@/components/AppHeaderBar'
import { infoApi, contListApi } from '@/api/personalPage'
// 引入删除页，审核不通过页面，加载异常，网络异常
import contError from '@/components/ErrorPage/contError'
import netError from '@/components/ErrorPage/netError'
import loading from '@/components/Loading'
export default {
  data () {
    return {
      org: '',
      title: '',
      isLoading: true,
      isContError: false,
      isNetError: false,
      pageNumber: 1,
      uid: '',
      nickName: '',
      sex: 0,
      avatar: '',
      signature: '',
      isAuth: 0,
      regionStr: '',
      starSignStr: '',
      cntLikeStr: '0',
      fansCntStr: '0',
      cntFollowStr: '0',
      list: [],
      isload: true
    }
  },
  mounted () {
    var uid = this.$route.query.uid
    console.log(uid)
    console.log(uid)
    if (uid) {
      this.uid = uid
      this.requestInfoData()
      this.requestcontListData()
    } else {
      this.$vux.toast.text('参数错误')
    }
  },
  methods: {
    openApp () {
      window.location.href = 'http://url.cn/553SnHV'
    },
    handleBottom () {
      this.pageNumber += 1
      if (this.isload) {
        this.requestcontListData()
      } else {
        this.$refs.vueLoad.onBottomLoaded()
      }
    },
    requestcontListData () {
      contListApi({'targetUid': this.uid, 'pageNum': this.pageNumber})
        .then(res => {
          this.isLoading = false
          if (res.data.code === 2000) {
            var array = []
            if (res.data.data.length === 0) {
              this.isload = false
            }
            res.data.data.forEach((item, index) => {
              //  这是状态
              if (item.contType == 0) {
                // 这是图文
                if (item.timelineType == 0) {
                  try {
                    var content = JSON.parse(item.content)
                    var coverSrc = JSON.parse(item.coverSrc)
                    let obj = {}
                    obj.publishDate = item.publishDate
                    obj.text = content.text
                    obj.images = coverSrc
                    obj.cntShareStr = item.cntShareStr
                    obj.cntCommentStr = item.cntCommentStr
                    obj.cntLikeStr = item.cntLikeStr
                    obj.publishDateStr = item.publishDateStr
                    array.push(obj)
                  } catch (error) {}
                  // 这是视频
                } else if (item.timelineType == 1) {
                  try {
                    let content = JSON.parse(item.content)
                    let coverSrc = JSON.parse(item.coverSrc)
                    let obj = {}
                    obj.cntShareStr = item.cntShareStr
                    obj.cntCommentStr = item.cntCommentStr
                    obj.cntLikeStr = item.cntLikeStr
                    obj.publishDate = item.publishDate
                    obj.text = content.text
                    obj.images = coverSrc
                    obj.isVideo = true
                    obj.publishDateStr = item.publishDateStr
                    array.push(obj)
                  } catch (error) {}
                }
                // 这是文章
              } else if (item.contType == 1) {
                try {
                  let coverSrc = JSON.parse(item.coverSrc)
                  let obj = {}
                  obj.cntShareStr = item.cntShareStr
                  obj.cntCommentStr = item.cntCommentStr
                  obj.cntLikeStr = item.cntLikeStr
                  obj.isArticle = true
                  obj.publishDate = item.publishDate
                  obj.text = item.title
                  obj.images = coverSrc
                  obj.publishDateStr = item.publishDateStr
                  obj.contStatus = item.contStatus
                  array.push(obj)
                } catch (error) {}
              }
            })
            this.list.push(...array)
            this.$nextTick(() => {
              if (this.$refs.vueLoad) {
                this.$refs.vueLoad.onBottomLoaded()
              }
            })
            console.log(this.list)
          } else {
            this.isNetError = true
          }
        })
        .catch(e => {
          this.isLoading = false
          this.isNetError = true
        })
    },
    requestInfoData () {
      this.isLoading = true
      infoApi({targetUid: this.uid, account: this.uid})
        .then(res => {
          this.isLoading = false
          if (res.data.code === 2000) {
            this.nickName = res.data.data.nickName
            this.avatar = res.data.data.avatar
            this.signature = res.data.data.signature
            this.org = res.data.data.org
            this.title = res.data.data.title
            this.sex = res.data.data.sex
            this.isAuth = res.data.data.isAuth
            this.regionStr = res.data.data.regionStr
            this.starSignStr = res.data.data.starSignStr
            this.cntLikeStr = res.data.data.cntLikeStr
            this.fansCntStr = res.data.data.fansCntStr
            this.cntFollowStr = res.data.data.cntFollowStr
          } else {
            this.isContError = true
          }
        })
        .catch(e => {
          this.isLoading = false
          this.isNetError = true
        })
    }
  },
  filters: {
    dayFilter (v) {
      if (!v) return '00'
      var day = new Date(v).getDate()
      if (day < 10) { day = '0' + day }
      return day
    },
    monthFilter (v) {
      if (!v) return '00'
      var month = new Date(v).getMonth() + 1
      if (month < 10) { month = '0' + month }
      return month + '月'
    }
  },
  components: {
    AppHeaderBar,
    loading,
    contError,
    netError
  }
}
</script>

<style lang="less" scoped>
  .rootEl {
    overflow: auto;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
    .header{
      padding: 0 20px;
      margin-top: 2.24rem;
      height: 44px;
      text-align: center;
      .name {
        font-size: 20px;
        color: #2a2a2a;
        height: 20px;
        line-height: 20px;
        letter-spacing: 0;
      }
      .account{
        color: #999;
        font-size: 12px;
      }
    }
    .user-info {
      padding: 0 20px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar-wrap {
        position: relative;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
        .img-wrap{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .auth {
          width: .533333rem;
          height: 20px;
          position: absolute;
          right: .133333rem;
          bottom: .133333rem;
        }
      }
      .btn-wrap{
        width: 4.533333rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        text-align: center;
        border-radius: .213333rem;
        background: #FF5A5F;
        font-size: .426667rem;
        letter-spacing: .053333rem;
        color: #fff;
      }
    }
    .user-desc {
      padding: 0 20px;
      margin-top: .32rem;
      .desc{
        font-size: 12px;
        line-height: 12px;
        color: #999;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .marks {
      margin-top: .533333rem;
      overflow: hidden;
      .mark {
        margin-right: .266667rem;
        padding: 0 .16rem;
        height: .426667rem;
        line-height: .426667rem;
        border: 1px solid #979797;
        border-radius: 2px;
        display: inline-block;
        float: left;
      }
      .sex-mark {
        .img-wrap {
          margin-top: .08rem;
          width: .32rem;
          height: .32rem;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
      .letter-wrap {
        font-size: .32rem;
        padding: 0 .32rem;
        color: #757575;
      }
    }
    .cards {
      width: 8.933333rem;
      height: 2.08rem;
      margin: .64rem auto 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #FFFFFF;
      box-shadow: 0 0 21px 3px rgba(217,217,217,0.37);
      border-radius: 5px;
      .card {
        text-align: center;
        .number {
          font-size: .533333rem;
          color: #2A2A2A;
          letter-spacing: 0;
          line-height: .533333rem;
          height: .533333rem;
        }
        .classify{
          margin-top: .266667rem;
          font-size: .32rem;
          color: #999999;
          letter-spacing: 0;
          line-height: .32rem;
          height: .32rem;
        }
      }
    }
    .empty {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #999999;
      letter-spacing: -0.33px;
      margin-top: 2.666667rem;
    }
    .cont-list {
      background: #FAFAFA;
      padding: .533333rem 20px 0;
      .cont-item {
        margin-bottom: .533333rem;
        border-bottom: 1px solid #ccc;
        .time-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          .left {
            flex: 0 0 50px;
          }
          .day {
            display: inline-block;
            width: .746667rem;
            height: .746667rem;
            line-height: .746667rem;
            text-align: center;
            background:rgba(198,157,201,0.1);
            border-radius: .053333rem;
            font-size: 18px;
            color: #2A2A2A;
            letter-spacing: 0;
          }
          .month {
            display: inline-block;
            font-size: 12px;
            color: #2A2A2A;
            letter-spacing: 0;
            line-height: 12px;
          }
          .line{
            flex: 1;
            width: 100%;
            border-top: 1px solid #979797;
          }
        }
        .cont-text{
          padding: 4px;
          margin-top: .213333rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 16px;
          color: #222222;
          letter-spacing: 0;
          line-height: 26px;
        }
        .img-wrapper{
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: .32rem;
          border-radius: .106667rem;
          overflow: hidden;
          max-width: 100%;
          max-height: 10.666667rem;
          min-height: 5.333333rem;
          background: #000;
          border: 1px solid #ccc;
          box-sizing: border-box;
          .art-mark {
            width: 1.866667rem;
            height: .8rem;
            line-height: 0.8rem;
            position: absolute;
            right: .266667rem;
            top: 0;
            font-size: .426667rem;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            .img-wrap{
              width: .64rem;
              height: .64rem;
              margin-right: .266667rem;
              img{
                width: 100%;
                display: block;
              }
            }
          }
          img {
            display: block;
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
          }
          .mask{
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 40px;
              height: 40px;
            }
          }
        }
        .bar{
          overflow: hidden;
          width: 100%;
          .item{
            padding: 0.2rem 0;
            width: 33%;
            float: left;
            font-size: .426667rem;
            text-align: center;
            color: #4D4D4D;
            letter-spacing: 0;
            // vertical-align:middle;
            line-height: .8rem;
            .icon{
              vertical-align:middle;
              line-height: .8rem;
              display: inline-block;
              width: .8rem;
              height: .8rem;
              margin-right: .1rem;
              img{
                width: 100%;
                height: 100%;
              }
            }
            span {
              position: relative;
              top: .05rem;
            }
          }
        }
      }
    }
  }
</style>
