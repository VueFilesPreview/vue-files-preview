<template>
  <div class="web-full-screen">
    <video class="player-video-main" ref="videoPreviewRef" controls autoplay></video>
  </div>
</template>

<script lang='ts' setup>
const props = defineProps({
  url: {
    type: String,
    default: () => {
      return 'none'
    }
  },
  name: {
    type: String,
    default: () => {
      return 'none'
    }
  },
  type: {
    type: String,
    default: () => {
      return 'none'
    }
  },
  fileRender: {
    type: [ArrayBuffer, String]
  }
})

const videoPreviewRef = shallowRef(null);

onMounted(() => {
  // 设置视频元素的src
  videoPreviewRef.value.src = props.fileRender;
  // 监听视频元素的loadedmetadata事件，以便在视频加载完成后自动播放
  videoPreviewRef.value.addEventListener('loadedmetadata', () => {
    videoPreviewRef.value.play();
  });
});

onBeforeUnmount(() => {
  // 组件销毁时，释放视频元素的src
  videoPreviewRef.value.pause();
  if (props.fileRender) {
    URL.revokeObjectURL(props.fileRender?.toString());
  }
});

</script>

<style scoped lang='scss'>
.web-full-screen {
  z-index: 9999999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw !important;
  height: 100vh !important;
}

.player-video-main {
  width: 100%;
  height: 100%;
  transition: .2s;


  &.video-mirror {
    transform: rotateY(180deg);
  }
}
</style>
