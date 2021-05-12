  <!-- 积分规则 -->
<template>
  <div class="root">
    <Header title="积分规则"></Header>
    <div class="content">
      <p>积分是用户在光芒APP通过完成日常任务、参与线上活动、积极交流互动等行为给予的特别奖励。</p>
      <p class="title">1. 怎样获取积分？</p>
      <p>惊喜兑换的积分计算分为两个部分：任务积分和赠送积分。通过【惊喜】-【获取积分】完成每日任务可获得固额积分。</p>
      <p>（1）用户首次完善个人主页可获80积分；</p>
      <p>（2）每日点赞累计10个可获5积分；</p>
      <p>（3）每日发表评论累计10条可获20积分；</p>
      <p>（4）每日发布状态或文章成功并通过审核可获80积分；</p>
      <p>（5）每日新增粉丝3位及以上可获50积分；</p>
      <p>（6）发布状态或文章优质且加精推荐至首页可获300积分；</p>
      <p>（7）积极参与光芒官方活动，根据活动内容给予相应的积分。</p>
      <p class="title">2. 积分兑换礼品</p>
      <p>用户账户内的积分可用于兑换相应礼品，进入【惊喜】，依据上架礼品的积分价值，满足即可直接兑换，兑换后会自动扣除账户内相应积分。 </p>
      <p class="title">3. 积分使用规则</p>
      <p>（1）积分使用过程中不兑现、不开发票，不可转移至其他账户。</p>
      <p>（2）使用积分进行兑换，兑换申请一经提交, 一律不能取消(除礼品缺货等特殊情况)。</p>
      <p>（3）如因缺货等原因导致退换礼品，则抵扣的积分将原路返还到账户；如因个人原因导致的退换礼品，则不返还抵扣积分。</p>
      <p>（4）兑换礼品涉及运费由光芒承担。</p>
      <p>（5）光芒保留最终解释权。</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  methods: {
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
.root{
  overflow-y: scroll;
}
.header {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background: #fff;
  .back-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 44px;
    height: 44px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .img-wrapper {
      width: 30px;
      height: 30px;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .header-title{
    width: 280px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 18px;
    color: #2A2A2A;
  }
}
.content {
  margin-top: 44px;
  padding: 10px;
  .title{
    color: #1a1a1a;
    font-size: 16px;
    line-height: 22px;
    padding-left: 15px;
    border-left: 5px solid #FF5A5F;
    margin: 10px 0;
  }
  p {
    color: #92969c;
    font-size: 14px;
    line-height: 22px;
    margin: 5px 0;
  }
}
</style>
