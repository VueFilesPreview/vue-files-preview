<script lang='ts' setup>
// 直接导入 v3 版本，因为 @vue-office/docx 的 postinstall 脚本在 pnpm 下可能未正确执行
import VueOfficeDocx from '@vue-office/docx/lib/v3/index.js'
import '@vue-office/docx/lib/v3/index.css'
import {ref, watch} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile, getFileRenderByUrl} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps & {
      options?: Record<string, any>
      requestOptions?: Record<string, any>
    }>(),
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
        getFileRenderByFile(file).then((render) => {
          fileRender.value = render
        })
      }
    },
    {immediate: true},
)

watch(
    () => props.url,
    (url) => {
      if (url && !props.file) {
        getFileRenderByUrl(url).then((render) => {
          fileRender.value = render
        })
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
  <div class="docx-preview">
    <VueOfficeDocx :src="fileRender" :options="options" :requestOptions="requestOptions" @rendered="renderedHandler" @error="errorHandler"/>
  </div>
</template>

<style scoped lang='scss'></style>
