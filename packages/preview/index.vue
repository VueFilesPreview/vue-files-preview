<template>
  <div class="preview">
    <div v-if="fileType === 'docx'">
      <DocxPreview :type="fileType" :fileRender="fileRender" />
    </div>
    <div v-if="fileType === 'xlsx'">
      <XlsxPreview :type="fileType" :fileRender="fileRender" />
    </div>
    <div v-if="fileType === 'pdf'">
      <PdfPreview :type="fileType" :fileRender="fileRender" />
    </div>
    <div v-if="fileType === 'pic'">
      <PicPreview :type="fileType" :fileRender="fileRender" />
    </div>
    <div v-if="fileType === 'txt'">
      <TxtPreview :type="fileType" :fileRender="fileRender" />
    </div>
    <div v-if="fileType === 'code'">
      <CodePreview :type="fileType" :fileRender="fileRender" />
    </div>
    <div v-if="fileType === 'md'">
      <MdPreview :type="fileType" :fileRender="fileRender" />
    </div>
    <div v-if="fileType === 'epub'">
      <EpubPreview :type="fileType" :fileRender="fileRender" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, computed, watch } from 'vue'
import DocxPreview from '../docx-preview'
import XlsxPreview from '../xlsx-preview'
import PdfPreview from '../pdf-preview'
import PicPreview from '../pic-preview'
import TxtPreview from '../txt-preview'
import CodePreview from '../code-preview'
import MdPreview from '../md-preview'
import EpubPreview from '../epub-preview'
import type { UploadFile } from 'element-plus'

const props = withDefaults(
  defineProps<{
    url?: String
    uploadFile: UploadFile
  }>(),
  {
    url: () => null,
    uploadFile: () => null
  }
)

const fileRender: Ref<ArrayBuffer | string> = ref()
const fileSuffix = ref()

const typeItems: Record<string, string[]> = {
  // 文档
  'doc': ['doc'],
  'docx': ['docx'],
  'xls': ['xls'],
  'xlsx': ['xlsx'],
  'ppt': ['ppt'],
  // pdf
  'pdf': ['pdf'],
  // 图片
  'pic': ['jpg', 'png', 'jpeg', 'webp', 'gif', 'bmp', 'svg'],
  // 文本
  'txt': ['txt'],
  // 代码
  'code': ['html', 'css', 'less', 'scss', 'js', 'json', 'ts', 'vue', 'md', 'txt', 'c', 'cpp', 'java', 'py', 'go', 'php', 'lua', 'rb', 'pl', 'swift', 'vb', 'cs', 'sh'],
  // markdown
  'md': ['md'],
  // epub
  'epub': ['epub']
}
const fileType = computed(() => {
  if (props.uploadFile) {
    fileSuffix.value = getFileType(props.uploadFile)
  }
  
  let type = ''
  Object.keys(typeItems).forEach((key) => {
    if (typeItems[key].includes(fileSuffix.value)) {
      type = key
    }
  })
  return type
})

const getFileType = (file: UploadFile): string => {
  const fileName = file.name
  const idx = fileName.lastIndexOf('.')
  const suffix = fileName.substring(idx + 1)
  return suffix
}

const changeFileHandle = (fileParmas: { file: UploadFile, isReadTxt?: boolean } = { file: null, isReadTxt: false}) => {
  let { file, isReadTxt } = fileParmas
  if (file) {
    const fileReader = new FileReader()
    if (isReadTxt) {
      fileReader.readAsText(file.raw)
    } else {
      fileReader.readAsArrayBuffer(file.raw)
    }
    fileReader.onload = () => {
      fileRender.value = fileReader.result;
    }
  }
}

watch(
  () => fileType.value,
  (type) => {
    switch(type) {
      case 'doc':
      case 'docx':
      case 'xls':
      case 'xlsx':
      case 'ppt':
      case 'pdf':
      case 'pic':
      case 'epub':
        changeFileHandle({ file: props.uploadFile, isReadTxt: false })
        break
      case 'code':
      case 'md':
      case 'txt':
        changeFileHandle({ file: props.uploadFile, isReadTxt: true })
    }
  },
  { immediate: true }
)
</script>

<style scoped lang='scss'></style>
