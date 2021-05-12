  <!-- 抽奖明细 -->
<template>
  <div class="root">
    <Header :isFirstPage="true" title="抽奖明细"></Header>
    <Loading v-if="loading" :isFirstPage="true" :hasHeader="true"></Loading>
    <netError v-else-if="isNetError" :isFirstPage="true" :hasHeader="true"></netError>
    <contError v-else-if="isContError" :isFirstPage="true" :hasHeader="true"></contError>
      <div class="pd20">
        <div class="top">
          <p class="text">本期已获得：</p>
          <div class="right">
            <div class="ticket">
              <img src="../../assets/ticket@3x.png" alt="">
              <span>{{ticket}}</span>
            </div>
            <div class="icon">
              <img src="../../assets/point@3x.png" alt="">
              <span>{{point}}</span>
            </div>
          </div>
        </div>
        <div v-if="list && list.length">
          <div class="item" v-for="(item, index) in list" :key="index">
            <p class="str">{{item.drawDetailStr}}</p>
            <p class="time">{{item.drawDateStr}}</p>
          </div>
        </div>
        <div v-else class="empty">你还没有参加本期抽奖，快行动吧！</div>
      </div>
  </div>
</template>

<script>
import { luckyBoxDrawHistoryApi } from '@/api/surprise'
import Loading from '@/components/Loading'
import Header from '@/components/Header'
import contError from '@/components/ErrorPage/contError'
import netError from '@/components/ErrorPage/netError'
export default {
  data () {
    return {
      loading: false,
      isNetError: false,
      isContError: false,

      LuckyId: '',
      uid: '',
      list: [],
      point: 0,
      ticket: 0
    }
  },
  mounted () {
    let LuckyId = this.$route.query.LuckyId
    let uid = this.$route.query.uid
    if (LuckyId && uid) {
      this.LuckyId = LuckyId
      this.uid = uid
      this.requestData({
        uid: this.uid,
        LuckyId: this.LuckyId
      })
    }
  },
  methods: {
    requestData (obj) {
      luckyBoxDrawHistoryApi(obj)
        .then(res => {
          if (res.data.code == 2000) {
            this.point = res.data.data.pointRewarded
            this.ticket = res.data.data.ticketRewarded
            this.list = res.data.data.luckyDrawVoList
          } else {
            this.isContError = true
          }
        })
        .catch(e => {
          this.isNetError = true
          console.log(e)
        })
    }
  },
  components: {
    Header,
    Loading,
    netError,
    contError
  }
}
</script>

<style lang="less" scoped>
.root{
  overflow-y: scroll;
}
.pd20{
  padding: 44px 20px 20px;
}
.top {
  font-size: 18px;
  font-weight: bold;
  color: #2A2A2A;
  letter-spacing: 0;
  line-height: 57px;
  border-bottom: 1px solid rgba(216,216,216, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.right{
  display: flex;
  align-items: center;
}
.ticket{
  margin-right: 20px;
}
.ticket img, .icon img {
  width: 14px;
  height: 14px;
  margin-right: 6px;
}
.ticket span, .icon span{
  color: #FA7268;
  font-size: 18px;
  letter-spacing: 0;
}
.item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 80px;
  border-bottom: 1px solid rgba(216,216,216, 0.2);
  .str{
    font-size: 16px;
    color: #2A2A2A;
  }
  .time{
    font-size: 12px;
    color: #999999;
    text-align: center;
  }
}
.empty{
  font-size: 16px;
  color: #2a2a2a;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40%;
}
</style>
