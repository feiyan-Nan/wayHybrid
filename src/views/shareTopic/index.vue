<template>
  <div class="activy-root">
    <div class="conten">
      <quick-loadmore
        ref="vueLoad"
        :bottom-method="handleBottom"
        :bottomDistance="80"
        :disable-bottom="false"
        :disable-top="true"
        style="margin-bottom: 10px;"
      >
        <AppHeaderBar slogan="上班族的邂逅神器"/>
        <div class="topic">
          <img src="../../assets/way/huati2@2x.png"/>
          <img class="topic-title-pic" src="../../assets/way/#@2x.png"/>
          <div class="topic-title">{{ topicInfo.topicName }}</div>
          <div class="topic-number">
            {{ topicInfo.interactivUsers }}人<span>正在参与</span>
          </div>
          <div class="attention" @click="openApp">
            <img src="../../assets/way/+@2x.png"/>
            <span>关注</span>
          </div>
        </div>
        <div v-for="(item, index) in recommendContent" :key="index">
          <div class="avatar-message">
            <user-info
              :userinfo="item"
              @clickAvatar="clickAvatar"
              @clickCared="clickCared"
            />
            <div class="content">{{ item.content }}</div>
            <ImageList :imageList="item.picList"/>
            <RouteMap :wayinfo="item"/>
            <div class="box-container">
              <div class="line"></div>
            </div>
            <Operate v-waves :countItem="item"/>
            <div class="interval"></div>
          </div>
        </div>

      </quick-loadmore>
      <!-- 活动没开始，这里不能分享，所以这里只有晒图或报名的状态 -->
    </div>
  </div>
</template>

<script>
import AppHeaderBar from '@/components/AppHeaderBar'
import {getContListApi, getEventDetailApi} from '@/api/topic'
import waves from '@/directive/waves'
import RouteMap from '@/components/common/routeMap'
import UserInfo from '@/components/common/userinfo/UserInfo'
import MorePeople from '@/components/common/userinfo/MorePeople'
import ItemInfo from '@/views/shareActivity/components/ItemInfo'
import Operate from '@/components/common/operate'
import ImageList from '@/components/common/ImageList/ImageList'
import {appPkgUrl} from '../../config'

export default {
  components: {
    AppHeaderBar,
    Operate,
    UserInfo,
    RouteMap,
    ImageList,
    MorePeople,
    ItemInfo
  },
  data () {
    return {
      topicId: '',
      topicInfo: {},
      recommendContent: [],
      currentPage: 1
    }
  },
  mounted () {
    let topicId = this.$route.query.topicId
    if (topicId) {
      this.topicId = topicId
      this.getCont(topicId)
      this.getList(this.currentPage, topicId)
    } else {
      this.$vux.toast.text('参数错误')
    }
  },
  methods: {
    clickCared () {
      this.openApp()
    },
    clickAvatar () {
      this.openApp()
    },
    doApp () {
      this.openApp()
    },
    // 分享
    openApp () {
      window.location.href = appPkgUrl
    },
    handleBottom () {
      this.isHandleBottom = true
      this.pageNum += 1
      this.getList({
        account: '0',
        eventId: this.eventId,
        pageNum: this.pageNum,
        originalTime: this.originalTime
      })
    },
    getList (currentPage, topicId) {
      getContListApi(currentPage, topicId).then(res => {
        this.recommendContent = res.d.userDynamicDTOList
      })
    },
    getCont (topicId) {
      getEventDetailApi(topicId).then(res => {
        this.topicInfo = res.d.info
        this.isLoading = false
      })
    }
  },

  directives: {
    waves
  }
}
</script>
<style lang="less">
.activy-root {
  .my-bullet {
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    display: inline-block;
    background: #d7d7d7;
  }

  .my-bullet-active {
    background: #2a2a2a;
  }

  // .vsim-load-content{
  //   // padding-bottom: 50px;
  // }
}
</style>
<style lang="less" scoped>
.conten {
  box-sizing: border-box;
  margin-top: 60px;
  // padding-top: 1.706667rem;
  overflow: scroll;
  width: 100%;
  height: 100%;

  .topic {
    position: relative;
    height: 76px;
    color: #ffffff;

    img {
      width: 100%;
    }

    .topic-title-pic {
      position: absolute;
      top: 19px;
      left: 14px;
      width: 20px;
      height: 20px;
    }

    .topic-title {
      position: absolute;
      top: 15px;
      left: 42px;
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
      line-height: 28px;
    }

    .topic-number {
      position: absolute;
      bottom: 12px;
      line-height: 17px;
      left: 15px;
      font-size: 10px;

      span {
        font-size: 8px;
      }
    }

    .attention {
      position: absolute;
      top: 27px;
      right: 14px;
      width: 68px;
      height: 30px;
      background: #ffffff;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bolder;
      color: #00c584;

      img {
        margin-right: 4px;
        width: 12px;
      }
    }
  }

  .avatar-message {
    margin-bottom: 6px;
  }

  .content {
    font-size: 14px;
    padding: 0 14px;
    color: #323335;
    line-height: 20px;
    margin-bottom: 8px;
  }

  .interval {
    width: 100%;
    height: 6px;
    background: #F6F6F6;
  }
}

</style>
