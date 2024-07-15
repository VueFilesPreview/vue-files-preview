<template>
  <div class="preview">
    <div v-if="type === 'doc' || type === 'docx'">
      <vue-office-docx :src="doc" style="height: 100vh" @rendered="renderedHandler" @error="errorHandler" />
    </div>
    <div v-else-if="type === 'xls' || type === 'xlsx'">
      <vue-office-excel :src="excel" style="height: 100vh;" @rendered="renderedHandler" @error="errorHandler" />
    </div>
    <div v-else-if="type === 'pdf'">
      <vue-office-pdf :src="pdf" style="height: 100vh" @rendered="renderedHandler" @error="errorHandler" />
    </div>
    <div v-else-if="type === 'pic'">
      <img :src="props.fileRender as string" alt="">
    </div>
    <div v-else-if="type === 'txt'">
      {{ props.fileRender }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import VueOfficePdf from '@vue-office/pdf'
import '@vue-office/docx/lib/index.css'
import '@vue-office/excel/lib/index.css'

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

const doc = ref()
const excel = ref()
const pdf = ref()

watch(
  () => props.type,
  (fileType) => {
    switch (fileType) {
      case 'doc':
      case 'docx':
        doc.value = props.fileRender
        console.log(doc.value, 'doc')
        break
      case 'xls':
      case 'xlsx':
        excel.value = props.fileRender
        break
      case 'pdf':
        pdf.value = props.fileRender
    }
  }
)

const renderedHandler = () => {
  console.log("渲染完成")
}

const errorHandler = () => {
  console.log("渲染失败")
}
</script>

<style scoped lang='scss'></style>
