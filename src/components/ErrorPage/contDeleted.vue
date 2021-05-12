<template>
  <div class="root">
    <div class="cont">
      <div class="img-wrap">
        <img src="../../assets/delete@2x.png" alt="">
      </div>
      <div class="text">该内容已删除</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .root{
    width: 100%;
    height: 100vh;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .img-wrap{
      width: 3.466667rem;
      height: 3.466667rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .text{
      margin-top: 1.333333rem;
      font-size: .426667rem;
      color: #999999;
      letter-spacing: 0;
      text-align: center;
      line-height: .426667rem;
    }
  }
</style>
