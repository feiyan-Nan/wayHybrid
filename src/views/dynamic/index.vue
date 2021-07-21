<template>
  <div class="rootEl">
    <AppHeaderBar/>
    <quick-loadmore
      ref="vueLoad"
      :bottom-method="handleBottom"
      :bottomDistance="80"
      :disable-bottom="false"
      :disable-top="true"
      style="margin-bottom: 10px;"
    >
      <div class="container">
        <user-info
          :userinfo="dynamicContent"
          @clickAvatar="clickAvatar"
          @clickCared="clickCared"
        />
        <div class="content" v-html="dynamicContent.content"/>
        <ImageList :imageList="dynamicContent.picList"/>
        <RouteMap :wayinfo="dynamicContent"/>
        <div class="box-container">
          <div class="line"></div>
        </div>
        <Operate v-waves :countItem="dynamicContent"/>
        <div class="interval"></div>
      </div>
      <div v-if="dynamicContent.userCommentDTOList" class="comment">
        <div class="comment-title">
          全部评论（{{ dynamicContent.userCommentDTOList.length }}）
        </div>
        <div v-for="item of dynamicContent.userCommentDTOList" :key="item.id">
          <user-info
            :showLike="true"
            :userinfo="item"
            @clickAvatar="clickAvatar"
            @clickCared="clickCared"
          />
          <div class="comment-content">{{ item.content }}</div>
          <div class="comment-line">
            <div class="line"></div>
          </div>
        </div>
        <div class="more-comment" @click="dnApp">
          <div>查看更多评论</div>
          <img src="../../assets/way/dynamic/right-arrow.png"/>
        </div>
      </div>
      <img src="../../assets/way/dynamic/pic.png"/>
    </quick-loadmore>
    <AppBottomBtn/>
  </div>
</template>

<script>
import AppHeaderBar from '@/components/AppHeaderBar'
import AppBottomBtn from '@/components/AppBottomBtn'
import Operate from '@/components/common/operate'
import Loading from '@/components/Loading'
// 引入按钮水波纹指令
import waves from '@/directive/waves'

// 引入Api
import {getDynamicDetailApi} from '@/api/dynamic'
import UserInfo from '@/components/common/userinfo/UserInfo'
import CommentList from '@/components/common/userinfo/CommentList'
import RouteMap from '@/components/common/routeMap'
import ImageList from '@/components/common/ImageList/ImageList'
import avatar from '@/components/AVATAR/'
import {appPkgUrl} from '../../config'

export default {
  components: {
    Operate,
    AppBottomBtn,
    Loading,
    AppHeaderBar,
    avatar,
    UserInfo,
    CommentList,
    RouteMap,
    ImageList
  },
  data() {
    return {
      dynamicId: '',
      dynamicContent: {}
    }
  },
  mounted() {
    this.dynamicId = this.$route.query.id
    getDynamicDetailApi(this.dynamicId).then(res => {
      this.dynamicContent = res
    })
  },
  methods: {
    clickCared() {
      this.dnApp()
    },
    showComment() {
      this.dnApp()
    },
    clickLike() {
      this.dnApp()
    },
    clickAvatar() {
      this.dnApp()
    },
    dnApp() {
      window.location.href = appPkgUrl
    },
    handleBottom() {
      console.log('到底')
    }
  },
  directives: {
    waves
  }
}
</script>

<style lang="less" scoped>
.line {
  box-sizing: border-box;
  border-top: 1px solid #eeeeee;
}

.container {
  margin-top: 76px;
  //padding: 0 14px;
  .content {
    font-size: 14px;
    padding: 0 14px;
    color: #323335;
    line-height: 20px;
    margin-bottom: 8px;
  }

  .box-container {
    padding: 0 14px;
  }

  .interval {
    width: 100%;
    height: 6px;
    background: #f6f6f6;
  }
}

.comment-title {
  padding-top: 16px;
  padding-left: 14px;
  font-size: 14px;
  color: #151515;
  line-height: 20px;
}

.comment-content {
  padding-right: 14px;
  padding-left: 66px;
  font-size: 14px;
  color: #151515;
}

.comment-line {
  padding-top: 16px;
  padding-right: 14px;
  padding-left: 66px;
}

.more-comment {
  display: flex;
  color: #00c584;
  font-size: 14px;
  align-items: center;
  padding: 16px 0 16px 66px;

  img {
    width: 7px;
    height: 12px;
    margin-left: 3px;
  }
}

.loading {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}

.placeholder {
  width: 100%;
  display: block;
}

.video-wrapper-inwx {
  position: relative;
  width: 100%;
  background: #000;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .play-button {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);

    .img-wrap {
      width: 1.2rem;
      height: 1.2rem;
      opacity: 0.7;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
