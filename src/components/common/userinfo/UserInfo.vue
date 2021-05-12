<template lang="pug">
  .author-wrapper
    .container(:class="{border: isBorder}")
      .author-img
        avatar(:src="userinfo.avatar" :isAuth="userinfo.isAuth" @click.native="clickAvatar")
      .author-info(@click="clickAvatar")
        p.name.ellipsis {{userinfo.nickName}}
        p.desc.ellipsis
          span(v-if="userinfo.isAuth") {{userinfo.org ? userinfo.org : ''}} {{userinfo.authTitle}}
          span(v-else-if="userinfo.signature !== ''") {{userinfo.signature}}
          span(v-else) {{userinfo.cntFansStr}} 人关注
      .wrap(v-if="userinfo.isOwner !== 1")
        .attention-button(v-waves='' v-if="userinfo.isOwner == 0" @click.stop="clickCared" :class="userinfo.isFollow !== 0 ? ' active' : ''")
          span(v-if="userinfo.beFollowed !== 0 && userinfo.isFollow !== 0") 互相关注
          span(v-else) {{userinfo.isFollow !== 0 ? '已关注' : '关注'}}
        .attention-button(v-waves='' v-else @click.stop="clickCared")
          span 关注
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
    isBorder: {
      type: Boolean,
      default: true
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
  padding: 0 20px;
  overflow: hidden;
  .container{
    width: 100%;
    box-sizing: border-box;
    height: 100px;
    display: flex;
    padding-top: 30px;
    .author-img{
      flex: 0 0 40px;
      position: relative;
      width: 40px;
      height: 40px;
      float: left;
    }
    .author-info{
      flex: 1;
      margin-left: 10px;
      width: calc(100% - 110px);
      .name{
        font-size: 15px;
        color: #2A2A2A;
        letter-spacing: 0;
        text-align: left;
        height: 16px;
        line-height: 16px;
        font-weight: 600;
      }
      .desc{
        margin-top: 8px;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        text-align: left;
        width: 100%;
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
