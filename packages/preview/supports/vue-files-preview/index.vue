<template>
  <div class="vue-files-preview" :style="{ width, height }">
    <component
      :is="currentPreview.component"
      :name="currentPreview.name"
      :type="currentPreview.type"
      :fileRender="currentPreview.fileRender"
    />
  </div>
</template>

<script lang="ts" setup>
import { shallowRef,  onBeforeMount } from 'vue';
import { getPreviewTypeByFileType, PreviewRules } from "../../preview.const";
import { IPreview, PreviewType } from "../../preview.interface";
import { getFileRenderByFile, getFileType, getFileName } from "../../utils/utils";

const props = withDefaults(
  defineProps<{
    uploadFile?: File,
    url?: string
    width?: string,
    height?: string
  }>(),
  {
    uploadFile: () => null,
    url: () => null,
    width: () => '100%',
    height: () => '100%'
  }
)

const currentPreview = shallowRef<IPreview>(PreviewRules[PreviewType.NONE]);

const syncPreview = (file: File) => {
  const preview = PreviewRules[getPreviewTypeByFileType(getFileType(file))];
  getFileRenderByFile(file).then((render: String | ArrayBuffer) => {
    preview.fileRender = render;
    preview.name = getFileName(file);
    currentPreview.value = preview;
  });
}

onBeforeMount(() => {
  // todo url需要分流 默认url后缀也能获取内容
  if (props.uploadFile) {
    syncPreview(props.uploadFile);
  }
});

</script>

<style scoped lang='scss'></style>
