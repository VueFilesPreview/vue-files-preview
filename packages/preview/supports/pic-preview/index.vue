<template>
  <div>
    <img :src="fileRender" alt="" />
  </div>
</template>

<script lang='ts' setup>
import {PreviewProps} from "../../preview.interface";
import {ref, watch} from "vue";
import {getFileRenderByFile} from "../../utils/utils";

const props = withDefaults(
  defineProps<PreviewProps>(),
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
       getFileRenderByFile(file).then(render=>{
         fileRender.value = render;
       })
      }
    },
    { immediate: true }
)
</script>

<style scoped lang='scss'></style>
