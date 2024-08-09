<script lang='ts' setup>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import { ref, watch } from 'vue'
import type { PreviewProps } from '../../preview.interface'
import { getFileRenderByFile } from '../../utils/utils'

const props = withDefaults(
  defineProps<PreviewProps>(),
  {
    url: () => null,
    file: () => null,
  },
)

const fileRender = ref(null)
watch(
  () => props.file,
  () => {
    getFileRenderByFile(props.file).then((render) => {
      fileRender.value = render
    })
  },
  { immediate: true },
)

function renderedHandler(): void {
  console.log('渲染完成')
}

function errorHandler(): void {
  console.log('渲染失败')
}
</script>

<template>
  <div>
    <VueOfficeDocx :src="fileRender" @rendered="renderedHandler" @error="errorHandler" />
  </div>
</template>

<style scoped lang='scss'></style>
