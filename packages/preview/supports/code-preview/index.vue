<script lang='ts' setup>
import {Codemirror} from 'vue-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {json} from '@codemirror/lang-json'
import {html} from '@codemirror/lang-html'
import {oneDark} from '@codemirror/theme-one-dark'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      url: () => null,
      file: () => null,
    },
)

const code = ref()
const extensions = [javascript(), json(), html(), oneDark]
// Codemirror EditorView instance ref
const codeViewer = shallowRef()

function handleReady(payload): void {
  codeViewer.value = payload.view
}

watch(
    () => props.file,
    () => {
      getFileRenderByFile(props.file).then((render) => {
        code.value = render
      })
    },
    {
      immediate: true,
    },
)
</script>

<template>
  <div class="code-preview">
    <Codemirror
        v-model="code" :autofocus="true" :indent-with-tab="true" :tab-size="2"
        :extensions="extensions" @ready="handleReady"
    />
  </div>
</template>

<style scoped lang='scss'></style>
