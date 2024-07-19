<template>
  <div>
    {{ fileRender }}
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
    type: [ArrayBuffer, String]
  }
})
</script>

<style scoped lang='scss'></style>
