<template>
  <Header :isFirstPage="true" title=""></Header>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  },
  mounted () {
    this.$router.go(-1)
  }
}
</script>
