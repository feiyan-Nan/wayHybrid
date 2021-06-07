<template>
  <div class="image-list">
    <img :src="item" v-for="item of imageList" :key="item" alt="">
  </div>
</template>

<script>
export default {
  name: 'ImageList',
  props: {
    imageList: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.image-list {
  padding: 0 14px;
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
  img {
    width: calc((100vw - 36px)/3);
    height: calc((100vw - 36px)/3);
    margin-bottom: 4px;
    object-fit: cover;
  }
  img:nth-child(3n+2) {
    margin: 0 4px;
  }
}
</style>
