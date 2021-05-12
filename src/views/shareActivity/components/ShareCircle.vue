<template lang="pug">
.wrap(@click="shareActivity")
  .circle
    img.share(src="../../../assets/detailShare@3x.png")
</template>

<script>
export default {
  name: 'ShareCircle',
  props: {
    peopleList: {
      type: Array,
      default: () => []
    },
    bg: {
      type: String,
      default: '#FF5A5F'
    },
    isClick: Boolean
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {
    shareActivity () {
      this.$emit('shareActivity')
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  .circle{
    box-sizing: border-box;
    width: 70px;
    height: 70px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,0.10);
    background: #FFFFFF;
    // background: red;
    border-radius: 50%;
    text-align: center;
    padding-top: 25px;
    .share{
      width: 24px;
      height: 24px;
    }
  }
}
</style>
