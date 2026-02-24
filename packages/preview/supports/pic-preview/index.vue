<script lang='ts' setup>
import {ref, watch} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile, getFileRenderByUrl} from '../../utils/utils'

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
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
)

function onImageLoad(): void {
  emit('rendered')
}

function onImageError(): void {
  emit('error', new Error('Image load failed'))
}
</script>

<template>
  <div class="pic-preview">
    <img :src="fileRender" alt="" crossorigin="anonymous" @load="onImageLoad" @error="onImageError">
  </div>
</template>

<style scoped lang='scss'>
.pic-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}
</style>
