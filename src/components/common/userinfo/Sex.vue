<template lang="pug">
.wrap
  .public(v-if="isPublic" :style="{backgroundColor: sex ? '#0291FF': '#f92157'}")
    img(src=`@/assets/way/icon-male.png`)
    span {{age}}
  .secret(v-else) 保密
</template>

<script>

export default {
  name: 'Sex',
  props: {
    age: {
      type: Number
    },
    sex: {
      type: Boolean,
      default: true
    },
    isPublic: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      url: ''
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  height: 14px;
  .public {
    border-radius: 7px;
    background: #f92157;
    padding: 0 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    img{
      height: 8px;
      width: 8px;
      margin-right: 1px;
    }
    span {
      font-size: 8px;
    }
  }
  .secret {
    width: 30px;
    height: 14px;
    background: #EEEEEE;
    border-radius: 7px;
    color: #A7A7A7;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
