<template>
  <div>
    <codemirror v-model="code" :autofocus="true" :indent-with-tab="true" :tab-size="2"
      :extensions="extensions" @ready="handleReady" />
  </div>
</template>

<script lang='ts' setup>
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'
import {PreviewProps} from "../../preview.interface";
import {getFileRenderByFile} from "../../utils/utils";

const props = withDefaults(
  defineProps<PreviewProps>(),
  {
    url: () => null,
    file: ()=>null,
  }
)

const code = ref()
const extensions = [javascript(), json(), html(), oneDark]
// Codemirror EditorView instance ref
const codeViewer = shallowRef()
const handleReady = (payload) => {
  codeViewer.value = payload.view
}

watch(
  () => props.file,
  () => {
    getFileRenderByFile(props.file).then(render => {
      code.value = render;
    });
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang='scss'></style>
