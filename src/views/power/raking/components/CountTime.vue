<template>
<div class="root">
  <div class="wrapper" v-if="isOK">
    <div>{{preText}}</div>
    <div>
      <p>{{days}}</p>
      <span>天</span>
    </div>
    <div>
      <p>{{hours}}</p>
      <span>小时</span>
    </div>
    <div>
      <p>{{minutes}}</p>
      <span>分</span>
    </div>
    <div>
      <p>{{seconds}}</p>
      <span>秒</span>
    </div>
  </div>
  <div v-if="isOK" class="timeStr">{{timeStr}} 活动截止</div>
</div>
</template>

<script>
import { parseTime } from '@/filters'
export default {
  props: {
    endTimeStamp: {
      type: Number,
      default: () => {
        return new Date().getTime()
      }
    },
    preText: {
      type: String,
      default: '倒计'
    }
  },
  data () {
    return {
      isOK: false,
      timer: null,
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      timeStr: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.timeStr = parseTime(this.endTimeStamp, `{y}.{m}.{d} {h}:{i}`)
      this.timer = setInterval(() => {
        this.countTime()
      }, 1000)
    },

    countTime () {
      var curTimeStamp = new Date().getTime()
      var diff = parseInt((this.endTimeStamp - curTimeStamp) / 1000, 10) // 秒
      var days = parseInt(diff / 60 / 60 / 24)
      var hours = parseInt(diff / 60 / 60 % 24, 10)
      var minutes = parseInt(diff / 60 % 60, 10)
      var seconds = parseInt(diff % 60, 10)
      this.days = _padZero(days)
      this.hours = _padZero(hours)
      this.minutes = _padZero(minutes)
      this.seconds = _padZero(seconds)
      this.isOK = true
      function _padZero (val) {
        return val < 10 ? '0' + val : val
      }
      if (diff < 1) {
        clearInterval(this.timer)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 100%;
  height: 3.733333rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222;
  span{
    font-size: 12px;
  }
  div{
    display: block;
    text-align: center;
    font-size: .32rem;
  }
  p{
    font-size: .533333rem;
    margin: 0 .106667rem;
    padding: .213333rem;
    border: 1px solid #333;
    border-radius: 5px;
  }
}
.timeStr {
  margin-top: .266667rem;
  font-size: .426667rem;
  text-align: center;
}
</style>
