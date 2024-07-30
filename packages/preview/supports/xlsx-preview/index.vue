<template>
  <div>
    <vue-office-excel :src="fileRender" @rendered="renderedHandler" @error="errorHandler" />
  </div>
</template>

<script lang='ts' setup>
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'

withDefaults(
  defineProps<{
    url?: string,
    name?: string
    type?: string
    fileRender?: string | ArrayBuffer
    width?: string,
    height?: string
  }>(),
  {
    url: () => null,
    name: () => null,
    fileRender: () => null,
    type: () => null
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
