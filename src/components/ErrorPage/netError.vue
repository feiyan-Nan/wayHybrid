<template>
  <div class="root">
    <div class="cont" @click="reload">
      <!-- <div class="img-wrap">
        <img src="../../assets/eror.png" alt="">
      </div> -->
      <div class="text">网络异常，请稍后重试</div>
      <div class="button">重新加载</div>
    </div>
  </div>
</template>
<script>
// import { isAndroid, isIOS } from '@/utils/platform'
// import { setCookie } from '@/utils/cookie'
export default {
  data () {
    return {
      uid: ''
    }
  },
  mounted () {
    let uid = this.$route.query.uid
    if (uid) {
      this.uid = uid
    }
  },
  methods: {
    reload () {
      // let _this = this
      // if (this.uid) {
      //   try {
      //     if (isAndroid()) {
      //       let token = window.glamor.refreshAt()
      //       setCookie('token', token)
      //       this.$router.push('/empty')
      //     } else if (isIOS()) {
      //       this.$device.JsBridge.callHandler('htmlCallAt', {}, (data) => {
      //         let token = data
      //         setCookie('token', token)
      //         _this.$router.push('/empty')
      //       })
      //     } else {
      //       this.$vux.toast.text('请在移动端浏览')
      //       this.$router.push('/empty')
      //     }
      //   } catch (error) {
      //     console.log(error)
      //     this.$router.push('/empty')
      //   }
      // } else {
      this.$router.push('/empty')
      // }
    }
  }
}
</script>

<style lang="less" scoped>
  .root{
    width: 100%;
    height: 100vh;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .img-wrap{
      width: 6.133333rem;
      img {
        width: 100%;
        display: block;
      }
    }
    .text{
      margin-top: 1.333333rem;
      font-size: .426667rem;
      color: #999999;
      letter-spacing: 0;
      text-align: center;
      line-height: .426667rem;
    }
    .button{
      margin: 1.333333rem auto 0;
      font-size: .48rem;
      width: 4.533333rem;
      height: 1.2rem;
      color: #ff5a5f;
      text-align: center;
      line-height: 1.2rem;
      background: #fff;
      border: 1px solid #ff5a5f;
      border-radius: 4px;
    }
  }
</style>
