<script lang='ts' setup>
import {init} from 'pptx-preview'
import {ref, watch, onMounted, onUnmounted} from 'vue'
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

const pptContainer = ref<HTMLElement | null>(null)

let previewer: ReturnType<typeof init> | null = null
let arrayBufferData: ArrayBuffer | null = null
let slideCount = 0
let lastWidth = 0
let resizeObserver: ResizeObserver | null = null
let resizeTimer: ReturnType<typeof setTimeout> | null = null

function getContainerWidth(): number {
  const el = pptContainer.value
  if (!el) return 960
  const w = el.clientWidth
  const pw = el.parentElement?.clientWidth || 0
  return w > 100 ? w : (pw > 100 ? pw : 960)
}

function destroyPreviewer(): void {
  if (previewer) {
    try {
      previewer.destroy()
    } catch {
      // ignore
    }
    previewer = null
  }
  if (pptContainer.value) {
    pptContainer.value.innerHTML = ''
  }
}

/** 用隐藏容器获取 slideCount */
async function detectSlideCount(data: ArrayBuffer): Promise<number> {
  const hidden = document.createElement('div')
  hidden.style.cssText = 'position:absolute;left:-9999px;top:-9999px;visibility:hidden'
  document.body.appendChild(hidden)
  try {
    const temp = init(hidden, {width: 100, height: 100, mode: 'slide'})
    await temp.preview(data)
    const count = temp.slideCount
    temp.destroy()
    return count
  } finally {
    document.body.removeChild(hidden)
  }
}

async function renderPreview(): Promise<void> {
  if (!pptContainer.value || !arrayBufferData) return

  destroyPreviewer()

  const width = getContainerWidth()
  lastWidth = width
  const slideHeight = Math.floor(width * 9 / 16)

  try {
    // 首次渲染时获取 slideCount
    if (slideCount === 0) {
      slideCount = await detectSlideCount(arrayBufferData)
    }

    previewer = init(pptContainer.value, {
      width,
      height: slideHeight * slideCount,
      mode: 'list',
    })
    await previewer.preview(arrayBufferData)
    emit('rendered')
  } catch (e) {
    emit('error', e instanceof Error ? e : new Error('PPT render failed'))
  }
}

function onResize(): void {
  const w = getContainerWidth()
  if (w > 0 && Math.abs(w - lastWidth) >= 10 && arrayBufferData && slideCount > 0) {
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      renderPreview()
    }, 300)
  }
}

onMounted(() => {
  if (pptContainer.value) {
    resizeObserver = new ResizeObserver(() => onResize())
    resizeObserver.observe(pptContainer.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  if (resizeTimer) clearTimeout(resizeTimer)
  destroyPreviewer()
})

async function loadData(data: ArrayBuffer | string): Promise<void> {
  if (data instanceof ArrayBuffer) {
    arrayBufferData = data
  } else if (typeof data === 'string') {
    const response = await fetch(data)
    arrayBufferData = await response.arrayBuffer()
  }
  slideCount = 0
  await renderPreview()
}

watch(
    () => props.file,
    (file) => {
      if (file) {
        getFileRenderByFile(file).then(loadData).catch((e: Error) => emit('error', e))
      }
    },
    {immediate: true},
)

watch(
    () => props.url,
    (url) => {
      if (url && !props.file) {
        getFileRenderByUrl(url).then(loadData).catch((e: Error) => emit('error', e))
      }
    },
    {immediate: true},
)
</script>

<template>
  <div ref="pptContainer" class="ppt-preview"/>
</template>

<style scoped lang='scss'>
.ppt-preview {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #333;
  scrollbar-width: thin;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  :deep(.pptx-preview-wrapper) {
    overflow-y: visible !important;
  }
}
</style>
