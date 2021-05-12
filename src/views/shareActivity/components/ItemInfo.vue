<template lang="pug">
.wrap
  .item-info-title {{itemInfo.title}}
  .itme-content {{itemInfo.text}}
  .operation
    .operation-item(@click="clickCollection")
      img(src="../../../assets/shoucang@3x.png")
      span.num {{itemInfo.cntFansStr}}
    .operation-item(@click="clickComment")
      img(src="../../../assets/pinglun@3x.png")
      span.num {{itemInfo.cntCommentStr}}
    .operation-item(@click="clickLike")
      img(src="../../../assets/xihuan@3x.png")
      span.num {{itemInfo.cntLikeStr}}
</template>

<script>
export default {
  name: 'ItemInfo',
  props: {
    itemInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.itemInfo, 456)
  },
  methods: {
    clickCollection () {
      this.doApp()
    },
    clickLike () {
      this.doApp()
    },
    clickComment () {
      this.doApp()
    },
    doApp () {
      this.$emit('doApp')
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  .item-info-title{
    font-weight: 700;
    line-height: 26px;
    font-size: 17px;
    color: #2A2A2A;
    margin-bottom: 10px;
  }
  .itme-content{
    line-height: 26px;
    font-size: 15px;
    color: #2A2A2A;
    overflow : hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 15px;
  }
  .operation {
    width: 335px;
    // background: #000;
    display: flex;
    justify-content: flex-end;
    .operation-item {
      flex: 0 0 64px;
      float: right;
      display: flex;
      flex-direction: row;
      align-items: center;
      img{
        width: 26px;
        height: 26px;
      }
      .num{
        margin-left: 4px;
        font-size: 12px;
        vertical-align: middle;
      }
    }
  }
}
</style>
