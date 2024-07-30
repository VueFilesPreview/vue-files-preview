<template>
  <div>
    <vue-office-docx :src="fileRender" @rendered="renderedHandler" @error="errorHandler" />
  </div>
</template>

<script lang='ts' setup>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

withDefaults(
  defineProps<{
    url?: string,
    name?: string
    type?: string
    fileRender?: string | ArrayBuffer
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
