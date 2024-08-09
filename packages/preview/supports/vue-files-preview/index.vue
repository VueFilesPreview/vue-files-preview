<script lang="ts" setup>
import { watch } from 'vue'
import { PreviewRules, getPreviewTypeByFileType } from '../../preview.const'
import type { IPreviewRule, PreviewProps } from '../../preview.interface'
import { PreviewType } from '../../preview.interface'
import { getFileName, getFileType } from '../../utils/utils'

const props = withDefaults(
  defineProps<PreviewProps & {
    width?: string
    height?: string
  }>(),
  {
    file: () => null,
    url: () => null,
    width: () => '100%',
    height: () => '100%',
  },
)

const currentPreview = shallowRef<IPreviewRule>(PreviewRules[PreviewType.NONE])

function syncPreview(file: File) {
  const preview = PreviewRules[getPreviewTypeByFileType(getFileType(file))]
  if (preview) {
    preview.name = getFileName(file)
    currentPreview.value = preview
  }
}
watch(
  () => props.file,
  (file) => {
    if (file) {
      syncPreview(file)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="vue-files-preview" :style="{ width, height }">
    <component
      :is="currentPreview.component"
      :name="currentPreview.name"
      :file="file"
      :url="url"
    />
  </div>
</template>

<style scoped lang="scss"></style>
