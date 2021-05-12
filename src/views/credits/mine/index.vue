<template >
  <div id="mine" ref="mine">

    <pageHeader :fromWay="true" ref="pageHeader" @on-click="jump" title="积分" tip="积分规则" />
    <div class="mine" ref="integral">{{cntJpointStr}}</div>

  <!--.tabs-->
    <!--.tab-item( :class="{'tab-item-active': index == activeIndex}" @click="clickItem(index)" v-for="(item, index) in tabs" :key="item") {{ item }}-->

    <div class="tabs" ref="tabs">
      <div class="tab-item" :class="{'tab-item-active': index == activeIndex}" @click="clickItem(index)" v-for="(item, index) in tabs" :key="item">
        {{ item }}
      </div>

    </div>

    <div class="container">
      <section v-if="detail.length == 0">您还没有获取积分，点击「发现惊喜」开启获取积分</section>
      <scroller :on-refresh="refresh" refreshText="" :on-infinite="infinite" height="350" v-if="detail.length > 0">
        <ul>
          <li v-for="(item, index) in detail" :key="index" v-if="detail.length > 0">
            <p>{{ item.title }}</p>
            <div><span>{{ item.createDateStr }}</span><b>{{ item.jpointStr }}</b></div>
          </li>
        </ul>
      </scroller>

    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import VueScroller from 'vue-scroller'
import pageHeader from '../../../components/pageHeader'
import { myJpointHeadApi, myJpointDetailApi } from '@/api/surprise'
Vue.use(VueScroller)
export default {
  name: 'mine',
  data () {
    return {
      tabs: ['全部', '收入', '支出'],
      activeIndex: 0,
      scrollerHeight: 0,
      cntJpoint: 0,
      cntJpointStr: '',
      info: {
        allInfoNum: 1,
        inComeNum: 1,
        expenditureNum: 1,
        allInfoDetail: [],
        inComeNumDetail: [],
        expenditureDetail: []
      },
      isShow: false,
      types: ['allInfoNum', 'inComeNum', 'expenditureNum'],
      detailTypes: ['allInfoDetail', 'inComeNumDetail', 'expenditureDetail']
    }
  },
  components: {
    pageHeader
  },
  methods: {
    refresh (done) {
      done()
    },
    // 下拉刷新
    infinite (done) {
      const type = this.activeIndex
      this.getIntegralDetail(type, done)
    },
    clickItem (index) {
      this.activeIndex = index
    },
    getScrollerHeight () {
      const integral = this.$refs.integral.offsetHeight
      const tabs = this.$refs.tabs.offsetHeight
      const clientHeight = document.body.offsetHeight
      const pageHeader = this.$refs.pageHeader.$el.offsetHeight
      let diff = clientHeight - integral - tabs - pageHeader
      this.scrollerHeight = diff
    },
    getIntegral () {
      myJpointHeadApi({uid: this.uid}).then(res => {
        console.log('res', res)
        if (res.status == 200 && res.data.code == 2000) {
          this.cntJpoint = res.data.data.cntJpoint
          this.cntJpointStr = res.data.data.cntJpointStr
        }
      })
    },
    getIntegralDetail (type, done) {
      const props = {
        uid: this.uid,
        pageNum: this.info[this.types[type]],
        type: type
      }
      myJpointDetailApi(props).then(res => {
        this.info[this.types[type]] += 1
        if (res.status == 200 && res.data.code == 2000) {
          const data = res.data.data
          if (data.length == 0) {
            done && done('finishInfinite')
            return
          }
          const detailType = this.detailTypes[type]
          this.info[detailType].push(...res.data.data)
          done && done()
        }
      })
    },
    jump () {
      this.$router.push({
        path: '/credits/rule'
      })
    }
  },
  created () {
    this.getIntegral()
    this.tabs.forEach((item, index) => {
      this.getIntegralDetail(index)
    })
  },
  mounted () {
    this.getScrollerHeight()
  },
  computed: {
    uid () {
      return this.$route.query.uid
    },
    detail () {
      return this.info[this.detailTypes[this.activeIndex]]
    }
  }

}
</script>

<style scoped lang="less">
  #mine{
    .title-nav{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 24px 20px 0 20px;
      .title-nav-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-nav-box-icon{
          img{
            width: 20px;
            height: 18px;
          }
        }
        .title-nav-box-center{

        }
        .title-nav-box-right{
          font-size: 12px;
          color: #2A2A2A;
        }
      }
      .title-nav-tip{
        font-size: 24px;
        color: #2A2A2A;
        position: absolute;
        left: 20px;
        top: 100%;
        transform: translateY(23px);
        transition: all 2s;
      }
      .movedToTop{
        position: absolute;
        left: 50%;
        top: calc(50% + 12px);
        transform: translate(-50%, -50%);
        font-size: 16px;
      }
    }

    .mine{
      font-size: 36px;
      color: #2A2A2A;
      letter-spacing: 0.5px;
      margin-left: 20px;
      padding-top: 120px;
    }

    .tabs{
      margin: 0 20px;
      margin-top: 80px;
      border-bottom: 1px solid #979797;
      /*border-bottom: 1px solid #D8D8D8;!*px*!*/
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      font-size: 14px;
      color: #000000;
      .tab-item{
        margin-right: 35.5px;
        padding-bottom: 11px;
        position: relative;
      }
      .tab-item-active{
        &::after{
          content: '';
          position: absolute;
          top: calc(100% - 3px);
          left: 0;
          width: 100%;
          height: 4px;
          background: #ED2A33;
        }
      }
    }

    .container{
      position: relative;
      section{
        font-size: 15px;
        color: #2A2A2A;
        letter-spacing: -0.5px;
        line-height: 15px;
        padding: 30px 20px 0 20px;
      }
      ul{
        padding: 30px 20px 0 20px;
        li{
          height: 57px;
          margin-bottom: 30px;
          p{
            font-size: 15px;
            color: #2A2A2A;
            margin-bottom: 15px;
            white-space: nowrap;
            text-overflow:ellipsis;
            overflow: hidden;
          }
          div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
              font-size: 12px;
              color: #999990;
            }
            b{
              font-size: 18px;
              color: #ED2A33;
            }
          }
        }
      }
    }

  }

</style>
