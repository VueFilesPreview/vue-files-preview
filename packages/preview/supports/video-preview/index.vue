<script lang='ts' setup>
import {onBeforeUnmount, onMounted, ref, shallowRef, watch} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile} from '../../utils/utils'

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
        fileRender.value && URL.revokeObjectURL(fileRender.value)
        getFileRenderByFile(file).then((render) => {
          fileRender.value = render
          // 设置视频元素的src
          videoPreviewRef.value.src = fileRender.value
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
  })
})

onBeforeUnmount(() => {
  // 组件销毁时，释放视频元素的src
  videoPreviewRef.value.pause()
  if (props.file) {
    URL.revokeObjectURL(fileRender.value)
  }
})
</script>

<template>
  <div class="web-full-screen">
    <video ref="videoPreviewRef" class="player-video-main" controls autoplay/>
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
