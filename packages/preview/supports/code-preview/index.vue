<template>
  <div>
    <codemirror v-model="code" :autofocus="true" :indent-with-tab="true" :tab-size="2"
      :extensions="extensions" @ready="handleReady" />
  </div>
</template>

<script lang='ts' setup>
import { ref, shallowRef, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'

const props = withDefaults(
  defineProps<{
    url?: string,
    name?: string
    type?: string
    fileRender?: string | ArrayBuffer
  }>(),
  {
    url: () => null,
    name: () => null,
    fileRender: () => null,
    type: () => null
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
  () => props.fileRender,
  () => {
    code.value = props.fileRender
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang='scss'></style>
