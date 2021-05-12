<template>
    <div class="avatar" :style="{width: avaterWidth,height: avaterWidth}">
      <div class="authed" v-if="isAuth" :style="{width: authImgWidth,height: authImgWidth}"></div>
      <div class="avatar-box" :style="{width: avaterWidth,height: avaterWidth}">
        <img v-if="src" :src="src" :class="[{ wide: wide,tall: tall }, 'def']" />
        <img v-else src="../../assets/avatar@3x.png" alt="">
      </div>
    </div>
</template>
<script>
export default {
  name: 'avatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    // 是否是已认证的用户
    isAuth: [Number, Boolean],
    width: {
      type: Number,
      default: 40
    }
  },
  data () {
    return {
      wide: false,
      tall: false
    }
  },
  mounted () {
    this.checkImg()
  },
  computed: {
    authImgWidth: function () {
      return this.width * 14 / 40 / 37.5 + 'rem'
    },
    // 解决移动端小图片圆角不圆的问题
    avaterWidth: function () {
      if (this.width >= 40) {
        return this.width / 37.5 + 'rem'
      } else {
        return this.width + 'px'
      }
    }
  },
  methods: {
    checkImg () {
      if (!this.src) return
      const localIng = new Image()
      localIng.src = this.src
      localIng.onload = () => {
        const height = localIng.height
        const width = localIng.width
        this.wide = width > height || false
        this.tall = !this.wide
      }
    }
  },
  watch: {
    src (val) {
      if (val) {
        this.checkImg()
      }
      return val
    }
  }
}
</script>

<style scoped>
  .avatar{
    /*width: 100%;*/
    /*height: 100%;*/
    width: 40px;
    height: 40px;
    position: relative;
    transform: scale(1);
  }

  .avatar .avatar-box {
    width: 40px;
    height: 40px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    /* border: 1px solid #ffffff; */

  }

  .avatar .authed{
    width: 14px;
    height: 14px;
    position: absolute;
    right: 0;
    bottom: 0;
    /*transform: translate(-50%, -50%);*/
    background: url("../../assets/auth@3x.png") no-repeat center;
    background-size: cover;
    z-index: 9;
  }
  .avatar-box .def{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .avatar-box .wide{
    height: 100%;
    width: auto;
  }
  .avatar-box .tall{
    height: auto;
    width: 100%;
  }

</style>
