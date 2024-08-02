<template>
  <div>
    <vue-office-pdf :src="fileRender" @rendered="renderedHandler" @error="errorHandler" />
    <div id="pdf-preview-box"></div>
  </div>
</template>

<script lang="ts" setup>
import VueOfficePdf from "@vue-office/pdf";
// import WebViewer from '@pdftron/pdfjs-express'

const pdfViewer = shallowRef();

const props = withDefaults(
  defineProps<{
    url?: string;
    name?: string;
    type?: string;
    fileRender?: string | ArrayBuffer;
  }>(),
  {
    url: () => null,
    name: () => null,
    fileRender: () => null,
    type: () => null,
  }
);

const renderedHandler = () => {
  console.log("渲染完成");
};

const errorHandler = () => {
  console.log("渲染失败");
};

const initPdf = () => {
  // WebViewer({
  //   // path: props.fileRender,
  //   // initialDoc: props.fileRender,
  // }, pdfViewer.value).then((instance) => {
  //   instance.UI.loadDocument(props.fileRender, { filename: `${props.name}.pdf` });
  //   instance.UI.setTheme('dark');
  //   // instance.UI.disableElements(['leftPanel', 'leftPanelButton']);
  //   const { documentViewer, annotationManager, Annotations } = instance.Core;
  //   documentViewer.addEventListener('documentLoaded', () => {
  //     const rectangleAnnot = new Annotations.RectangleAnnotation();
  //     rectangleAnnot.PageNumber = 1;
  //     rectangleAnnot.X = 100;
  //     rectangleAnnot.Y = 150;
  //     rectangleAnnot.Width = 200;
  //     rectangleAnnot.Height = 50;
  //     annotationManager.addAnnotation(rectangleAnnot);
  //   })
  // });
};

onMounted(() => {
  // pdfViewer.value = document.getElementById('pdf-preview-box');
  // if (pdfViewer.value) {
  //   initPdf()
  // }
});
</script>

<style scoped lang="scss"></style>
