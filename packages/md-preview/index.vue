<template>
  <div v-html="markdownHtml"></div>
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue'
import markdownit from 'markdown-it'

const markdownHtml = ref()

const props = defineProps({
  url: {
    type: String,
    default: () => {
      return 'none'
    }
  },
  type: {
    type: String,
    default: () => {
      return 'none'
    }
  },
  fileRender: {
    type: [ArrayBuffer, String]
  }
})

watch(
  () => props.fileRender,
  (val) => {
    if (val) {
      const md = markdownit()
      markdownHtml.value = md.render(val);
    }
  },
  { immediate: true }
)
</script>

<style scoped lang='scss'></style>
