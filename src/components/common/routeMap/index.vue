<template>
  <div class="path">
    <img class="line-symbol" src="../../../assets/way/line-symbol.png"/>
    <div class="line">
      <span>{{ wayinfo.location }}
        <template v-if="wayinfo.wayPath[0]">·{{ wayinfo.wayPath[0].path }}</template>
      </span>
      <img
        class="right-arrow"
        src="../../../assets/way/right-arrow.png"
      />
    </div>

  </div>
</template>

<script>
export default {
  name: 'RouteMap',
  props: {
    wayinfo: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.path {
  padding-left: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 12px;
}

.line-symbol {
  width: 17px;
  height: 18px;
}

.line {
  border-radius: 4px 0px 0px 4px;
  height: 18px;
  background: #F8F8F8;
  display: flex;
  align-items: center;

  span {
    padding: 0 4px;
    font-size: 10px;
    color: #333333;
  }
}

.right-arrow {
  width: 4px;
  height: 6px;
  padding-right: 4px;
}
</style>
