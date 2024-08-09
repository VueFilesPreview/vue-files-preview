<script lang='ts' setup>
import { onMounted, shallowRef, watch } from 'vue'
import VueOfficePdf from '@vue-office/pdf'
import type { PreviewProps } from '../../preview.interface'
import { getFileRenderByFile } from '../../utils/utils'

const props = withDefaults(
  defineProps<PreviewProps>(),
  {
    url: () => null,
    file: () => null,
  },
)

// import WebViewer from '@pdftron/pdfjs-express'

const pdfViewer = shallowRef()

const fileRender = ref(null)
watch(
  () => props.file,
  (file) => {
    if (file) {
      getFileRenderByFile(file).then(render => fileRender.value = render)
    }
  },
  { immediate: true },
)
function renderedHandler() {
  console.log('渲染完成')
}

function errorHandler() {
  console.log('渲染失败')
}

function initPdf() {
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
}

onMounted(() => {
  // pdfViewer.value = document.getElementById('pdf-preview-box');
  // if (pdfViewer.value) {
  //   initPdf()
  // }
})
</script>

<template>
  <div>
    <VueOfficePdf :src="fileRender" @rendered="renderedHandler" @error="errorHandler" />
    <!-- <div id="pdf-preview-box"></div> -->
  </div>
</template>

<style scoped lang="scss"></style>
