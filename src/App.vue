<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <EpubPreview :fileRender="fileRender" />
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import EpubPreview from '../packages/preview/supports/epub-preview'

const fileRender = ref()
const handleFileChange = (e) => {
  fileRender.value = e.target.files[0]
}
</script>

<style scoped lang='scss'>
</style>
