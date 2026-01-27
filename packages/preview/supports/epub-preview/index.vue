<script lang='ts' setup>
import {ref, watch} from 'vue'
import ePub from 'epubjs'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile, getFileRenderByUrl} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps & {
      width?: string
      height?: string
    }>(),
    {
      url: () => null,
      file: () => null,
      width: () => '100%',
      height: () => '100%',
    },
)

const emit = defineEmits<{
  rendered: []
  error: [error: Error]
}>()

const navigation = ref()
const locations = ref()
const currentPage = ref(1)
const totalPages = ref()
const bookAvailable = ref(false)
const book = ref()
const rendition = ref()

function renderEpub(content: ArrayBuffer | string): void {
  book.value = ePub(content as ArrayBuffer)
  rendition.value = book.value.renderTo('epub-viewer', {
    width: '100%',
    height: 'calc(100vh - 80px)',
    flow: 'scrolled',
    allowScriptedContent: true,
  })
  book.value.ready.then(() => {
    navigation.value = book.value.navigation
    locations.value = book.value.locations
    bookAvailable.value = true
    totalPages.value = locations.value.length()
    rendition.value.display()
    emit('rendered')
  }).catch((e: Error) => {
    emit('error', e)
  })
}

watch(
    () => props.file,
    (file) => {
      if (file) {
        getFileRenderByFile(file).then((render) => {
          renderEpub(render)
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
          renderEpub(render)
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
)

// epub翻页
function prevPage(): void {
  if (rendition.value) {
    rendition.value.prev()
    // 向前翻页时更新 currentPage
    currentPage.value--
    if (currentPage.value < 1) {
      currentPage.value = 1
    }
  }
}

function nextPage(): void {
  if (rendition.value) {
    rendition.value.next()
    // 向后翻页时更新 currentPage
    currentPage.value++
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  }
}

function prevKeyDown(e): void {
  e.preventDefault()
}

function downKeyDown(e): void {
  e.preventDefault()
}

onKeyStroke('ArrowLeft', () => {
  prevPage()
})

onKeyStroke('ArrowRight', () => {
  nextPage()
})
</script>

<template>
  <div class="epub-preview epub-box" :style="{ width, height }">
    <button class="btn" style="display: none" @keydown="prevKeyDown">
      上一页
    </button>
    <div id="epub-viewer" class="epub-viewer"/>
    <button class="btn" style="display: none" @keydown="downKeyDown">
      下一页
    </button>
  </div>
</template>

<style scoped lang="scss">
.epub-box {
  height: 100vh;
  width: 100%;
}

.epub-viewer {
  padding: 10px;
  min-height: calc(100vh - 80px);
  max-height: calc(100vh - 80px);
  overflow: auto;
}

.footer {
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>
