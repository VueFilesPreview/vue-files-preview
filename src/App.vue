<script lang="ts" setup>
import { ref } from 'vue'
import EpubPreview from '../packages/preview/supports/epub-preview'

const fileRender = ref()
function handleFileChange(e): void {
  fileRender.value = e.target.files[0]
}
</script>

<template>
  <div>
    <input type="file" @change="handleFileChange">
    <EpubPreview :file-render="fileRender" />
  </div>
</template>

<style scoped lang="scss"></style>
