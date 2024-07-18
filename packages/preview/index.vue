<template>
  <div class="preview">
    <div v-if="type === 'docx'">
      <DocxPreview type="docx" :fileRender="props.fileRender" />
    </div>
    <div v-if="type === 'xlsx'">
      <XlsxPreview type="xlsx" :fileRender="props.fileRender" />
    </div>
    <div v-if="type === 'pdf'">
      <PdfPreview type="pdf" :fileRender="props.fileRender" />
    </div>
    <div v-if="type === 'pic'">
      <PicPreview type="pic" :fileRender="typeof props.fileRender == 'string' && props.fileRender" />
    </div>
    <div v-if="type === 'txt'">
      <TxtPreview type="txt" :fileRender="props.fileRender" />
    </div>
    <div v-if="type === 'code'">
      <CodePreview type="code" :fileRender="props.fileRender" />
    </div>
    <div v-if="type === 'md'">
      <MdPreview type="md" :fileRender="props.fileRender" />
    </div>
    <div v-if="type === 'epub'">
      <EpubPreview type="epub" :fileRender="props.fileRender" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DocxPreview from '../docx-preview'
import XlsxPreview from '../xlsx-preview'
import PdfPreview from '../pdf-preview'
import PicPreview from '../pic-preview'
import TxtPreview from '../txt-preview'
import CodePreview from '../code-preview'
import MdPreview from '../md-preview'
import EpubPreview from '../epub-preview'

const props = defineProps({
  url: {
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
</script>

<style scoped lang='scss'></style>
