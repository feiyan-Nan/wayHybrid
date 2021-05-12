  <!-- 我的积分 -->
<template>
  <div class="root">
    <HeaderWithLink :isFirstPage="true" title="我的积分" linkTitle="积分规则" link="/credits/rule"></HeaderWithLink>
    <Loading v-if="loading" :isFirstPage="true" :hasHeader="true"></Loading>
    <netError v-else-if="isNetError" :isFirstPage="true" :hasHeader="true"></netError>
    <contError v-else-if="isContError" :isFirstPage="true" :hasHeader="true"></contError>
    <div v-else class="other-wrap">
      <div class="banner">
        <div class="circie">{{cntJpoint}}</div>
        <div class="tips">
          <!-- <span v-if="cntHistoryJpoint > 0">
            历史累计获得{{cntHistoryJpoint}}积分,超过{{overManyUser}}的用户
          </span> -->
          <!-- <span v-else>
            历史累计获得0积分,快去获取积分换礼物！
          </span> -->
        </div>
      </div>
      <div class="tab">
        <tab :line-width=2 active-color='#FF5A5F'>
          <tab-item class="vux-center" selected @on-item-click="switchTab(0)">全部</tab-item>
          <tab-item class="vux-center" @on-item-click="switchTab(1)">收入</tab-item>
          <tab-item class="vux-center" @on-item-click="switchTab(2)">支出</tab-item>
        </tab>
      </div>
    </div>
    <div class="content" v-show="tabStatus == 0" ref="content0" :style="{height: contentHeight}">
      <quick-loadmore  ref="vueLoad0"
          :bottom-method="handleBottom"
          :disable-top="true"
          :disable-bottom="false">
          <div v-if="allList.length == 0" class="empty">暂无明细</div>
          <div class="item" v-for="(item, index) in allList" :key="index">
            <div class="context">
              <div class="title">{{item.title}}</div>
              <div class="time">{{item.createDateStr}}</div>
            </div>
            <div class="score">{{item.jpointStr}}</div>
          </div>
        </quick-loadmore>
      </div>
    <div class="content" v-show="tabStatus == 1" ref="content1" :style="{height: contentHeight}">
      <quick-loadmore  ref="vueLoad1"
          :bottom-method="handleBottom"
          :disable-top="true"
          :disable-bottom="false">
          <div v-if="inList.length == 0" class="empty">暂无明细</div>
          <div class="item" v-for="(item, index) in inList" :key="index">
            <div class="context">
              <div class="title">{{item.title}}</div>
              <div class="time">{{item.createDateStr}}</div>
            </div>
            <div class="score">{{item.jpointStr}}</div>
          </div>
        </quick-loadmore>
      </div>
      <div class="content" v-show="tabStatus == 2" ref="content2" :style="{height: contentHeight}">
      <quick-loadmore  ref="vueLoad2"
          :bottom-method="handleBottom"
          :disable-top="true"
          :disable-bottom="false">
          <div v-if="outList.length == 0" class="empty">暂无明细</div>
          <div class="item" v-for="(item, index) in outList" :key="index">
            <div class="context">
              <div class="title">{{item.title}}</div>
              <div class="time">{{item.createDateStr}}</div>
            </div>
            <div class="score">{{item.jpointStr}}</div>
          </div>
        </quick-loadmore>
      </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import contError from '@/components/ErrorPage/contError'
import netError from '@/components/ErrorPage/netError'
import { setCookie } from '@/utils/cookie'
import HeaderWithLink from '@/components/HeaderWithLink'
import { Tab, TabItem } from 'vux'
import { myJpointHeadApi, myJpointDetailApi } from '@/api/surprise'
export default {
  data () {
    return {
      loading: false,
      isNetError: false,
      isContError: false,
      contentHeight: 'auto',
      uid: '',
      pageNumAll: 1,
      pageNumIn: 1,
      pageNumOut: 1,
      cntJpoint: 0, // 我的积分
      cntHistoryJpoint: 0, // 我的历史积分
      overManyUser: '0%',
      tabStatus: 0,
      allList: [],
      inList: [],
      outList: []
    }
  },
  mounted () {
    this.contentHeight = this.$refs.content0.offsetHeight + 'px'
    var uid = this.$route.query.uid
    if (uid) {
      this.uid = uid
      setCookie('uid', uid)
      // this.requestData({uid: this.uid, pageNum: this.pageNumAll, type: this.tabStatus})
      this.getMyIntegral()
      this.requestHeaderData()
    } else {
      this.$vux.toast.text('参数缺失')
    }
  },
  methods: {
    handleBottom () {
      const key = ['pageNumAll', 'pageNumIn', 'pageNumOut'][this.tabStatus]
      const types = [0, 1, 2]
      this[key] += 1
      const formData = {
        uid: this.uid,
        pageNum: this[key],
        type: this.tabStatus
      }

      if (types.includes(this.tabStatus)) {
        this.requestData(formData)
      }
    },
    switchTab (val) {
      if (this.tabStatus == val) {
        return
      }
      this.tabStatus = val

      const key = ['pageNumAll', 'pageNumIn', 'pageNumOut'][val]
      const formData = {
        uid: this.uid,
        type: this.tabStatus,
        pageNum: this[key]
      }
      const isRightType = [0, 1, 2].includes(val)
      const list = ['allList', 'inList', 'outList'][val]
      if (isRightType && !this[list].length) {
        this.requestData(formData)
      }
    },
    // 先请求三次
    getMyIntegral () {
      const keys = ['pageNumAll', 'pageNumIn', 'pageNumOut']
      const formData = {
        uid: this.uid
      }
      keys.forEach((item, index) => {
        const props = Object.assign({}, formData, {
          pageNum: this[item],
          type: index
        })

        myJpointDetailApi(props).then(res => {
          if (res.data.code == 2000) {
            const ref = ['vueLoad0', 'vueLoad1', 'vueLoad2'][index]
            const flag = res.data.data.length != 0
            const list = ['allList', 'inList', 'outList'][index]
            this[list].push(...res.data.data)
            this.$nextTick(() => {
              this.$refs[ref].onBottomLoaded(flag)
            })
          }
        })
      })
    },
    //  我的积分支出明细
    requestData (obj) {
      console.log('request')
      myJpointDetailApi(obj)
        .then(res => {
          if (res.data.code === 2000) {
            const ref = ['vueLoad0', 'vueLoad1', 'vueLoad2'][this.tabStatus]
            const list = ['allList', 'inList', 'outList'][this.tabStatus]
            const flag = res.data.data.length != 0
            this[list].push(...res.data.data)
            this.$nextTick(() => {
              this.$refs[ref].onBottomLoaded(flag)
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 请求头部信息
    requestHeaderData () {
      this.loading = true
      myJpointHeadApi({uid: this.uid})
        .then(res => {
          this.loading = false
          if (res.data.code === 2000) {
            this.cntJpoint = res.data.data.cntJpoint
            this.cntHistoryJpoint = res.data.data.cntHistoryJpoint
            this.overManyUser = res.data.data.overManyUser
          } else {
            this.isContError = true
          }
        })
        .catch(_ => {
          this.loading = false
          this.isNetError = true
        })
    }
  },
  components: {
    Tab,
    TabItem,
    HeaderWithLink,
    Loading,
    netError,
    contError
  }
}
</script>
<style lang="less" scoped>
.root{
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.ohter-wrap{
  height: 7.2rem;
}
.banner{
  margin-top: 44px;
  overflow: hidden;
  width: 100%;
  height: 4.8rem;
  background: url('../../../assets/Oval@3x.png') no-repeat;
  background-size: cover;
  .circie {
    margin: .533333rem auto 0;
    text-align: center;
    width: 3.013333rem;
    height: 3.013333rem;
    line-height: 3.013333rem;
    color: #FF5A5F;
    font-size: .8rem;
    background: url('../../../assets/OvalCopy2@3x.png') no-repeat;
    background-size: cover;
  }
  .tips {
    font-size: 12px;
    color: #fff7f7;
    text-align: center;
    margin-top: .266667rem;
  }
}
.tab{
  padding: 0 10px;
}
.content {
  -webkit-overflow-scrolling: touch;
  position: relative;
  overflow: scroll;
  padding: 0 10px;
  flex: 1;
  .loading{
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .empty {
    font-size: 16px;
    color: #999;
    text-align: center;
    margin-top: 30px;
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 60px;
    border-bottom: 1px solid #f1f1f1;
    .context {
      flex: 1;
      .title {
        -webkit-line-clamp: 1;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        white-space: normal;
        font-size: 14px;
        color: #2a2a2a;
      }
      .time {
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }
    }
    .score {
      padding-left: 20px;
      text-align: center;
      flex: 0 0 40px;
      font-size: 20px;
      color: #FF5A5F;
    }
  }
}
</style>
