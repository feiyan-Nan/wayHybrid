<template lang="pug">
  .wrap
    .wrap-inner
      avatar.head-photo(@click.native="clickAvatar" :src="userinfo.avatar" :width="20" :isAuth="userinfo.isAuth")
      span.username.ellipsis {{userinfo.nickName}}
      span.pubtime 发布于{{userinfo.publishDateStr}}
</template>

<script>
import avatar from '@/components/AVATAR/'
export default {
  name: 'PublishTime',
  components: {
    avatar
  },
  props: {
    userinfo: {
      type: Object,
      default: () => {}
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
    }
  }
}
</script>
<style lang="less" scoped>
.wrap{
  margin-top: 20px;
  padding: 0 20px;
  overflow: hidden;
  .wrap-inner{
    display: flex;
    width: 100%;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    .head-photo{
      flex: 0, 0 20px;
    }
    .username{
      flex: 1;
      color: #2A2A2A;
      margin-left: 8px;
    }
    .pubtime {
      flex: 0 0 120px;
      color: #CCCCCC;
      text-align: right;
      // align-self: flex-end;
    }
  }
}
</style>
