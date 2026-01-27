<script lang='ts' setup>
import {ref, watch} from 'vue'
import {getFileRenderByFile, getFileRenderByUrl} from '../../utils/utils'
import type {PreviewProps} from '../../preview.interface'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      url: () => null,
      file: () => null,
    },
)

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
    {immediate: true},
)

watch(
    () => props.url,
    (url) => {
      if (url && !props.file) {
        getFileRenderByUrl(url).then((render) => {
          fileRender.value = render
          emit('rendered')
        }).catch((e: Error) => {
          emit('error', e)
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
