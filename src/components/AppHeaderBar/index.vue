<template>
  <div class="bar">
    <div class="left">
      <div class="img-wrap">
        <img src="../../assets/IconCopy@3x.png" alt="">
      </div>
      <div class="info">
        <p class="name">光芒App</p>
        <p class="desc">引领时尚的人都在这里</p>
      </div>
    </div>
    <div class="btn-wrap">
      <div class="btn" @click="openApp">打开</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openApp () {
      window.location.href = 'http://url.cn/553SnHV'
    }
  }
}
</script>

<style lang="less" scoped>
.bar {
  width: 100%;
  height: 1.706667rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;
  padding: 0 .533333rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  .left {
    display: flex;
    align-items: center;
    .img-wrap {
      line-height: 1.706667rem;
      width: 1.333333rem;
      height: 1.333333rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      text-align: left;
      color: #fff;
      margin-left: .533333rem;
      .name {
        font-size: .426667rem;
        line-height: .426667rem;
        letter-spacing: .007467rem;
      }
      .desc {
        margin-top: .106667rem;
        font-size: .373333rem;
        line-height: .373333rem;
        font-family: 'PingFangSC-Light';
      }
    }
  }
  .btn-wrap {
   justify-self: flex-end;
    float: right;
    .btn {
      width: 1.6rem;
      height: .8rem;
      line-height: .8rem;
      text-align: center;
      font-size: .373333rem;
      color: #FF5A5F;
      background: #fff;
      border-radius: .133333rem;
    }
  }
}
</style>
