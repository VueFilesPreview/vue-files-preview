<template>
  <div>
    <img :src="fileRender" alt="">
  </div>
</template>

<script lang='ts' setup>
defineProps({
  url: {
    type: String,
    default: () => {
      return 'none'
    }
  },
  type: {
    type: String,
    default: () => {
      return 'none'
    }
  },
  fileRender: {
    type: [String]
  }
})
</script>

<style scoped lang='scss'>
</style>
