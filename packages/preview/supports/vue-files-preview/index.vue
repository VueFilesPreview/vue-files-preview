<script lang="ts" setup>
import { ref, shallowRef, watch } from 'vue'
import { PreviewRules, getPreviewTypeByFileType } from '../../preview.const'
import type { IPreviewRule, PreviewProps } from '../../preview.interface'
import { PreviewType } from '../../preview.interface'
import { getFileName, getFileNameFromUrl, getFileType, getFileTypeFromUrl } from '../../utils/utils'

const props = withDefaults(
  defineProps<PreviewProps & {
    width?: string
    height?: string
    overflow?: string
  }>(),
  {
    file: () => null,
    url: () => null,
    width: () => '100%',
    height: () => '100%',
    overflow: () => 'auto',
  },
)

const emit = defineEmits<{
  rendered: []
  error: [error: Error]
}>()

const loading = ref(true)
const currentPreview = shallowRef<IPreviewRule>(PreviewRules[PreviewType.NONE])

function syncPreviewByFile(file: File | Blob): void {
  const rule = PreviewRules[getPreviewTypeByFileType(getFileType(file, props.name))]
  if (rule) {
    loading.value = true
    currentPreview.value = { ...rule, name: getFileName(file, props.name) }
  }
}

function applyPreviewRule(fileType: string, name: string): void {
  const rule = PreviewRules[getPreviewTypeByFileType(fileType)]
  if (rule) {
    loading.value = true
    currentPreview.value = { ...rule, name }
  }
}

async function syncPreviewByUrl(url: string): Promise<void> {
  const fileType = getFileTypeFromUrl(url, props.name)
  const fileName = getFileNameFromUrl(url, props.name)

  applyPreviewRule(fileType, fileName)
}

function onRendered() {
  loading.value = false
  emit('rendered')
}

function onError(e: Error) {
  loading.value = false
  emit('error', e)
}

watch(
  () => props.file,
  (file) => {
    if (file) {
      syncPreviewByFile(file)
    }
  },
  { immediate: true },
)

watch(
  () => props.url,
  (url) => {
    // 仅在没有 file 时才通过 url 识别
    if (url && !props.file) {
      syncPreviewByUrl(url)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="vue-files-preview" :style="{ width, height, overflow }">
    <!-- Loading -->
    <div v-if="loading" class="vfp-loading">
      <div class="vfp-spinner" />
    </div>
    <component
      :is="currentPreview.component"
      :name="currentPreview.name"
      :file="file"
      :url="url"
      @rendered="onRendered"
      @error="onError"
    />
  </div>
</template>

<style scoped lang="scss">
.vfp-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  z-index: 10;
}

.vfp-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e8ecf0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: vfp-spin 0.8s linear infinite;
}

@keyframes vfp-spin {
  to {
    transform: rotate(360deg);
  }
}

.vue-files-preview {
  position: relative;
}
</style>
