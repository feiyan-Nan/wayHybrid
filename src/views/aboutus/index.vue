<template>
  <div id="abouts">
    <nav class="abouts-nav">
      <img class="abouts-nav-arrow" src="../../assets/back@3x.png" @click="goBack" >
      <div class="abouts-nav-tip">关于</div>
    </nav>

    <main class="abouts-main">
      <img src="../../assets/appLogo@3x.png" />
      <span>光芒</span>
      <div v-if="this.versonInfo.isNewVersion == 0" @click="updateApp">{{ this.versonInfo.upgradeInfo + ' ' + this.versonInfo.newVersion}}</div>
      <p v-else>当前版本{{curVersion}}</p>
    </main>

    <div class="abouts-list">
      <ul>
        <li @click="jumpPage('communityRule')">社区规范</li>
        <li @click="jumpPage('useRule', 'h5')">使用协议</li>
        <li @click="jumpPage('privacy', 'h5')">隐私政策</li>
        <li @click="chooseJumpLink">评分app</li>
      </ul>
    </div>

    <footer class="abouts-footer">
      <div>
        电话：010-65023451<br />
        邮箱：ask@cogo.club
      </div>
    </footer>
  </div>
</template>

<script>
import { isIOS, isAndroid } from '@/utils/platform'
import { recentVersionApi } from '@/api/about'
export default {
  name: 'abouts',
  data () {
    return {
      versonInfo: {}
    }
  },
  created () {
    this.requestData()
  },
  methods: {
    jumpPage (val, param) {
      if (val == 'useRule' && isIOS()) {
        this.$router.push({
          path: '/useRuleIos',
          query: {
            from: param
          }
        })
        return
      }
      this.$router.push({
        path: '/' + val,
        query: {
          from: param
        }
      })
    },
    chooseJumpLink () {
      if (isIOS()) {
        console.log('跳转到ios app store，链接待确认')
        window.location.href = 'http://itunes.apple.com/us/app/id1441507544'
        return
      }
      console.log('跳转到应用宝，链接待确认')
      window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=club.cogo.cogoproject'
    },
    requestData () {
      let appType = isIOS() ? 1 : 0
      let appVersion = this.curVersion.replace(/[v|V]/, '')
      recentVersionApi({
        appType,
        appVersion
      }).then(res => {
        if (res.data.code === 2000) {
          Object.assign(this.versonInfo, res.data.data)
          this.versonInfo.newVersion = 'V' + res.data.data.newVersion.replace(/[v|V]/, '')
        }
      })
    },
    updateApp () {
      if (this.isNewVersion == 0) {
        if (isAndroid() || isIOS()) {
          isIOS() ? this.$device.JsBridge.callHandler('h5ClickUpdate', {}, (data) => {}) : window.glamor.clickUpdate()
          return
        }

        this.$vux.toast('请在ios, andorid设备上使用')
      }
    },
    goBack () {
      if (isAndroid()) {
        console.log('安卓')
        window.glamor.closePage()
        return
      }
      if (isIOS()) {
        console.log('ios')
        this.$device.JsBridge.callHandler('h5LeftBack', {}, (data) => {})
        return
      }
      console.log('web')
      this.$router.go(-1)
    }
  },
  computed: {
    curVersion () {
      return 'V' + this.$route.query.version.replace(/[v|V]/, '')
    }
  }
}
</script>

<style scoped lang="less">
  *{
    box-sizing: border-box;
  }
  #abouts{
    /*background-color: pink;*/
    .abouts-nav{
      padding: 24px 0 0 20px;
      .abouts-nav-arrow{
        width: 20px;
        height: 18px;
        margin-bottom: 23px;
        display: inline-block;
      }
      .abouts-nav-tip{
        font-size: 24px;
        color: #2A2A2A;
        letter-spacing: 0;
        line-height: 24px;
      }
    }

    .abouts-main{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-bottom: 26px;
      img{
        width: 42px;
        height: 42px;
      }
      span{
        font-size: 14px;
        color: #2A2A2A;
        line-height: 14px;
        margin-top: 8px;
      }
      div{
        width: 100px;
        height: 30px;
        border: 2px solid #FF5A5F;
        text-align: center;
        line-height: 30px;
        font-size: 10px;
        color: #FF5A5F;
        margin-top: 10px;
      }
      p{
        font-size: 11px;
        color: #A7A7A7;
        margin-top: 5px;
      }
    }

    .abouts-list{
      border-top: 14px solid #FAFAFA;
      ul{
        padding: 0 40px 0 40px;
        li{
          font-size: 15px;
          color: #2A2A2A;
          height: 74px;
          line-height: 74px;
          border-bottom: 0.5px solid #F2F2F2;
          z-index: 5;
          position: relative;
          &:after{
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 13px;
            height: 13px;
            background: url("../../assets/right.png") no-repeat center;
            background-size: 13px 13px;
            opacity: 0.55;
            z-index: 9;
          }
        }
      }
    }

    .abouts-footer{
      text-align: center;
      margin-top: 50px;
      div{
        display: inline-block;
        text-align: left;
        font-size: 11px;
        color: #A7A7A7;
      }
    }
  }
</style>
