<template lang="pug">
.wrap
  .title-and-info
    .title {{info.title}}
    .subr
      .item
        img.icon(src="../../../assets/click@3x.png")
        p {{info.eventDateStr}}
      .item(v-if="isTopic")
        img.icon(src="../../../assets/position@3x.png")
        p {{info.eventAddress}}
      .item(v-if="isTopic")
        img.icon(src="../../../assets/point@3x.png")
        p {{info.pointStr}}
</template>

<script>
export default {
  name: 'ShareCircle',
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    isTopic: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    shareActivity () {
      this.$emit('shareActivity')
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  margin-top: 30px;
  padding: 0 20px;
  overflow: hidden;
  .title-and-info{
    .title{
      width: 240px;
      border-left: 4px solid #FF5A5F;
      padding-left: 20px;
      font-size: 24px;
      font-weight: 700;
      color: #2A2A2A;
    }
    .subr {
      margin: 14px 0;
      .item{
        margin: 5px 0;
        display: flex;
        .icon {
          flex: 0 0 14px;
          width: 14px;
          height: 14px;
          margin-right: 14px;
          margin-top: 8px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          flex: 1;
          font-size: 15px;
          line-height: 30px;
          color: #2A2A2A;
        }
      }
    }
  }
}
</style>
