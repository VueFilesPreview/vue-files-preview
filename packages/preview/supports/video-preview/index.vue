<script lang='ts' setup>
import {onBeforeUnmount, onMounted, ref, shallowRef, watch} from 'vue'
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
const isUrlSource = ref(false)

watch(
    () => props.file,
    (file) => {
      if (file) {
        fileRender.value && !isUrlSource.value && URL.revokeObjectURL(fileRender.value)
        isUrlSource.value = false
        getFileRenderByFile(file).then((render) => {
          fileRender.value = render
          videoPreviewRef.value.src = fileRender.value
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
        fileRender.value && !isUrlSource.value && URL.revokeObjectURL(fileRender.value)
        isUrlSource.value = true
        getFileRenderByUrl(url).then((render) => {
          fileRender.value = render
          videoPreviewRef.value.src = fileRender.value
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
)

const videoPreviewRef = shallowRef(null)
onMounted(() => {
  // 监听视频元素的loadedmetadata事件，以便在视频加载完成后自动播放
  videoPreviewRef.value.addEventListener('loadedmetadata', () => {
    videoPreviewRef.value.play()
    emit('rendered')
  })
  videoPreviewRef.value.addEventListener('error', () => {
    emit('error', new Error('Video load failed'))
  })
})

onBeforeUnmount(() => {
  // 组件销毁时，释放视频元素的src
  videoPreviewRef.value.pause()
  if (fileRender.value && !isUrlSource.value) {
    URL.revokeObjectURL(fileRender.value)
  }
})
</script>

<template>
  <div class="video-preview web-full-screen">
    <video ref="videoPreviewRef" class="player-video-main" controls autoplay crossorigin="anonymous"/>
  </div>
</template>

<style scoped lang='scss'>
.web-full-screen {
  z-index: 9999999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw !important;
  height: 100vh !important;
  overflow: hidden; /* 隐藏溢出内容，保持全屏体验 */
  background: rgba(0, 0, 0, 0.8); /* 背景色可提高视频对比度 */
  display: flex; /* 使用 flexbox 来居中视频 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.player-video-main {
  width: 100%;
  height: auto; /* 使视频保持宽高比 */
  max-height: 100%; /* 限制最大高度以防溢出 */
  object-fit: contain; /* 保持宽高比，可能会出现黑边 */
  transition: .2s;
}

.player-video-main.video-mirror {
  transform: rotateY(180deg);
}
</style>
