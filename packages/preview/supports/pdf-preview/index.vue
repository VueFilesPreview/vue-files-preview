<script lang="ts" setup>
import { watch } from 'vue'
import type { PreviewProps } from '../../preview.interface'
import { getFileRenderByFile } from '../../utils/utils'

const props = withDefaults(defineProps<PreviewProps>(), {
  url: () => null,
  file: () => null,
})

const emit = defineEmits<{
  rendered: []
  error: [error: Error]
}>()

const fileRender = ref(null)
watch(
  () => props.file,
  (file) => {
    if (file) {
      getFileRenderByFile(file).then((render) => {
        fileRender.value = render
        emit('rendered')
      }).catch((e: Error) => {
        emit('error', e)
      })
    }
  },
  { immediate: true },
)

watch(
  () => props.url,
  (url) => {
    if (url) {
      fileRender.value = url
      emit('rendered')
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="pdf-preview">
    <iframe class="pdf-iframe" :src="fileRender" frameborder="0" />
  </div>
</template>

<style scoped lang="scss">
.pdf-iframe {
  width: 100%;
  height: 100vh;
}
</style>
