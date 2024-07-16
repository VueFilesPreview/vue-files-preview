<template>
  <div>
    <vue-office-docx :src="fileRender" style="height: 100vh" @rendered="renderedHandler" @error="errorHandler" />
  </div>
</template>

<script lang='ts' setup>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

defineProps({
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

const renderedHandler = () => {
  console.log("渲染完成")
}

const errorHandler = () => {
  console.log("渲染失败")
}
</script>

<style scoped lang='scss'></style>
