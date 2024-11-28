<script lang="ts" setup>
import { watch } from 'vue'
import type { PreviewProps } from '../../preview.interface'
import { getFileRenderByFile } from '../../utils/utils'

const props = withDefaults(defineProps<PreviewProps>(), {
  url: () => null,
  file: () => null,
})

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

watch(
  () => props.url,
  (url) => {
    if (url) {
      fileRender.value = url
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <iframe class="pdf-iframe" :src="fileRender" frameborder="0" />
  </div>
</template>

<style scoped lang="scss">
.pdf-iframe {
  width: 100%;
  height: 100vh;
}
</style>
