<template>
    <div id="stretch">
      <h2 class="title">{{title}}</h2>
      <div class="content" ref="content" :class="{def : !isActive}">{{content}}礼品兑换成功后将在72小时内发货，法定节假日顺延，请在确认后签收，若存在质量问题，务必在七天内联系客服：（客服微信号：glamorgift）<br>
        注：<br>
        （1）因地址不详，电话号码错误/空号/停机等个人原因导致快递多次配送不成功，延期退回后我们将不再进行二次发货，敬请谅解。<br>
        （2）兑换成功的礼品以收到的实物为主，概不支持退换，发货前我们会进行质量检验！若在运输过程中出现破损，请联系微信客服进行协商处理！<br>
        【惊喜】中所有礼品兑换活动最终解释权归光芒所有！
      </div>
      <nav class="arrow" @click="toggle">
        <img src="../../../assets/arrow_up@2x.png" :class="{rotate : !isActive}" />
      </nav>
    </div>
</template>

<script>
export default {
  name: 'stretch',
  props: {
    title: {
      type: [String, Number],
      default: ''
    },
    content: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
      console.log('this.$refs.content.$el.style.lineHeight', this.$refs.content.clientHeight)
    }
  }
}
</script>

<style scoped lang="less">
  #stretch{
    margin-bottom: 29px;
    transition: all 2s;
    .title{
      font-size: 14px;
      color: #2A2A2A;

      letter-spacing: 0;
      line-height: 14px;
      padding: 0 20px;
      margin-bottom: 24px;
      margin-top: 20px;
      font-weight: bold;
    }
    .content{
      padding: 0 18px;
      line-height: 1.86667;
      font-size: 15px;
      color: #2A2A2A;
      letter-spacing: 0.5px;
      &.def{
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }

    .arrow{
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .rotate {
        transform: rotate(180deg);
      }
      img{
        width: 14px;
        height: 7px;
        transition: all .3s;
      }
    }
  }
</style>
