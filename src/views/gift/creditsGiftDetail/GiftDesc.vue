<template>
    <div id="giftDesc">
      <h1 class="giftName">{{name}}</h1>
      <div class="info">
        <div class="price">
          <nav><img src="../../../assets/price@2x.png" />官网价格{{price}}元</nav>
        </div>
        <div>
          <nav><img src="../../../assets/point@3x.png" />{{needJpoint}}积分</nav>
          <span>剩余{{cntTotal}}份</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'giftDesc',
  props: {
    name: {
      type: [String, Number],
      default: ''
    },
    price: {
      type: [String, Number],
      default: 0
    },
    needJpoint: {
      type: [String, Number],
      default: 0
    },
    cntTotal: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }
#giftDesc{
  .giftName{
    font-size: 24px;
    color: #2A2A2A;
    letter-spacing: 0.4px;
    /*line-height: 24px;*/
    margin-left: 44px;
    margin-top: 40px;
    position: relative;
    margin-bottom: 33px;
    &::after{
      content: '';
      width: 4px;
      height: 23px;
      background: #FF5A5F;
      position: absolute;
      left: -23.5px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .info{
    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #2A2A2A;
      padding: 0 30px;
      margin-bottom: 23px;
      img{
        width: 18px;
        height: 18px;
        margin-right: 15px;
      }
      nav{
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
      span{
        font-size: 12px;
        color: #CCCCCC;
        letter-spacing: 0.23px;
        line-height: 12px;
      }
    }
  }
}
</style>
