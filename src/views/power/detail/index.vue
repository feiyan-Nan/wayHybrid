  <!-- 积分明细 -->
<template>
  <div class="rootEl">
    <div class="circle-wrapper">
      <div class="circle">
        <x-circle
          :percent="curScore/totalScore * 100"
          :stroke-width="6"
          :trail-width="6"
          :stroke-color="['#36D1DC', '#5B86E5']"
          trail-color="#ececec">
          <span style="color:#36D1DC">{{curScore}}/{{totalScore}} <br>能量值</span>
        </x-circle>
      </div>
    </div>
    <div class="info">
      <div class="item">
        <p class="title">完成进度</p>
        <p class="value">33%</p>
      </div>
      <div class="item">
        <p class="title">当前排名</p>
        <p class="value">853</p>
      </div>
      <div class="item">
        <p class="title">距前一名能量值</p>
        <p class="value">50</p>
      </div>
    </div>
    <div></div>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="left">
          <p class="title">{{item.title}}</p>
          <p class="desc">{{item.time | parseTime}}</p>
        </div>
        <div class="value">
          <p>{{item.score | NumberFormat}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XCircle } from 'vux'
import { parseTime } from '@/filters'
export default {
  data () {
    return {
      curScore: 500,
      totalScore: 1500,
      list: [{
        title: '阅读内容',
        time: 1539936991441,
        score: 100
      }, {
        title: '发布内容加精',
        time: 1539936991441,
        score: 150
      }, {
        title: '发布内容获赞',
        time: 1539936991441,
        score: 10
      }, {
        title: '新增被关在',
        time: 1539936991441,
        score: 20
      }, {
        title: '你奶奶个熊',
        time: 1539936991441,
        score: -2000
      }

      ]
    }
  },
  filters: {
    parseTime (val) {
      return parseTime(val)
    },
    NumberFormat (val) {
      return val * 1 > 0 ? '+' + val : val
    }
  },
  components: {
    XCircle
  }
}
</script>

<style lang="less" scoped>
.rootEl {
  width: 100%;
  overflow-y: scroll;
}
.circle-wrapper {
  width: 100%;
  height: 6.053333rem;
  display: flex;
  vertical-align: center;
  align-items: center;
  .circle{
    margin: 0 auto;
    width: 3.2rem;
    height: 120px;
    text-align: center;
    font-size: 20px;
  }
}
.info{
  width: 100%;
  height: 2.133333rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .item{
    text-align: center;
    .title{
      font-size: .32rem;
    }
    .value{
      margin-top: .266667rem;
      font-size: 16px;
    }
  }
}
.list{
  padding: 0 10px;
  .item{
    display: flex;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #f1f1f1;
    overflow: hidden;
    .left{
      flex: 1;
      .title{
        font-size: 16px;
        color: #ccc;
      }
      .desc{
        margin-top: 8px;
        font-size: 12px;
        color: #ccc;
      }
    }
    .value {
      font-size: 16px;
      color: #222;
    }
  }
}
</style>
