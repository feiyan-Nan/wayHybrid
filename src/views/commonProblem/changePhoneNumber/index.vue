<!--隐私政策-->
<template>
  <div>
    <pageHeader ref="pageHeader" title="更改手机号"/>
    <div class="content">
      <h5>更 换 步 骤</h5>
      <div class="wrapper">
        <img alt="" src="../../../assets/way/编组@2x.png">
        <div>第一步：我的</div>
      </div>
      <div class="wrapper">
        <img alt="" src="../../../assets/way/编组 3@2x.png">
        <div>第二步：系统设置</div>
      </div>
      <div class="wrapper">
        <img alt="" src="../../../assets/way/编组 5@2x.png">
        <div>第三步：更换手机号</div>
      </div>
    </div>
  </div>
</template>

<script>
import pageHeader from '@/components/pageHeader'

export default {
  components: {
    pageHeader
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 0 16px;
  color: #151515;
  h5 {
    font-size: 17px;
    color: #151515;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .wrapper {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    img {
      width: 34px;
      height: 34px;
      margin-right: 12px;
    }
  }
}
</style>
