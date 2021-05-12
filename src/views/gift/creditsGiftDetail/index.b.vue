<template>
    <div id="creditsGiftDetail" v-if="isShowPage">
      <!--头部轮播图-->
      <HeaderSwiper v-if="false" :list="giftInfo.imgList"></HeaderSwiper>
      <!--价格区域-->
      <GiftDesc :name="giftInfo.activityTitle" :price="giftInfo.price" :needJpoint="giftInfo.needJpoint" :cntTotal="giftInfo.cntTotal"></GiftDesc>
      <!--&lt;!&ndash;内容区域&ndash;&gt;-->
      <!--<div class="good-detail" v-html="content"></div>-->
    </div>
</template>

<script>
import { activityDetailApi, giftExchangeApi, shareGetListApi } from '@/api/surprise'
import HeaderSwiper from './HeaderSwiper'
import GiftDesc from './GiftDesc'
import showGiftList from './showGiftList'
export default {
  name: 'creditsGiftDetail',
  components: {
    HeaderSwiper,
    GiftDesc,
    showGiftList
  },
  data () {
    return {
      props: {
        id: '',
        uid: ''
      },
      giftInfo: {},
      isShowPage: false
    }
  },
  created () {
    console.log(giftExchangeApi, shareGetListApi)
    this.props.id = this.$route.query.goodid
    this.props.uid = this.$route.query.uid
    this.getGiftInfo()
  },
  methods: {
    // 请求礼物详情
    getGiftInfo () {
      activityDetailApi(this.props)
        .then(res => {
          console.log('resres', res)
          if (res.data.code == 3021) {
            // 上架状态改为下架
            this.giftInfo.showStat = 0
          }
          if (res.data.code === 2000) {
            res.data.data.cntTotal = res.data.data.cntTotal ? res.data.data.cntTotal * 1 : 0
            Object.assign(this.giftInfo, res.data.data)
          }
          this.isShowPage = true
        })
    }
  }
}
</script>

<style scoped lang="less">
*{
  box-sizing: border-box;
}
  #creditsGiftDetail{
    width: 100%;
  }
</style>
