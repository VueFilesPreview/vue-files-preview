<script lang='ts' setup>
import {ref, watch} from 'vue'
import {getFileRenderByFile} from '../../utils/utils'
import type {PreviewProps} from '../../preview.interface'

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
    {immediate: true},
)
</script>

<template>
  <div class="txt-preview">
    {{ fileRender }}
  </div>
</template>

<style scoped lang='scss'></style>
