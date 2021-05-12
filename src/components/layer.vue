<template>
  <div class="mask-root">
    <div class="arrow"></div>
    <div class="font">
      <p>1、点击右上角</p>
      <p>2、用{{text}}打开</p>
      <p>3、进入app</p>
    </div>
    <div class="close-btn" @click="closeMask"></div>
  </div>
</template>

<script>
import { isIOS } from '@/utils/platform'
export default {
  data () {
    return {
      text: '浏览器'
    }
  },
  mounted () {
    if (isIOS()) {
      this.text = 'safari'
    }
  },
  methods: {
    closeMask () {
      this.$emit('closeMask', false)
    }
  }
}
</script>

<style lang="less" scoped>
.mask-root{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  background:rgba(0,0,0,0.8);
  z-index: 100000;
  overflow: hidden;
  .font{
    width: 160px;
    margin: 0 auto;
    margin-top: 20%;
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
    color: #fff;
  }
  .arrow{
    width: 65px;
    height: 77px;
    background: url('../assets/arrow.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 35px;
    top: 12px;
  }
  .close-btn{
    width: 40px;
    height: 40px;
    background: url('../assets/close.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 80vh;
    left: 50%;
    margin-left: -20px;
  }
}
</style>
