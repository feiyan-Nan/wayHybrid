<template>
  <header>
    <img alt="" class="headerImg" src="../../assets/way/arrow.png" @click="goBack">
    <span>{{ title }}</span>
    <span></span>
  </header>
</template>

<script>
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
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">

header {
  margin-bottom: 6px;
  height: 50px;
  padding: 0 36px 0 20px;
  background: #FFF;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #151515;
    font-weight: 500;
    font-size: 18px;
    font-family: PingFangSC-Regular;
  }

  .headerImg {
    display: block;
    width: 16px;
    height: 18px;
  }
}

</style>
