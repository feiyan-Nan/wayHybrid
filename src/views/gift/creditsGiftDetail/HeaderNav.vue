<template>
    <div id="HeaderNav" >
      <span @click="goBack">
        <img src="../../../assets/back@3x.png" />
      </span>
    </div>
</template>

<script>
import { isIOS, isAndroid } from '@/utils/platform'
export default {
  name: 'HeaderNav',
  methods: {
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
  }
}
</script>

<style scoped lang="less">
#HeaderNav{
  height: 44px;
  /*background: #FFFFFF;*/
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  span{
    width: 24px;
    height: 24px;
    img{
      width: 24px;
      height: 24px;
    }
  }
}
</style>
