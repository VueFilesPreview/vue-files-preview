<script lang='ts' setup>
import {ref, watch} from 'vue'
import markdownit from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItContainer from 'markdown-it-container'
import hljs from 'highlight.js'
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

const markdownHtml = ref()

function createMarkdownRenderer() {
  const md = markdownit({
    html: true,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    linkify: true,
    typographer: true,
    quotes: '\u201C\u201D\u2018\u2019',
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre><code class="hljs">${
              hljs.highlight(str, {language: lang, ignoreIllegals: true}).value
          }</code></pre>`
        } catch (__) {
        }
      }
      // 使用 md.utils.escapeHtml 而不是 this.utils.escapeHtml
      return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`
    },
  })
  return md.use(markdownItFootnote).use(markdownItContainer)
}

function renderMarkdown(content: string | ArrayBuffer): void {
  const md = createMarkdownRenderer()
  markdownHtml.value = md.render(content as string)
  emit('rendered')
}

watch(
    () => props.file,
    (file) => {
      if (file) {
        getFileRenderByFile(file).then((render) => {
          renderMarkdown(render)
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
          renderMarkdown(render)
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
)
</script>

<template>
  <div class="md-preview hljs">
    <div v-html="markdownHtml"/>
  </div>
</template>

<style scoped lang='scss'>
@import 'highlight.js/styles/github-dark-dimmed.css';
@import './index.css';

.md-preview {
  min-height: 100vh;
  padding: 24px 48px;
  background-color: #22272e;
  color: #adbac7;
  overflow: auto;
}
</style>
