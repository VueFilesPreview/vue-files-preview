<template>
  <div>
    <vue-office-excel :src="fileRender" @rendered="renderedHandler" @error="errorHandler" />
  </div>
</template>

<script lang='ts' setup>
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
import {PreviewProps} from "../../preview.interface";
import {ref, watch} from "vue";
import {getFileRenderByFile} from "../../utils/utils";

const props = withDefaults(
  defineProps<PreviewProps&{
    width?: string,
    height?: string
  }>(),
  {
    url: () => null,
    file: () => null,
  }
)
const fileRender = ref(null);
watch(
    () => props.file,
    (file) => {
      if (file) {
        getFileRenderByFile(file).then(render=>fileRender.value=render);
      }
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
