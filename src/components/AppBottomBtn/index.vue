<template lang="pug">
  .app-bottom-btn
    .btn-wrap(@click="openApp") {{name}}
</template>

<script>
import {appPkgUrl} from '../../config'

export default {
  props: {
    name: {
      type: String,
      default: '认识顺路的人'
    }
  },
  methods: {
    openApp () {
      window.location.href = appPkgUrl
    }
  }
}
</script>

<style lang="less" scoped>
.app-bottom-btn {
  border-top: 1px solid #f6f6f6;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 67px;
  width: 100%;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn-wrap {
    width: 167px;
    height: 44px;
    background: #00c584;
    border-radius: 22px;
    font-size: 16px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
}

</style>
