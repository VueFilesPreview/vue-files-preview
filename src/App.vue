<script lang="ts" setup>
import { ref } from 'vue'
import PdfPreview from '../packages/preview/supports/pdf-preview'

const fileRender = ref()
function handleFileChange(e): void {
  fileRender.value = e.target.files[0]
}
</script>

<template>
  <div>
    <input type="file" @change="handleFileChange">
    <PdfPreview :file-render="fileRender" />
  </div>
</template>

<style scoped lang="scss"></style>
