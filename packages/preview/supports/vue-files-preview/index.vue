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
import {getFileType, getFileName} from "../../utils/utils";

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
  preview.name = getFileName(file);
  currentPreview.value = preview;
}

onBeforeMount(() => {
  // todo url需要分流 默认url后缀也能获取内容
  syncPreview(props.file);
});
</script>

<style scoped lang="scss"></style>
