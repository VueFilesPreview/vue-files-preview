<template>
  <div>
    <vue-office-docx :src="fileRender" @rendered="renderedHandler" @error="errorHandler" />
  </div>
</template>

<script lang='ts' setup>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import {PreviewProps} from "../../preview.interface";
import {onBeforeMount, ref, watch} from "vue";
import {getFileRenderByFile} from "../../utils/utils";

const props = withDefaults(
  defineProps<PreviewProps>(),
  {
    url: () => null,
    file: ()=> null
  }
)

const fileRender = ref(null)
watch(
    () => props.file,
    () => {
      fileRender.value = getFileRenderByFile(props.file)
    },
    { immediate: true }
)

const renderedHandler = () => {
  console.log("渲染完成")
}

const errorHandler = () => {
  console.log("渲染失败")
}
</script>

<style scoped lang='scss'></style>
