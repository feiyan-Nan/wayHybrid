<template lang="pug">
  .container(@click="handleGallaryClick")
    .wrapper
      swiper(:options="swiperOptions" ref='mySwiper')
        swiper-slide(v-for="(item, index) of imgUrls" :key="index")
          img.gallay-img(:src="item.src" :style="{marginTop: item.marginTop + 'rem'}")
        <!-- Optional controls -->
        .swiper-pagination(slot="pagination")
      //- img.close(@click="handleGallaryClick" src="../../../assets/close1.png")
</template>

<script>
export default {
  name: 'CommonGallary',
  props: {
    imgUrls: {
      type: Array,
      default: () => []
    },
    pictrueIndex: {
      type: Number,
      default: 1
    }
  },
  mounted () {
    console.log('挂载了')
    console.log($)
    console.log(this.pictrueIndex)
    this.$nextTick(function () {
      this.$refs.mySwiper.swiper.slideTo(this.pictrueIndex, 0, true)
    })
  },
  data () {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        observeParents: true,
        centeredSlides: true,
        observer: true
      }
    }
  },
  methods: {
    handleGallaryClick () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
.container .swiper-container{
  overflow: inherit;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  .wrapper{
    width: 100%;
    .swiper-pagination{
      position: fixed;
      top: 5px;
      color: #ffffff;
      font-size: 12px;
    }
  }
  .close{
    font-weight: 300;
    position: fixed;
    left: 5px;
    top: 10px;
    width: 40px;
    height: 40px;
    z-index: 10000;
  }
}
</style>
