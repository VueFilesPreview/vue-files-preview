<script lang='ts' setup>
import { computed, onMounted } from 'vue'
import type { PreviewProps } from '../../preview.interface'
import { getFileNameFromUrl, getFileType, getFileTypeFromUrl } from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      url: () => null,
      file: () => null,
    },
)

const emit = defineEmits<{
  error: [error: Error]
}>()

const fileExtension = computed(() => {
  if (props.file) {
    const ext = getFileType(props.file, props.name)
    return ext ? `.${ext}` : ''
  }
  if (props.url) {
    const ext = getFileTypeFromUrl(props.url)
    return ext ? `.${ext}` : ''
  }
  return ''
})

const fileName = computed(() => {
  if (props.file && 'name' in props.file && props.file.name) {
    return props.file.name
  }
  if (props.name) {
    return props.name
  }
  if (props.url) {
    return getFileNameFromUrl(props.url)
  }
  return ''
})

onMounted(() => {
  emit('error', new Error(`Unsupported file type: ${fileExtension.value}`))
})
</script>

<template>
  <div class="unknown-preview">
    <div class="unknown-preview-icon-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
      <span v-if="fileExtension" class="unknown-preview-badge">{{ fileExtension }}</span>
    </div>
    <div v-if="fileName" class="unknown-preview-name" :title="fileName">{{ fileName }}</div>
    <div class="unknown-preview-tip">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>This file type is not supported for preview</span>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.unknown-preview {
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: #fff;
}

.unknown-preview-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  border-radius: 20px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8ecf8 100%);
  color: #8b9dc3;
}

.unknown-preview-badge {
  position: absolute;
  bottom: -6px;
  right: -6px;
  padding: 2px 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.unknown-preview-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unknown-preview-tip {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #aab2c0;

  svg {
    flex-shrink: 0;
  }
}
</style>
