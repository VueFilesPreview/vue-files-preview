<template>
  <div class="epub-box" :style="{ width, height }">
    <button class="btn" @keydown="prevKeyDown" style="display: none">上一页</button>
    <div class="epub-viewer" id="epub-viewer"></div>
    <button class="btn" @keydown="downKeyDown" style="display: none">下一页</button>
  </div>
</template>

<script lang="ts" setup>
import ePub from "epubjs";

const props = withDefaults(
  defineProps<{
    url?: string;
    name?: string;
    type?: string;
    fileRender?: string | ArrayBuffer;
    width?: string;
    height?: string;
  }>(),
  {
    url: () => null,
    name: () => null,
    fileRender: () => null,
    type: () => null,
    width: () => "100%",
    height: () => "100%",
  }
);

const navigation = ref();
const locations = ref();
const currentPage = ref(1);
const totalPages = ref();
const bookAvailable = ref(false);
const book = ref();
const rendition = ref();

const initEpub = () => {
  if (props.fileRender) {
    book.value = ePub(props.fileRender as ArrayBuffer);
    rendition.value = book.value.renderTo("epub-viewer", {
      // 滚动模式
      width: props.width,
      height: props.height,
      flow: "scrolled",
      allowScriptedContent: true,
    });
    book.value.ready.then(() => {
      navigation.value = book.value.navigation;
      locations.value = book.value.locations;
      bookAvailable.value = true;
      // // 获取总页数
      totalPages.value = locations.value.length();
      rendition.value.display();
    });
  }
};

watch(
  () => props.fileRender,
  () => {
    initEpub();
  },
  { immediate: true }
);

// epub翻页
const prevPage = () => {
  if (rendition.value) {
    rendition.value.prev();
    // 向前翻页时更新 currentPage
    currentPage.value--;
    if (currentPage.value < 1) {
      currentPage.value = 1;
    }
  }
};

const nextPage = () => {
  if (rendition.value) {
    rendition.value.next();
    // 向后翻页时更新 currentPage
    currentPage.value++;
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
    }
  }
};

const prevKeyDown = (e) => {
  e.preventDefault()
}

const downKeyDown = (e) => {
  e.preventDefault()
}

onKeyStroke('ArrowLeft', (e) => {
  prevPage()
})

onKeyStroke('ArrowRight', (e) => {
  nextPage()
})
</script>

<style scoped lang="scss">
.epub-box {
  height: 100vh;
  width: 100%;
}

.epub-viewer {
  padding: 10px;
  min-height: calc(100vh - 80px);
  max-height: calc(100vh - 80px);
  overflow: auto;
}

.footer {
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>
