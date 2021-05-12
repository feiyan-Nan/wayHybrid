<template>
    <div id="imgShowCenter">
      <main>
        <img :src="src" :class="isLongPic ?  'longPicture' :'widthPicture'" />
      </main>
    </div>
</template>

<script>
export default {
  name: 'imgShowCenter',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      baseWidth: 37.5,
      isLongPic: 0
    }
  },
  methods: {
    checkImgDim () {
      if (!this.src) return
      const localIng = new Image()
      localIng.src = this.src
      localIng.onload = () => {
        const height = localIng.height
        const width = localIng.width
        this.isLongPic = width < height
      }
    }
  },
  beforeMount () {
    this.checkImgDim()
  }
}
</script>

<style lang="less" scoped>
#imgShowCenter{
  main{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    img{
      position: absolute;
    }
    .longPicture {
      left: 0;
      top: 50%;
      width: 100%;
      height: auto;
      transform: translate(0, -50%);
    }
    .widthPicture{
      left: 50%;
      top: 0;
      height: 100%;
      width: auto;
      transform: translate(-50%, 0);
    }
  }
}
</style>
