<template>
  <div>
    <img :src="fileRender?.toString()" alt="" />
  </div>
</template>

<script lang='ts' setup>
withDefaults(
  defineProps<{
    url?: string,
    name?: string
    type?: string
    fileRender?: string | ArrayBuffer
  }>(),
  {
    url: () => null,
    name: () => null,
    fileRender: () => null,
    type: () => null
  }
)
</script>

<style scoped lang='scss'></style>
