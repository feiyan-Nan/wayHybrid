<template>
  <div class="bg">
    <Loading v-if="isLoading"></Loading>
    <contError v-else-if="isContError"></contError>
    <netError v-else-if="isNetError"></netError>
    <template v-else></template>
    <AppHeaderBar openPage="lottery" :luckyId="this.$route.query.luckyId" @showMask="showMask"></AppHeaderBar>
    <Layer id="MASK" @closeMask="closeMask" style="display: none;"></Layer>
    <div class="up">
      <p class="status">{{luckyStat | luckyStatF}}</p>
      <p class="time">参与时间： {{startDateStr}} - {{endDateStr}}</p>
      <p class="rule" @click="showRule">活动规则</p>
    </div>
    <div class="cont-wrap">
      <div class="cont">
        <div class="cont-up" v-if="luckyStat == 0 || luckyStat == 1">
          已获得：
          <span class="ticket" @click="openApp">
            <img class="icon" src="../../assets/ticket-red@3x.png" alt="">
            0
            <img class="icon mgl5" src="../../assets/point-red@3x.png" alt="">
            0
          </span>
        </div>
        <!--未开始-->
        <div class="group" v-if="luckyStat == 0 || luckyStat == 1">
          <div class="item">
            <div class="box normal-box" v-if="luckyStat == 0 || luckyStat == 1" @click="openApp">
              <p class="text">
                <img src="../../assets/point-red@3x.png" alt="">
                <span>20</span>
              </p>
            </div>
          </div>
          <div class="item" v-for="n in 3" :key="n">
            <div class="box normal-box" @click="openApp">
              <p class="text">
                <img src="../../assets/point-red@3x.png" alt="">
                <span>20</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 已开奖 -->
        <div class="open-prize" v-if="luckyStat == 2">
          <div class="circle">
            <div class="avatar-wrap">
              <div class="avatar" @click="openApp">
                <img v-if="avatar" :src="avatar" alt="">
                <img v-else src="../../assets/avatar@3x.png" alt="">
              </div>
              <div class="auth" v-if="isAuth"></div>
            </div>
          </div>
          <p class="title" @click="openApp">本期锦鲤</p>
          <p class="nickName" @click="openApp">{{nickName}}</p>
          <div class="notic" @click="openApp">你还没有参加本期抽奖，快行动吧！</div>
        </div>
        <div class="clearfix"></div>
        <div class="title-wrap">
          <p class="line"></p>
          <p class="text">本期大奖</p>
        </div>
        <div class="big" @click="openApp">
          <img v-if="detailImgSrc" v-lazy="detailImgSrc" alt="">
        </div>
      </div>
    </div>

    <div class="luckyRule" v-show="isRuleShow">
      <div class="luckyRule-cont">
        <p class="title">抽奖规则：</p>
        <div class="cont">
          <p v-for="(item, index) in luckyRuleArray" :key="index">{{item}}</p>
        </div>
      </div>
      <div class="btn" @click="closeRule"></div>
    </div>
  </div>
</template>

<script>
import { H5OpenApp, isWeixinBrowser } from '@/utils/openApp'
import AppHeaderBar from '@/components/AppHeaderBar'
import Layer from '@/components/layer'
import Loading from '@/components/Loading'
import { luckBoxDetailApi } from '@/api/luckbox'
import contError from '@/components/ErrorPage/contError'
import netError from '@/components/ErrorPage/netError'

export default {
  data () {
    return {
      luckyId: '',
      isLoading: false,
      isNetError: false,
      isContError: false,
      isRuleShow: false,
      luckyStat: '', // 0未开始 1进行中 2已结束
      startDateStr: '',
      endDateStr: '',
      detailImgSrc: '',
      nickName: '',
      avatar: '',
      isAuth: 0,
      luckyRule: '',
      luckyRuleArray: ''
    }
  },
  mounted () {
    let luckyId = this.$route.query.luckyId
    if (luckyId) {
      this.luckyId = luckyId
      this.requestData({
        uid: '0',
        luckyId
      })
    } else {
      this.$vux.toast.text('参数错误')
    }
  },
  methods: {
    openApp () {
      if (isWeixinBrowser()) {
        this.showMask(true)
      } else {
        let adrPath = '?jt=4&luckyId=' + this.luckyId
        let iosPath = '?jt=4&luckyId=' + this.luckyId
        // '?jt=1&contId=1085465558880620544&detailUrl=http://dev.cogo.club/api/gmh5/index.html#/detail'
        H5OpenApp({iosPath: iosPath, adrPath: adrPath})
      }
    },
    showRule () {
      this.isRuleShow = true
    },
    closeRule () {
      this.isRuleShow = false
    },
    requestData (obj) {
      let _this = this
      this.isLoading = true
      luckBoxDetailApi(obj)
        .then(res => {
          this.isLoading = false
          if (res.data.code == 2000) {
            this.startDateStr = res.data.data.startDateStr
            this.endDateStr = res.data.data.endDateStr
            this.detailImgSrc = res.data.data.detailImgSrc
            this.luckyStat = res.data.data.luckyStat
            this.nickName = res.data.data.nickName
            this.isAuth = res.data.data.isAuth
            this.luckyRule = res.data.data.luckyRule
            this.luckyRuleArray = res.data.data.luckyRule.split('#')
            var oImg = new Image()
            oImg.src = res.data.data.avatar
            oImg.onload = function () {
              _this.avatar = res.data.data.avatar
            }
          } else {
            this.isLoading = false
            this.isNetError = true
          }
        })
        .catch(e => {
          this.isLoading = false
          this.isNetError = true
        })
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
  components: {
    AppHeaderBar,
    Loading,
    contError,
    netError,
    Layer
  },
  filters: {
    luckyStatF (v) {
      if (v == 0) {
        return '即将开始'
      } else if (v == 1) {
        return '进行中'
      } else if (v == 2) {
        return '已开奖'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  height: 100%;
  background: url('../../assets/lotterybg@3x.png') no-repeat;
  background-size: 100% 100%;
  overflow: scroll;
  padding-top: 1.706667rem;
  box-sizing: border-box;
}
.up {
  position: relative;
  margin-top: .533333rem;
  padding-left: .533333rem;
  .status {
    font-weight: 700;
    color: #373737;
    font-size: 18px;
  }
  .time{
    margin-top: 5px;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
  }
  .rule{
    position: absolute;
    right: 0;
    top: 10px;
    width: 60px;
    height: 30px;
    background: rgba(0, 0, 0, 0.3);
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    border: 1px solid #979797;
    font-size: 12px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    padding-left: 5px;
  }
}
.cont-wrap {
  margin: .533333rem;
  background: #fff;
  padding: .666667rem;
  .cont{
    .cont-up {
      display: flex;
      align-items: center;
      overflow: hidden;
      font-size: 12px;
      color: #000;
      letter-spacing: 0;
      .ticket {
        color: #FF5A5F;
        border: 1px solid #FF5A5F;
        border-radius: 9px;
        padding: 0 5px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        .mgl5{
          margin-left: 5px;
        }
        .icon {
          width: 12px;
          height: 12px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .group {
      overflow: hidden;
      .item {
        float: left;
        width: 3.466667rem;
        height: 3.466667rem;
        margin-top: .666667rem;
        .box{
          position: relative;
          width: 100%;
          height: 100%;
          .text{
            position: absolute;
            left: 0;
            bottom: .106667rem;
            width: 100%;
            font-size: 14px;
            color: #FF5A5F;
            display: flex;
            justify-content: center;
            img {
              width: .426667rem;
              height: .426667rem;
            }
          }
        }
        .normal-box{
          background: url('../../assets/box@3x.png') no-repeat;
          background-size: 100% 100%;
        }
        .open-box {
          background: url('../../assets/openbox@3x.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .item:nth-child(even){
        margin-left: .666667rem;
      }
    }
    // 已开奖
    .open-prize {
      overflow: hidden;
      .circle {
        width: 7.866667rem;
        height: 4.266667rem;
        background: url('../../assets/bg-prize@3x.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar-wrap {
          margin-top: 1.6rem;
          position: relative;
          .avatar {
            width: 2.933333rem;
            height: 2.933333rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .auth{
            width: .533333rem;
            height: .533333rem;
            position: absolute;
            right: .133333rem;
            bottom: .133333rem;
            background: url('../../assets/auth@3x.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .title{
        margin-top: .533333rem;
        font-size: 16px;
        color: #2A2A2A;
        text-align: center;
      }
      .nickName {
        text-align: center;
        margin-top: .133333rem;
        font-size: 12px;
        color: #626262;
      }
      .notic{
        margin-top: .266667rem;
        width: 7.6rem;
        height: 2.506667rem;
        line-height: 2.506667rem;
        background: #FFF3F4;
        border-radius: 1.253333rem;
        text-align: center;
        color: #FF5A5F;
        font-size: 14px;
      }
    }
    .title-wrap {
      margin-top: .266667rem;
      height: 1rem;
      .line {
        height: 1px;
        position: relative;
        top: 13px;
        opacity: 1;
        border-top: 1px solid #979797;
      }
      .text{
        position: relative;
        z-index: 1;
        width: 2.4rem;
        text-align: center;
        font-size: 16px;
        color: #373737;
        font-weight: 700;
        margin: 0 auto;
        background: #fff;
        height: 18px;
      }
    }
    .big{
      width: 7.6rem;
      height: 4.266667rem;
      background: #ebebeb;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.luckyRule{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .luckyRule-cont{
    position: relative;
    margin: 10vh auto 0;
    padding: 20px;
    box-sizing: border-box;
    width: 8.533333rem;
    background: #fff;
    border-radius: .213333rem;
    font-size: 12px;
    color: #4D4D4D;
    line-height: 22px;
    letter-spacing: 0;
    .title{
      font-size: 14px;
      color: #2A2A2A;
      font-weight: 700;
    }
    .cont {
      margin-top: .4rem;
      height: 55vh;
      overflow: scroll;
      p:empty {
        height: 20px;
      }
    }
  }
  .btn {
    margin: 6vh auto;
    width: 1.066667rem;
    height: 1.066667rem;
    background: url('../../assets/close.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
