<template>
  <div class="bar">
    <div class="left">
      <div class="img-wrap">
<!--        <img src="../../assets/IconCopy@3x.png" alt="">-->
      </div>
      <div class="info">
        {{ slogan }}
      </div>
    </div>
    <div class="btn-wrap">
      <div class="btn" @click="openApp">下载APP</div>
    </div>
  </div>
</template>

<script>
import {appPkgUrl} from '../../config'

export default {
  props: {
    slogan: {
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
.bar {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;
  padding: 0 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  .left {
    display: flex;
    align-items: center;
    .img-wrap {
      background: #e2e2e2;
      border-radius: 5px;
      width: 38px;
      height: 38px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      font-size: 15px;
      text-align: left;
      color: #151515;
      margin-left: 12px;
      font-weight: bold;
    }
  }
  .btn-wrap {
    .btn {
      display: flex;
      align-items: center;
      background: #00c584;
      height: 30px;
      padding: 0 10px;
      font-size: 13px;
      text-align: center;
      color: #ffffff;
      border-radius: 17px;
    }
  }
}
</style>
