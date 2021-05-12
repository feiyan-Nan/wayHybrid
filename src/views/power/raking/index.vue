<template>
  <div class="root" v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="30">
    <div class="scroll-wrapper">
      <div class="countTime">
        <CountTime preText="倒数" :endTimeStamp="endTime"></CountTime>
      </div>
      <div class="list">
        <div class="title">
          <p class="p1">排名</p>
          <p class="p2">用户</p>
          <p class="p3">能量值</p>
        </div>
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="score">{{item.score}}</div>
          <div class="info">
            <div class="avatar">
              <div class="img-wrapper">
                <img v-if="item.avatar" src="" alt="">
                <img v-else src="../../../assets/avatar@3x.png" alt="">
              </div>
              <div class="mark">
                <img src="../../../assets/auth@3x.png" alt="">
              </div>
            </div>
            <div class="nickName">{{item.nickName}}</div>
          </div>
          <div class="power">{{item.power}}</div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      <div class="raking">789</div>
      <div class="content">
        <div class="avatar">
          <div class="img-wrapper">
            <img src="../../../assets/avatar@3x.png" alt="">
          </div>
        </div>
        <div class="info">
          <div class="name">大顶子</div>
          <div class="desc">距离前一名500积分</div>
        </div>
      </div>
      <div class="power">15000</div>
    </div>
  </div>
</template>

<script>
import CountTime from './components/CountTime'
export default {
  data () {
    return {
      endTime: 1542618318000,
      list: [{
        avatar: '',
        nickName: 'Kach',
        power: 15000,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }, {
        avatar: '',
        nickName: 'Jam',
        power: 1500,
        score: 1,
        hasGift: 1
      }]
    }
  },
  methods: {
    loadMore () {
      console.log('加载')
    }
  },
  components: {
    CountTime
  }
}
</script>

<style lang="less" scoped>
.root{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.countTime {
  width: 100%;
  background: #f3f3f3;
}
.scroll-wrapper{
  width: 100%;
  height: 100%;
}
.list{
  width: 100%;
  margin-top: 20px;
  .title{
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #ccc;
    .p1 {
      flex: 0 0 80px;
    }
    .p2{
      flex: 1;
      text-align: left;
    }
    .p3{
      flex: 0 0 50px;
    }
  }
  .item{
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    .score {
      flex:  0 0 40px;
      width: 40px;
      text-align: center;
      font-size: 16px;
      color: #666;
    }
    .info{
      flex: 1;
      display: flex;
      align-items: center;
      .avatar{
        position: relative;
        display: inline-block;
        .img-wrapper{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .mark{
          position: absolute;
          width: 16px;
          height: 16px;
          top: 0;
          left: 0;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .nickName{
        display: inline-block;
        margin-left: 10px;
        font-size: 16px;
        color: #222;
        line-height: 60px;
      }
    }
    .power{
      flex: 0 0 80px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
  }
}
.footer{
  width: 100%;
  height: 70px;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #ccc;
  display: flex;
  justify-content: space-between;
  .raking{
    flex: 0 0 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-items: center;
    .avatar{
      width: 60px;
      height: 60px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      margin-left: 10px;
      .name {
        font-size: 18px;
        color: #222;
      }
      .desc {
        margin-top: 4px;
        font-size: 14px;
        color: #666;
      }
    }
  }
  .power {
    flex: 0 0 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
