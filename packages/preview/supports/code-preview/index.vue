<script lang='ts' setup>
import {ref, shallowRef, watch} from 'vue'
import {Codemirror} from 'vue-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {json} from '@codemirror/lang-json'
import {html} from '@codemirror/lang-html'
import {xml} from '@codemirror/lang-xml'
import {oneDark} from '@codemirror/theme-one-dark'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile, getFileRenderByUrl} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      url: () => null,
      file: () => null,
    },
)

const emit = defineEmits<{
  rendered: []
  error: [error: Error]
}>()

const code = ref()
const extensions = [javascript(), json(), html(), xml(), oneDark]
// Codemirror EditorView instance ref
const codeViewer = shallowRef()

function handleReady(payload): void {
  codeViewer.value = payload.view
  emit('rendered')
}

watch(
    () => props.file,
    (file) => {
      if (file) {
        getFileRenderByFile(file).then((render) => {
          code.value = render
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
)

watch(
    () => props.url,
    (url) => {
      if (url && !props.file) {
        getFileRenderByUrl(url).then((render) => {
          code.value = render
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
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

<style scoped lang='scss'>
.code-preview {
  min-height: 100vh;
  background-color: #282c34;
  overflow: auto;
}
</style>
