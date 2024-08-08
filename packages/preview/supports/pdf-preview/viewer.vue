<template>
  <div ref="viewerDom" id="pdf-preview-box"></div>
</template>

<script lang='ts' setup>
import {onMounted, shallowRef, watch} from 'vue'
// @ts-ignore
import PDFJSExpress from '@pdftron/pdfjs-express';

const props = withDefaults(
    defineProps<{
      libPath: string;
      file: File;
      url: string;
    }>(),
    {
      libPath: ()=>null,
      url: () => null,
      file: () => null,
    }
);
const viewerDom = shallowRef();
const viewerInstance = ref(null);

// 同步pdf
const syncPdf = (asset:File|string)=>{
  if(viewerInstance.value){
    viewerInstance.value.UI.loadDocument(asset);
  }
}
const initPdf = () => {
  console.log("初始化PDF Viewer")
  if(!viewerInstance.value){
    console.log("开始初始化",props.libPath)
    PDFJSExpress({
      path: props.libPath,
      licenseKey:"HormM5BozSjqaxDDNdXO"
    }, viewerDom.value).then((instance:any) => {
      console.log("完成初始化容器")
      viewerInstance.value = instance;

      viewerInstance.value.UI.setTheme('dark');
      viewerInstance.value.UI.loadDocument(props.file, {filename: props.file.name});
      console.log("try load file ", props.file)
    });
  }
};

watch(
    () => props.file,
    (file) => {
      if (file) {
        syncPdf(file);
      }
    },
    { immediate: true }
)
watch(
    () => props.url,
    (url) => {
      if (url) {
        syncPdf(url);
      }
    },
    { immediate: true }
)
onMounted(() => {
  console.log("视图初始化完成",viewerDom.value)
  initPdf()
});
</script>

<style scoped lang="scss">
#pdf-preview-box{
  width: 100%;
  height: 100vh;
}
</style>
