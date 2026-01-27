<script lang="ts" setup>
// 直接导入 v3 版本，因为 @vue-office/excel 的 postinstall 脚本在 pnpm 下可能未正确执行
import VueOfficeExcel from '@vue-office/excel/lib/v3/index.js'
import '@vue-office/excel/lib/v3/index.css'
import {ref, watch} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile, getFileRenderByUrl} from '../../utils/utils'

export interface ExcelOptions {
  minColLength?: number
  minRowLength?: number
  showContextmenu?: boolean
}

const props = withDefaults(
    defineProps<
        PreviewProps & {
      width?: string
      height?: string
      options?: ExcelOptions
      requestOptions?: Record<string, any>
    }
    >(),
    {
      url: () => null,
      file: () => null,
      options: () => ({}),
      requestOptions: () => ({}),
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
    {immediate: true},
)

watch(
    () => props.url,
    (url) => {
      if (url && !props.file) {
        getFileRenderByUrl(url).then(render => (fileRender.value = render))
      }
    },
    {immediate: true},
)

const emit = defineEmits<{
  rendered: []
  error: [error: Error]
}>()

function renderedHandler(): void {
  emit('rendered')
}

function errorHandler(e: Error): void {
  emit('error', e)
}
</script>

<template>
  <div class="xlsx-preview">
    <VueOfficeExcel :src="fileRender" :options="options" :requestOptions="requestOptions" @rendered="renderedHandler" @error="errorHandler"/>
  </div>
</template>

<style scoped lang="scss">

</style>
