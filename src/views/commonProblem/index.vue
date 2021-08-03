<template>
  <div id="abouts">
    <header>
      <img alt="" class="headerImg" src="../../assets/way/arrow.png" @click="goBack">
      <span>常见问题</span>
      <span></span>
    </header>
    <ul>
      <li>
        <div class="detail" @click="goDetail('avatarProblem')">
          <div class="left">头像图片审核不通过</div>
          <img alt="" class="right" src="../../assets/way/arrowRight.png">
        </div>
      </li>
      <li>
        <div class="detail" @click="goDetail('changePhoneNumber')">
          <div class="left">更改手机号</div>
          <img alt="" class="right" src="../../assets/way/arrowRight.png">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'commonProblem',
  data () {
    return {
      versonInfo: {}
    }
  },
  methods: {
    goBack () {
      window.app.onBack()
    },
    goDetail (val) {
      this.$router.push({
        path: '/' + val
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}

#abouts {
  height: 100%;
  background-color: #F7F7F7;

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

  ul li {
    padding: 0 20px;
    margin-bottom: 8px;
    background: #FFF;
    height: 54px;
  }

  .detail {
    display: flex;
    height: 54px;
    justify-content: space-between;
    align-items: center;
  }

  .detail .left {
    color: #151515;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
  }

  .detail img {
    width: 18px;
    height: 20px;
  }
}
</style>
