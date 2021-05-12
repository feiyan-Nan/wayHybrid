<template lang="pug">
.wrap(v-if="peopleList.length")
  .more-people(:class="{'up-height':isUpHeight,'down-height':isDownHeight}")
    .more-people-text 他们也参与了：
    .more-people-warp()
      .avatar(v-for="(item, index) in filterPeople" :key="" v-if="index<12")
        fade-animation
          avatar(:src="item.avatar" :width="30" :isAuth="false" @click="doApp")
    .icon(v-if="peopleList.length > 6")
      img(v-if="arrowPointsTo === 'down'" @click="clickArrow" src="../../../assets/arrow_down@2x.png")
      img(v-if="arrowPointsTo === 'up'" @click="clickArrow" src="../../../assets/arrow_up@2x.png")
</template>

<script>
import avatar from '@/components/AVATAR/'
import FadeAnimation from '@/components/common/fade/FadeAnimation'

export default {
  name: 'morePeople',
  components: {
    avatar,
    FadeAnimation
  },
  props: {
    peopleList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isUpHeight: false,
      isDownHeight: true,
      arrowPointsTo: 'down',
      filterPeople: []
    }
  },
  mounted () {
    console.log(this.peopleList, 456789)
    this.filterPeople = this.peopleList.slice(0, 6)
  },
  methods: {
    doApp () {
      this.$emit('doApp')
    },
    clickArrow () {
      if (this.arrowPointsTo === 'down') {
        this.arrowPointsTo = 'up'
        this.filterPeople = this.peopleList.slice(0, 12)
        this.isUpHeight = true
        this.isDownHeight = false
      } else {
        this.arrowPointsTo = 'down'
        this.filterPeople = this.peopleList.slice(0, 6)
        this.isUpHeight = false
        this.isDownHeight = true
        // this.peopleList.length = 6
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  padding: 0 20px;
  position: relative;
  .more-people {
    padding: 0 20px 30px;
    background: #fafafa;
    font-size: 12px;
    color: #999999;
    overflow: hidden;
    height: 74px;
    transition: height .5s;
    .more-people-text{
      padding: 12px 0 0;
    }
    .more-people-warp {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      .avatar{
        width: 36px;
        height: 36px;
        padding-right: 15px;
        margin-top: 5px;
      }
      .avatar:nth-child(6n){
        padding-right: 0;
      }
    }
    .icon{
      position: absolute;
      width: 30px;
      height: 20px;
      left: 175px;
      bottom: 0;
      text-align: center;
      line-height: 20px;
      img{
        margin-top: 5px;
        width: 12px;
        height: 7px;
      }
    }
  }
  .up-height{
    height: 114px;
  }
  .down-height{
    height: 74px;
  }
}
</style>
