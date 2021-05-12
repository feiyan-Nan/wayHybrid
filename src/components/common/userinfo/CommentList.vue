<template lang="pug">
  .comment-wrapper
    .title 评论
    .comment-list(v-if="commentList.length")
      .comment-item(v-for="(item, index) in commentList" :key="item.id")
        avatar(:src="item.avatar" :width="30" :isAuth="item.authStatus" @click.native="clickAvatar(item.uid)")
        .right
          .desc
            .left(@click="showComment")
              .name.ellipsis {{item.nickName}}
              .time {{item.createDateStr}}
            .like(@click="clickLike(item, index)")
              img(v-if="item.likeStatus" src="../../../assets/zan_active@3x.png")
              img(v-else src="../../../assets/zan@3x.png")
              //- 这个逻辑待验证
              span.like-num {{item.likeTotal > 9999 ? item.likeTotalStr : item.likeTotal}}
          .content(@click="showComment" v-html="item.contComment")
          .at-comment(@click="showComment" v-if="item.destNickName && item.destComment" v-html="item.destNickName+':'+item.destComment")
      .tips(@click="showComment") 查看全部{{cntComment}}条评论
      .end - END -
    .empty(v-else @click="showComment") 快来发表你的评论吧~
</template>

<script>
import avatar from '@/components/AVATAR/'
export default {
  name: 'CommentList',
  components: {
    avatar
  },
  props: {
    commentList: {
      type: Array,
      default: () => []
    },
    cntComment: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    console.log('456123', this.commentList)
  },
  data () {
    return {}
  },
  methods: {
    // 点赞(将评论的id传递过去)
    clickLike (commentId, index) {
      this.$emit('clickLike', commentId, index)
    },
    showComment () {
      this.$emit('showComment')
    },
    // 点击用户头像
    clickAvatar (uid) {
      this.$emit('clickAvatar', uid)
    }
  }
}
</script>
<style lang="less" scoped>
.comment-wrapper{
  padding: 20px;
  overflow: hidden;
  .title{
    font-size: 14px;
    line-height: 14px;
    color: #2A2A2A;
    font-weight: 700;
  }
  .empty{
    font-size: 12px;
    color: #CCCCCC;
    letter-spacing: 0;
    text-align: center;
    line-height: 100px;
    height: 100px;
  }
  .comment-list{
    .comment-item{
      margin-top: 20px;
      display: flex;
    }
    .right{
      flex: 1;
      margin-left: 10px;
      .desc{
        display: flex;
        justify-content: space-between;
        .left{
          flex: 0;
          width: 240px;
          padding-right: 10px;
          .name{
            font-size: 12px;
            line-height: 16px;
            font-weight: 700;
          }
          .time{
            font-size: 10px;
            color: #999999;
            padding-top: 5px;
          }
        }
        .like{
          flex: 0 0 45px;
          position: relative;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #4D4D4D;
          img{
            display: inline-block;
            width: 18px;
            height: 18px;
            margin-right: 5px;
          }
          .like-num{
            position: absolute;
            font-size: 10px;
            line-height: 10px;
            top: 5px;
            left: 20px;
          }
        }
      }
      .content{
        font-size: 15px;
        color: #2A2A2A;
        letter-spacing: 0;
        text-align: left;
        line-height: 26px;
        margin-top: 15px;
      }
      .at-comment{
        padding-left: 11px;
        margin-top: 10px;
        font-size: 15px;
        color: #999999;
        letter-spacing: 0;
        text-align: left;
        line-height: 20px;
        border-left: 4px solid #999999;

      }
    }
    .tips{
      height: 60px;
      line-height: 60px;
      margin-top: 20px;
      font-size: 14px;
      color: #CCCCCC;
      letter-spacing: 0;
      text-align: center;
    }
    .end{
      margin-top: 40px;
      margin-bottom: 30px;
      font-size: 12px;
      color: #2A2A2A;
      letter-spacing: 0;
      text-align: center;
      line-height: 12px;
    }
  }
}
</style>
