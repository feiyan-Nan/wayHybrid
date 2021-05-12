<template>
  <div id="sharePersonal">

    <scroller noDataText="Sky is the limit." :height="windowHeight" ref="scroller"  v-if="isShowPage" refreshText="" :on-infinite="infinite" >
      <div>
        <!--头部接口调试完毕-->
        <header class="sharePersonal-header" >
          <div class="header-info">
            <h1>{{ownInfo.nickName}}</h1>
            <h2 v-if="ownInfo.isAuth == 1">{{ownInfo.org}} {{ownInfo.title}}</h2>
            <h2 v-else-if="ownInfo.isAuth == 0&&ownInfo.signature.length>0">{{ownInfo.signature}}</h2>
            <h2 v-else-if="ownInfo.isAuth == 0 && ownInfo.signature.length == 0">如果你还没关注我,快点一下关注嘛</h2>
            <h2>光芒号：{{uid}}</h2>
            <h4 v-if="userFollowInfo.length == 0">TA有点神秘</h4>
            <h4 v-else>
              <span v-html="userInfo"></span>
            </h4>
          </div>
          <!--右上角分享图标-->
          <div class="shareBtn" v-if="false" @click="openApp"></div>
          <main class="sharePersonal-main">
            <nav class="avatar">
              <!--头像-->
              <avatar :src="ownInfo.shareImgUrl" :width="110" :isAuth="ownInfo.isAuth"></avatar>
            </nav>
            <div class="followInfo">
              <div class="followInfo-box">
                <div class="follow-btn" @click="openApp">
                  <!--<img src="../../assets/jiahaoyou@3x.png" alt="">-->
                  + <span>关注</span>
                </div>
                <div class="follow-detail">
                  <figure>
                    <p>{{ownInfo.cntLike}}</p>
                    <span>被喜欢</span>
                  </figure>
                  <figure>
                    <p>{{ownInfo.fansCnt}}</p>
                    <span>粉丝</span>
                  </figure>
                  <figure>
                    <p>{{ownInfo.cntFollow}}</p>
                    <span>关注</span>
                  </figure>
                </div>
              </div>
            </div>
          </main>
        </header>

        <div  class="topHeader" v-if="isTopHeaderShow">
          <h2>{{ownInfo.nickName}}</h2>
          <p>光芒号：{{uid}}</p>
        </div>

        <!--文章状态-->
        <div class="box" v-for="(list, index) in lists" :key="index">
          <div class="main-box" v-if="list.year.length">
            <div class="date year">{{list.year}}</div>
          </div>
          <div class="main-box">
            <div class="date">
              {{list.date}}
              <p>{{list.time}}</p>
            </div>
            <div class="content" @click="openApp" :class="list.quality > 0 ? 'jingxuan' : ''">
              <!--一张图片的时候-->
              <div class="singleImg" :class="list.type=='video' ? 'isvideo': ''"  v-if="list.imgs.length == 1">
                <imgShowCenter :src="list.imgs[0].src"></imgShowCenter>
              </div>
              <!--多张图片的时候-->
              <div v-if="list.imgs.length > 1" class="moreImg">
                <div v-for="(img, num) in list.imgs" :key="num" >
                  <imgShowCenter :src="img.src"></imgShowCenter>
                </div>
                <nav>{{list.long}}</nav>
              </div>
              <p class="title" v-if="list.type == 'article'">{{list.title}}</p>

              <div class="blend-title" v-if="list.eventCoverSrc.length">
                <!--<img :src="list.eventCoverSrc" />-->
                <!--<nav>-->
                  <!--<imgShowCenter :src="list.eventCoverSrc"></imgShowCenter>-->
                <!--</nav>-->
                <section>
                  <imgShowCenter :src="list.eventCoverSrc"></imgShowCenter>
                </section>
                <span>{{list.eventTitle}}</span>
              </div>
              <p class="cont">{{list.cont}}</p>
              <nav>
                <span><img src="../../assets/shoucangheise@3x.png" />{{list.cntFav || '收藏'}}</span>
                <span><img src="../../assets/pinglunheise@3x.png" />{{list.cntCommentStr || '评论'}}</span>
                <span><img src="../../assets/xihuanheise@3x.png" />{{list.cntLikeStr || '喜欢'}}</span>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </scroller>

  </div>
</template>

<script>
import Vue from 'vue'
import VueScroller from 'vue-scroller'
import { infoApi, contListApi } from '@/api/personalPage'
import avatar from '@/components/AVATAR/'
import imgShowCenter from '@/components/imgShowCenter/'
Vue.use(VueScroller)
export default {
  name: 'sharePersonal',
  components: {
    avatar,
    imgShowCenter
  },
  data () {
    return {
      uid: '',
      ownInfo: {},
      isShowPage: false,
      gender: ['', '男', '女'],
      getListProps: {
        pageNum: 1
      },
      lists: [],
      isTopHeaderShow: false,
      windowHeight: '',
      isFull: false
    }
  },
  created () {
    this.uid = this.$route.query.uid
    this.windowHeight = String(window.innerHeight)
    this.getOwnerInfo()
  },
  methods: {
    // 获取自己的信息
    getOwnerInfo () {
      const props = {
        targetUid: this.uid,
        account: this.uid
      }
      infoApi(props).then(res => {
        if (res.status == 200 && res.data.code == 2000) {
          Object.assign(this.ownInfo, res.data.data)
          this.isShowPage = true
        }
      })
    },
    checkDom () {
      // 兼容下拉刷新样式
      const el = this.$refs.scroller.$el
      const load = el.getElementsByClassName('loading-layer')[0]
      load.style.display = 'none'
      const box = el.getElementsByClassName('_v-content')[0]
      const lastChild = box.children[box.children.length - 1]
      const lastChildClassName = box.children[box.children.length - 1].getAttribute('class')

      if (lastChildClassName !== 'mark') {
        console.log('不存在的时候创建')
        let para = document.createElement('p')
        para.setAttribute('class', 'mark')
        let node = document.createTextNode('加载中...')
        para.appendChild(node)
        para.style.textAlign = 'center'
        para.style.fontSize = '0.4266666rem'
        box.appendChild(para)
      }
      if (this.isFull) {
        console.log('完毕')
        load.style.display = 'block'
        lastChild.style.display = 'none'
      }
    },
    // 获取文章列表信息
    getLists (num, done) {
      if (this.isFull) {
        return
      }
      contListApi({
        targetUid: this.uid,
        pageNum: num
      }).then(res => {
        if (res.status == 200 && res.data.code == 2000) {
          const data = res.data.data
          if (data.length == 0) {
            this.isFull = true
            this.checkDom()
            done && done('finishInfinite')
            return
          }
          data.forEach(item => {
            const now = new Date()
            const publishDate = new Date(item.publishDate)
            const time = `${publishDate.getHours()}:${publishDate.getMinutes()}`
            const cntFav = Number(item.cntFav)
            const cntCommentStr = Number(item.cntCommentStr)
            const cntLikeStr = Number(item.cntLikeStr)
            let date = `${publishDate.getMonth() + 1}月${publishDate.getDate()}日`
            let fullYear = publishDate.getFullYear()
            let year = fullYear !== now.getFullYear() ? fullYear : ''
            if (publishDate.toDateString() == now.toDateString()) {
              date = '今天'
            }
            if (fullYear == now.getFullYear() && publishDate.getMonth() == now.getMonth() && publishDate.getDate() !== now.getDate()) {
              if ((now.getDate() - publishDate.getDate()) == 1) {
                date = '昨天'
              }
            }
            let {eventCoverSrc, eventSubTitle, eventTitle} = item
            const props = {
              time,
              year,
              date,
              cntFav,
              cntCommentStr,
              cntLikeStr,
              eventCoverSrc,
              eventSubTitle,
              eventTitle
            }

            console.log('propsprops', props)
            // 判断发布的东西是状态的时候
            if (item.contType == 0) {
              // 是图文状态的时候
              if (item.timelineType == 0) {
                console.log('图文', JSON.parse(item.content))
                const images = JSON.parse(item.content).images
                const multi = images.length > 3
                const imgs = multi ? images.slice(0, 4) : [JSON.parse(item.coverSrc)]
                const cont = JSON.parse(item.content).text
                Object.assign(props, {
                  type: 'images',
                  imgs,
                  cont,
                  long: images.length
                })
              }
              // 视频状态的时候
              if (item.timelineType == 1) {
                const imgs = [JSON.parse(item.coverSrc)]
                const cont = JSON.parse(item.content).text
                Object.assign(props, {
                  type: 'video',
                  imgs,
                  cont
                })
                console.log('视频', item.content)
              }
            }
            // 判断发布的东西是文章的时候
            if (item.contType == 1) {
              const title = item.title
              const imgs = [JSON.parse(item.coverSrc)]
              const cont = item.contAbstract
              Object.assign(props, {
                type: 'article',
                title,
                imgs,
                cont
              })
              console.log('文章imgs', imgs)
            }
            this.lists.push(props)
          })
          done && done('finishInfinite')
        }
      })
    },
    openApp () {
      window.location.href = 'http://url.cn/553SnHV'
    },
    infinite (done) {
      this.checkDom()
      if (this.isFull) {
        done && done('finishInfinite')
        return
      }
      this.getLists(this.getListProps.pageNum++, done)
    }
  },
  computed: {
    userFollowInfo () {
      const iconB = `<img style="width: 6px" src="${require('../../assets/B@3x.png')}">`
      const iconG = `<img style="width: 6px" src="${require('../../assets/G@3x.png')}">`
      const gender = ['', iconB, iconG][this.ownInfo.sex]
      // 1：白羊座，2：金牛座，3：双子座，4：巨蟹座，5：狮子座，6：处女座，7：天枰座，8：天蝎座，9：射手座，10：摩羯座，11：水瓶座，12：双鱼座
      const star = [
        '',
        '白羊座',
        '金牛座',
        '双子座',
        '巨蟹座',
        '狮子座',
        '处女座',
        '天枰座',
        '天蝎座',
        '射手座',
        '摩羯座',
        '水瓶座',
        '双鱼座'
      ][this.ownInfo.starSign]
      const regionStr = this.ownInfo.regionStr
      const arr = Array.from(new Set([gender, star, regionStr]))
      let result = []
      if (arr.length) {
        result = arr.filter(x => true)
      }

      return result.length > 1 ? result.join(' | ') : result.join('')
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  border: none;
}
.jingxuan{
  position: relative;
  &::after{
    content: '';
    position: absolute;
    right: 35px;
    top: 15px;
    width: 43px;
    height: 19px;
    background: url("../../assets/jingxuan@3x.png") no-repeat center;
    background-size: 43px 19px;
    z-index: 10;
  }
}
#sharePersonal {
  position: relative;
  height: 100%;
  padding-bottom: 79px;
  overflow: hidden;

  .sharePersonal-header {
    width: 375px;
    height: 375px;
    position: relative;
    padding: 0 20px;
    background: url("../../assets/pesonalCenterHeader@3x.png") no-repeat center;
    background-size: contain;
    overflow: hidden;
    .header-info {
      margin-top: 97px;
      h1 {
        font-size: 24px;
        color: #ffffff;
      }
      h2 {
        font-size: 15px;
        color: #ffffff;
        margin-top: 15px;
      }
      h4 {
        font-size: 12px;
        color: #999999;
        margin-top: 15px;
      }
    }
    .shareBtn {
      position: absolute;
      right: 20px;
      top: 54px;
      width: 24px;
      height: 24px;
      background: url("../../assets/fenxiangbaise@3x.png") no-repeat center;
      background-size: 24px 24px;
    }
    .sharePersonal-main {
      height: 110px;
      margin-top: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar {
        width: 110px;
        height: 110px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .auth {
        &::after {
          content: "";
          width: 30px;
          height: 30px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url("../../assets/auth@3x.png") no-repeat center;
          background-size: 30px 30px;
        }
      }
      .followInfo {
        flex: 1;
        height: 100%;
        .followInfo-box {
          height: 100%;
          display: flex;
          padding-left: 29px;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          .follow-btn {
            width: 180px;
            height: 40px;
            font-size: 15px;
            font-weight: bolder;
            color: #fff;
            span{
              margin-left: 5px;
            }
            background: #ff5a5f;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 20px;
              height: 20px;
            }
          }
          .follow-detail {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            padding-right: 11px;
            figure {
              p {
                font-size: 18px;
                color: #ffffff;
              }
              span {
                font-size: 12px;
                color: #cccccc;
              }
            }
          }
        }
      }
    }
  }

  .topHeader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    opacity: 1;
    height: 40px;
    z-index: 2;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    padding: 0 20px;
    h2 {
      font-size: 18px;
      color: #2a2a2a;
    }
    p {
      font-size: 10px;
      color: #999999;
    }
  }

  .box {
    margin-top: 30px;
    .main-box {
      display: flex;
      .date {
        width: 94px;
        font-size: 17px;
        color: #2a2a2a;
        text-align: right;
        padding-right: 27px;
        p {
          font-size: 12px;
          color: #999999;
          margin-top: 11px;
        }
      }
      .year{
        font-size: 24px;
        color: #2A2A2A;
        margin-bottom: 30px;
        margin-top: 30px;
      }
      .content {
        flex: 1;
        padding-right: 20px;
        .singleImg {
          width: 260px;
          height: 260px;
          position: relative;
          /*.banner {*/
          /*width: 260px;*/
          /*}*/
        }
        .isvideo{
          &:after{
            content: '';
            position: absolute;
            width: 50px;
            height: 50px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            background: url("../../assets/bofang@3x.png") no-repeat center;
            background-size: 50px 50px;
          }
        }

        .moreImg {
          overflow: hidden;
          position: relative;
          div{
            width: 128px;
            height: 128px;
            margin-bottom: 4px;
            float: left;
            position: relative;
            &:nth-of-type(odd) {
              margin-right: 4px;
            }
            /*img {*/
            /*width: 100%;*/
            /*height: 100%;*/
            /*}*/
          }
          nav {
            position: absolute;
            right: 1px;
            bottom: 4px;
            font-size: 15px;
            color: #ffffff;
            width: 30px;
            height: 30px;
            background: rgba(255,90,95,.7);
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .title {
          font-size: 17px;
          color: #2a2a2a;
          letter-spacing: 0.3px;
          font-weight: bolder;
          margin-top: 20px;
        }

        .blend-title {
          margin-top: 15px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          section{
            width: 40px;
            height: 40px;
            overflow: hidden;
            margin-top: 0;
            position: relative;
          }
          span {
            height: 40px;
            line-height: 40px;
            flex: 1;
            padding-left: 15px;
            font-size: 14px;
            color: #2a2a2a;
            font-weight: bolder;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            vertical-align: middle;
            /*white-space: nowrap;*/
          }
        }
        .cont {
          font-size: 15px;
          color: #2a2a2a;
          letter-spacing: 0.5px;
          margin-top: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #999999;
          margin-top: 25px;
          span {
            img {
              width: 26px;
              height: 26px;
              vertical-align: middle;
              margin-right: 2px;
            }
          }
        }
      }
    }
  }
  .first {
    padding-top: 77px;
  }

}
</style>
