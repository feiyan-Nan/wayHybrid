<template lang="pug">
  .author-wrapper
    .container
      .author-img
        avatar(:src="userinfo.avatar" :isAuth="userinfo.isAuth" @click.native="clickAvatar")
      .author-info(@click="clickAvatar")
        div.name.ellipsis {{userinfo.name}}
          div.sex.male(v-if="userinfo.gender === 1")
            img(src="@/assets/way/male.png")
            span {{userinfo.age}}
          div.sex.female(v-else)
            img(src="@/assets/way/female.png")
            span {{userinfo.age}}
        p.desc.ellipsis
          span(v-if="userinfo.showTime") {{userinfo.showTime}}
          span(v-else) {{userinfo.createTimeStr}}
      .like-number(v-if="showLike" @click="clickAvatar")
        span {{userinfo.likeCount}}
        img(src="@/assets/way/dynamic/like.png")
</template>

<script>
import avatar from '@/components/AVATAR/'
// 引入按钮水波纹指令
import waves from '@/directive/waves'
export default {
  name: 'UserInfo',
  components: {
    avatar
  },
  directives: {
    waves
  },
  props: {
    userinfo: {
      type: Object,
      default: () => {}
    },
    showLike: {
      type: Boolean,
      default: false
    }
  },
  mounted () {},
  data () {
    return {}
  },
  methods: {
    // 点击用户头像
    clickAvatar () {
      this.$emit('clickAvatar', this.userinfo.uid)
    },
    // 点击用户关注
    clickCared () {
      this.$emit('clickCared')
    }
  }
}
</script>
<style lang="less" scoped>
.author-wrapper{
  margin-top: 20px;
  padding: 0 14px;
  overflow: hidden;
  .container{
    width: 100%;
    box-sizing: border-box;
    //height: 80px;
    display: flex;
    margin-bottom: 10px;
    //padding-top: 30px;
    .author-img{
      flex: 0 0 40px;
      position: relative;
      width: 40px;
      height: 40px;
      float: left;
    }
    .like-number {
      font-size: 14px;
      color: #a7a7a7;
      display: inline-flex;
      align-items: center;
      img {
        width: 23px;
        height: 19px;
        margin-left: 10px;
      }
    }
    .author-info{
      flex: 1;
      margin-left: 10px;
      width: calc(100% - 110px);
      .name{
        font-size: 14px;
        color: #808080;
        letter-spacing: 0;
        text-align: left;
        height: 16px;
        line-height: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
      }
      .desc{
        margin-top: 8px;
        font-size: 10px;
        color: #808080;
        letter-spacing: 0;
        text-align: left;
        width: 100%;
      }
      .sex {
        display: inline-flex;
        align-items: center;
        border-radius: 7px;
        padding: 0 4px;
        height: 14px;
        //position: relative;
        //display: inline-block;
        //vertical-align: middle;
        margin-left: 7px;
        img {
          height: 8px;
          width: 8px;
          margin-right: 1px;
        }
        span {
          font-size: 8px;
          color: #ffffff;
          line-height: 14px;
        }
      }
      .male {
        background: #0591FF;
      }
      .female {
        background: #FF76C5;
      }
    }
    .wrap{
      overflow: hidden;
    }
    .attention-button{
      flex: 0 0 60px;
      width: 60px;
      height: 30px;
      line-height: 32px;
      font-size: 13px;
      color: #FF5A5F;
      letter-spacing: 0;
      text-align: center;
      border: 2px solid #FF5A5F;
      background: #ffffff;
      box-sizing: border-box;
      margin-top: 3px;
      &.active {
        background: #fff;
        border: 1px solid #CCCCCC;
        color: #ccc;
      }
    }
  }
  .border {
    border-top: 1px solid #E6E6E6;
    border-bottom: 1px solid #E6E6E6;
  }
}
</style>
