<template>
  <div class="preview">
    <component :is="currentPreview.component" :type="currentPreview.type" :fileRender="currentPreview.fileRender">
    </component>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import type { UploadFile } from 'element-plus';
import { getPreviewTypeByFileType, PreviewRules } from "./preview.const";
import { IPreview, PreviewType } from "./preview.interface";
import { getFileRenderByFile, getFileType } from "./utils/utils";

const props = withDefaults(
  defineProps<{
    url?: String
    uploadFile: UploadFile
  }>(),
  {
    url: () => null,
    uploadFile: () => null
  }
)

const currentPreview = ref<IPreview>(PreviewRules[PreviewType.NONE]);

const syncPreview = (file: UploadFile) => {
  const preview = PreviewRules[getPreviewTypeByFileType(getFileType(file))];
  getFileRenderByFile(file).then((render: String | ArrayBuffer) => {
    preview.fileRender = render;
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
