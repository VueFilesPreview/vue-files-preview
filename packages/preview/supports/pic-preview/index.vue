<script lang='ts' setup>
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
  (file) => {
    if (file) {
      getFileRenderByFile(file).then((render) => {
        fileRender.value = render
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <img :src="fileRender" alt="">
  </div>
</template>

<style scoped lang='scss'></style>
