<script lang='ts' setup>
import markdownit from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItContainer from 'markdown-it-container'
import hljs from 'highlight.js'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      url: () => null,
      file: () => null,
    },
)

const markdownHtml = ref()

watch(
    () => props.file,
    (val) => {
      if (val) {
        const md = markdownit({
          // Enable HTML tags in source
          html: true,

          // Use '/' to close single tags (<br />).
          // This is only for full CommonMark compatibility.
          xhtmlOut: false,

          // Convert '\n' in paragraphs into <br>
          breaks: false,

          // CSS language prefix for fenced blocks. Can be
          // useful for external highlighters.
          langPrefix: 'language-',

          // Autoconvert URL-like text to links
          linkify: true,

          // Enable some language-neutral replacement + quotes beautification
          // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
          typographer: true,

          // Double + single quotes replacement pairs, when typographer enabled,
          // and smartquotes on. Could be either a String or an Array.
          //
          // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
          // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
          quotes: '“”‘’',

          // Highlighter function. Should return escaped HTML,
          // or '' if the source string is not changed and should be escaped externally.
          // If result starts with <pre... internal wrapper is skipped.
          highlight(str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return `<pre><code class="hljs">${
                    hljs.highlight(str, {language: lang, ignoreIllegals: true}).value
                }</code></pre>`
              } catch (__) {
              }
            }

            return `<pre><code class="hljs">${md!.utils!.escapeHtml(str)}</code></pre>`
          },
        }).use(markdownItFootnote).use(markdownItContainer)
        getFileRenderByFile(val).then((render) => {
          markdownHtml.value = md.render(render)
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
</style>
