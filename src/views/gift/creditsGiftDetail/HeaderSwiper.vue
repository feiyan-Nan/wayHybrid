<template>
    <div id="HeaderSwiper" v-if="list.length">
      <span @click="goBack" v-if="false">
        <img src="../../../assets/back@3x.png" />
      </span>
      <swiper :options="swiperOption" refs="swiper">
        <swiper-slide v-for="(item, index) in list" :key="index">
          <img :src="item" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination">{{swiperInfo.currentIndex}}/{{list.length}}</div>
      </swiper>
    </div>
</template>

<script>
// import 'swiper/dist/css/swiper.css'
import { isAndroid, isIOS } from '@/utils/platform'
export default {
  name: 'HeaderSwiper',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    const _this = this
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        autoplay: 2000,
        loop: false,
        resizeReInit: true,
        onSlideChangeEnd (swiper) {
          _this.swiperInfo.currentIndex = swiper.realIndex + 1
        }
      },
      swiperInfo: {
        currentIndex: 1
      }
    }
  },
  methods: {
    goBack () {
      if (isAndroid()) {
        window.glamor.closePage()
        return
      }
      if (isIOS()) {
        this.$device.JsBridge.callHandler('h5LeftBack', {}, (data) => {})
        return
      }
      this.$router.go(-1)
    }
  },
  beforeMount () {
    this.swiperOption.loop = this.list.length > 1
  }
}
</script>

<style scoped lang="less">
#HeaderSwiper{
  height: 456px;
  position: relative;
  span{
    width: 24px;
    height: 24px;
    position: absolute;
    left: 20px;
    top:21px;
    z-index: 8;
    img{
      width: 24px;
      height: 24px;
    }
  }
  .swiper-pagination{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 40px;
    height: 30px;
    background: rgba(255,90,95,0.70);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #FFFFFF;
  }
}
</style>
