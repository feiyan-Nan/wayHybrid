<template>
    <div id="showGiftList">
      <div class="giftDetail" v-for="(item, index) in list" :key="index">
        <header @click="clickAvatar(item.uid)">
          <div>
            <avatar :src="item.avatar" :isAuth="item.isAuth" :width="40"></avatar>
          </div>
          <div class="name">
            <p>{{item.nickName}}</p>
            <nav v-if="item.isAuth">{{item.org ? item.org : ''}}  {{item.authTitle}}</nav>
            <nav v-else-if="item.signature">{{item.signature}}</nav>
            <nav v-else>{{item.cntFans}}人&nbsp;关注</nav>
          </div>
        </header>
        <main :class="{jingxuan: item.quality > 0}" @click="toDetailView(item.contId, item.detailUrl)">
          <imgShowCenter :src="item.coverSrc"></imgShowCenter>
        </main>
      </div>
    </div>
</template>

<script>
import avatar from '@/components/AVATAR'
import imgShowCenter from '@/components/imgShowCenter'
// 引入工具函数判断平台
import { isAndroid, isIOS } from '@/utils/platform'
export default {
  name: 'showGiftList',
  components: {
    avatar,
    imgShowCenter
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 点击用户头像跳到用户主页
    clickAvatar (uid) {
      if (isAndroid()) {
        try {
          window.glamor.clickAvatar(uid.toString())
        } catch (error) {
          console.log(error)
        }
      }
      if (isIOS()) {
        try {
          this.$device.JsBridge.callHandler('h5ClickAvatar', {uid: uid.toString()}, (data) => {
            // 返回APP端给回的data
            console.log('datadatadata', data)
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
    toDetailView (contId, detailUrl) {
      if (!contId || !detailUrl) return
      if (isAndroid()) {
        try {
          window.glamor.toDetailView(contId, detailUrl)
        } catch (err) {
          console.log(err)
        }
      } else if (isIOS()) {
        try {
          this.$device.JsBridge.callHandler('h5ClickPicture', {detailUrl: detailUrl, contId: contId}, (data) => {})
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  mounted () {
    console.log('showImgsList', this.list)
  }
}
</script>

<style scoped lang="less">
#showGiftList{
  overflow: hidden;
  .giftDetail{
    margin-bottom: 30px;
    &:nth-of-type(odd) {
      float: left;
      padding-left: 20px;
    }
    &:nth-of-type(even) {
      float: right;
      padding-right: 20px;
    }
    header{
      height: 40px;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /*div{*/
        /*float: left;*/
      /*}*/
      .name{
        margin-left: 10px;
        height: 40px;
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        p{
          font-size: 15px;
          color: #2A2A2A;
          max-width: 110px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
        }
        nav{
          font-size: 12px;
          color: #999999;
          letter-spacing: 0;
          max-width: 110px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
        }
      }
    }
    main{
      width: 160px;
      height: 160px;
      margin-top: 15px;
      img{
        width: 160px;
        height: 160px;
      }
    }
    .jingxuan{
      position: relative;
      &::after{
        content: '';
        position: absolute;
        top: 5px;
        right: 5px;
        width: 43px;
        height: 19px;
        background: url("../../../assets/jingxuan@3x.png") no-repeat center;
        background-size: 43px 19px;
      }
    }
  }
}
</style>
