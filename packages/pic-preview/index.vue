<template>
  <div>
    <img :style="{ width: width, height: height }" :src="fileRender" alt="">
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
  width: {
    type: String,
    default: () => {
      return '880px'
    }
  },
  height: {
    type: String,
    default: () => {
      return '600px'
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

<style scoped lang='scss'></style>
