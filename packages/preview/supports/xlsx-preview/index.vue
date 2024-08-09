<script lang="ts" setup>
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
import { ref, watch } from 'vue'
import type { PreviewProps } from '../../preview.interface'
import { getFileRenderByFile } from '../../utils/utils'

const props = withDefaults(
  defineProps<
    PreviewProps & {
      width?: string
      height?: string
    }
  >(),
  {
    url: () => null,
    file: () => null,
  },
)
const fileRender = ref(null)
watch(
  () => props.file,
  (file) => {
    if (file) {
      getFileRenderByFile(file).then(render => (fileRender.value = render))
    }
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
    <VueOfficeExcel :src="fileRender" @rendered="renderedHandler" @error="errorHandler" />
</template>

<style scoped lang="scss">

</style>
