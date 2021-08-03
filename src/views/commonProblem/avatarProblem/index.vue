<!--隐私政策-->
<template>
  <div>
    <pageHeader ref="pageHeader" title="头像图片审核不通过"/>
    <div class="content">
      <h5 class="title">上传头像原因</h5>
      <p style="margin-bottom: 30px;">
        顺路是一个提倡真人真实顺路社交的地方，上传自己的清晰真人照片会快速通过审核，同时清晰的真人照 片也会增加曝光度，获得更多人喜欢～
      </p>
      <h5 class="title">系统提示你更换照片包括但不仅限于以下<br/> 原因：</h5>
      <p>
        1.你的照片未能看清脸
      </p>
      <p>2.你的照片不真实</p>
      <p>3.你上传的照片曾被你其他账号使用过</p>
      <p>4.上传了军装类照片</p>
      <p>5.上传了非人物照片</p>
      <p>6.上传的照片含有其他社交账号或二维码</p>
      <p>7.上传的照片较血腥、恐怖或容易引起他人不适 为了你的账号能够正常配对，请你更换合适的照片~</p>
    </div>
  </div>
</template>

<script>
import pageHeader from '@/components/pageHeader'

export default {
  data () {
    return {
      isFirstPage: true
    }
  },
  components: {
    pageHeader
  }
}
</script>

<style lang="less" scoped>
.content {
  //margin-top: 160px;
  padding: 0 16px;

  p {
    font-size: 14px;
    color: #151515;
    line-height: 26px;
    //margin-bottom: 20px;
  }

  .title {
    font-size: 16px;
    color: #151515;
    margin-bottom: 10px;
    margin-top: 16px;
    line-height: 18px;
    font-weight: 500;
  }

  //
  //ul{
  //  li{
  //    font-size: 11px;
  //    color: #2A2A2A;
  //    margin-bottom: 20px;
  //    line-height: 2;
  //  }
  //}
}
</style>
