<template>
  <div>
    <vue-office-excel :src="fileRender" style="height: 100vh" @rendered="renderedHandler" @error="errorHandler" />
  </div>
</template>

<script lang='ts' setup>
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'

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
