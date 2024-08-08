<template>
<!--  <vue-office-pdf :src="fileRender" @rendered="renderedHandler" @error="errorHandler" />-->
  <Viewer :file="file" :url="url" lib-path="/pdfjs-express"></Viewer>
</template>

<script lang='ts' setup>
// import VueOfficePdf from '@vue-office/pdf'
// const renderedHandler = () => {
// console.log("渲染完成");
// };
//
// const errorHandler = () => {
//   console.log("渲染失败");
// };

import {PreviewProps} from "../../preview.interface";
import Viewer from "./viewer.vue";

const props = withDefaults(
  defineProps<PreviewProps>(),
  {
    url: () => null,
    file: () => null,
  }
);
</script>

<style scoped lang="scss"></style>
