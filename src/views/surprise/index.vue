<!-- 惊喜首页 -->
<template>
  <div class="root" ref="surprise">
    <div class="img-wrapper">
      <img src="../../assets/surprise_wait@3x.png" alt="">
    </div>
  </div>
</template>

<script>
import { isAndroid, isIOS } from '@/utils/platform'
// import { setCookie } from '@/utils/cookie'
export default {
  data () {
    return {
      uid: ''
    }
  },
  mounted () {
    // eslint-disable-next-line
    this.$nextTick(() => {
      var _height = this.$refs.surprise.offsetHeight
      console.log(_height)
      try {
        if (isAndroid()) {
          this.uid = window.glamor.sendParams()
          window.glamor.getSurprisePageHeight(_height)
        } else if (isIOS()) {
          this.$device.JsBridge.callHandler('getSurprisePageHeight', {height: _height}, (responseCallback) => {})
        } else {
          // this.uid = 13
        }
      } catch (error) {
      }
    })
  }
}
</script>
<style lang="less" scoped>
.root {
  height: 5.333333rem;
}
.img-wrapper {
  width: 100%;
  img {
    width: 100%;
    // height: 100%;
    display: block;
  }
}
</style>
