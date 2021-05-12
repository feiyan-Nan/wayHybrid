<template>
    <div id="pageHeader" ref="pageHeader">
      <nav class="title-nav">
        <div class="title-nav-box">
          <div class="title-nav-box-icon" @click="goBack">
            <img src="../../assets/back@3x.png" />
          </div>
          <div class="title-nav-box-right" @click="handleClick">{{tip}}</div>
        </div>
        <div class="title-nav-tip" :class="{movedToTop: movedToTop}">{{ title }}</div>
      </nav>
    </div>
</template>

<script>
import { isAndroid, isIOS } from '@/utils/platform'
export default {
  name: 'pageHeader',
  props: {
    title: {
      type: String,
      default: '请输入标题'
    },
    tip: {
      type: String,
      default: ''
    },
    fromWay: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      offsetMark: 0,
      movedToTop: false
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('on-click', evt)
    },
    goBack () {
      if (this.fromWay) {
        if (isAndroid()) {
          window.glamor.closePage()
          return
        }
        if (isIOS()) {
          this.$device.JsBridge.callHandler('h5LeftBack', {}, (data) => {})
          return
        }
        this.$router.go(-1)
        return
      }
      this.$router.go(-1)
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('scroll', () => {
        this.offsetMark = document.body.scrollTop
        this.movedToTop = (this.offsetMark >= 10)
      })
    })
  }
}
</script>

<style scoped lang="less">

  #pageHeader{
    height: 44px;
    position: fixed;
    background-color: #fff;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    padding: 24px 20px 0 20px;
    .title-nav{
      position: relative;
      .title-nav-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-nav-box-icon{
          img{
            width: 20px;
            height: 18px;
          }
        }
        .title-nav-box-right{
          font-size: 12px;
          color: #2A2A2A;
        }
      }
      .title-nav-tip{
        font-size: 24px;
        color: #2A2A2A;
        position: absolute;
        left: 0;
        top: 41px;
        transform: translateY(23px);
        transition: all .3s;
        font-weight: bolder;
      }
      .movedToTop{
        position: absolute;
        left: 22px;
        top: 50%;
        transform: translateY(-50%) scale(0.666666);
        /*font-size: 16px;*/
      }
    }
  }

</style>
