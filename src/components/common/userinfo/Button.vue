<template lang="pug">
.wrap()
  .button(v-if="isClick" @click="handleBtn" :style="{backgroundColor:bg}")
    slot
  .button(v-else :style="{backgroundColor:bg}")
    slot
</template>

<script>
export default {
  name: 'Button',
  props: {
    peopleList: {
      type: Array,
      default: () => []
    },
    bg: {
      type: String,
      default: '#FF5A5F'
    },
    isClick: Boolean
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {
    handleBtn () {
      this.$emit('handleBtn')
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  padding: 0 20px;
  position: relative;
  .button{
    width: 100%;
    height: 50px;
    background: #FF5A5F;
    text-align: center;
    line-height: 50px;
    font-size: 15px;
    color: #ffffff;
  }
}
</style>
