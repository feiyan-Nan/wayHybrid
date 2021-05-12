<template>
  <div class="header">
    <div class="back-icon" @click="goBack">
      <div class="img-wrapper">
        <img src="../../assets/back.png" alt="">
      </div>
    </div>
    <div class="title">{{title}}</div>
    <div class="rule" @click="jumpTo">{{linkTitle}}</div>
  </div>
</template>

<script>
import { isAndroid, isIOS } from '@/utils/platform'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    linkTitle: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    isFirstPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack () {
      if (this.isFirstPage) {
        try {
          if (isAndroid()) {
            window.glamor.closePage()
          } else if (isIOS()) {
            this.$device.JsBridge.callHandler('h5LeftBack', {}, (data) => {})
          } else {
            this.$router.go(-1)
          }
        } catch (error) {}
      } else {
        this.$router.go(-1)
      }
    },
    jumpTo () {
      if (this.link) {
        this.$router.push({
          path: this.link
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .back-icon {
    position: absolute;
    left: 15px;
    top: 0;
    width: 44px;
    height: 44px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .img-wrapper {
      width: 44px;
      height: 44px;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .title{
    text-align: center;
    font-size: 18px;
    color: #2A2A2A;
    width: 6.133333rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rule {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    font-size: 12px;
    color: #2a2a2a;
    margin-right: 10px;
    height: 44px;

    line-height: 44px;
  }
}
</style>
