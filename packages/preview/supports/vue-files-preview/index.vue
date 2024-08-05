<template>
  <div class="vue-files-preview" :style="{ width, height }">
    <component
      :is="currentPreview.component"
      :name="currentPreview.name"
      :file="file"
      :url="url"
    />
  </div>
</template>

<script lang="ts" setup>
import {getPreviewTypeByFileType, PreviewRules} from "../../preview.const";
import {IPreviewRule, PreviewProps, PreviewType} from "../../preview.interface";
import {getFileType, getFileName, getFileRenderByFile} from "../../utils/utils";
import {watch} from "vue";

const props = withDefaults(
    defineProps<PreviewProps & {
      width?: string,
      height?: string
    }>(),
    {
      file: () => null,
      url: () => null,
      width: () => '100%',
      height: () => '100%'
    }
);

const currentPreview = shallowRef<IPreviewRule>(PreviewRules[PreviewType.NONE]);

const syncPreview = (file: File) => {
  const preview = PreviewRules[getPreviewTypeByFileType(getFileType(file))];
  if(preview){
    preview.name = getFileName(file);
    currentPreview.value = preview;
  }
}
watch(
    () => props.file,
    (file) => {
      if (file) {
        syncPreview(file)
      }
    },
    { immediate: true }
)
</script>

<style scoped lang="scss"></style>
