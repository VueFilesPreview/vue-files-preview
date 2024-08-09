<script lang='ts' setup>
import { watch } from 'vue'
import VueOfficePdf from '@vue-office/pdf'
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
  (file) => {
    if (file) {
      getFileRenderByFile(file).then(render => fileRender.value = render)
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
  <div>
    <VueOfficePdf :src="fileRender" @rendered="renderedHandler" @error="errorHandler" />
    <!-- <div id="pdf-preview-box"></div> -->
  </div>
</template>

<style scoped lang="scss"></style>
